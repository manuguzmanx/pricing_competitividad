import { Component, LOCALE_ID, OnInit, Pipe, ViewChild, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Competitividad } from 'src/app/model/competitividad';
import { Router } from '@angular/router';
import { CompetitividadService } from 'src/app/services/competitividad.service';
import { TiendasCompetitividad } from '../../model/tiendas-competitividad';
import { PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-gestion-precios-competitividad',
  templateUrl: './gestion-precios-competitividad.component.html',
  styleUrls: ['./gestion-precios-competitividad.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' },PrimeNGConfig,DatePipe],
  encapsulation:ViewEncapsulation.None
})


export class GestionPreciosCompetitividadComponent{
  @ViewChild('myCalendar') myCalendar?: Calendar;

  preciosSeleccionados:number=0;
  preciosDentroCompetitividad:number=0;
  preciosFueraCompetitividad:number=0;
  preciosSinCompetidor:number=0;
  preciosConCompetidor:number=0;
  preciosTotales:number=0
  esFechaCorte: boolean=true;
  isEnabled: boolean = true;

  transform(value: number): number {
    return Math.round(value);
  }
  porcentajeMinimo=0;
  porcentajeMaximo=0;
  showAllRows: boolean = false;

  isSorted:boolean = false;

  switchEvent(){
    if(this.switchMargen){
      this.switchName='$'
    }else{
      this.switchName='%'
    }
  }

  tooltipData: any;

  onMouseEnter(objeto: any) {
    this.tooltipData = objeto;
  }

  switchName:string="%"
  switchMargen:boolean = false;

  macrocategoriaFormGroup: FormGroup;
  macrocategoria = [
    { name: 'Celulares', code: '00001' },
    { name: 'Enseres domésticos', code: '00002' },
    { name: 'Celular y recámaras', code: '00003' },
    { name: 'Joyería y relojería', code: '00004' },
    { name: 'Juguetes, bebés y ap. ejercicio', code: '00005' }
  ];

  categoriaFormGroup: FormGroup;
  categoria = [
    { name: 'Audio y video', code: '00006' },
    { name: 'Automotriz', code: '00007' },
    { name: 'Bebés', code: '00008' },
    { name: 'Belleza y cuidado personal', code: '00009' },
    { name: 'Bicicleta y movilidad eléctrica', code: '00010' }
  ];

  subcategoriaFormGroup: FormGroup;
  subcategoria = [
    { name: 'Accesorios', code: '00011' },
    { name: 'Aparatos de ejercicio', code: '00012' },
    { name: 'Artículos de oficina', code: '00013' },
    { name: 'Aseo de caja', code: '00014' },
    { name: 'Audio', code: '00015' }
  ];

  familiaFormGroup: FormGroup;
  familia = [
    { name: '1.2 a 1.4 Pies', code: '00016' },
    { name: '1.5 Pies a mayores', code: '00017' },
    { name: '2 Quemadores', code: 'C00018' },
    { name: '4 Quemadores', code: '00019' },
    { name: '5 Pies', code: '00020' }
  ];

  claseFormGroup: FormGroup;
  clase = [
    { name: 'Accesorios Celulares', code: '00021' },
    { name: 'Accesorios Celulares Apple', code: '00022' },
    { name: 'Accesorios TV', code: 'C00023' },
    { name: 'Aires Acondicionados', code: '00024' },
    { name: 'Albercas', code: '00025' }
  ];

  proveedorFormGroup: FormGroup;
  proveedor = [
    { name: '2Fast 4You', code: '00001' },
    { name: 'A Occhiali', code: '00002' },
    { name: 'Acer', code: 'C00003' },
    { name: 'Acros', code: '00004' },
    { name: 'Activision', code: '00005' }
  ];

  dateTime = new Date();

  rangeValues: number[] = [];

  tableFormGroup: FormGroup;

  loading:boolean = false;

  arregloCompetitividad: Competitividad[];
  selectedArregloCompetitividad: Competitividad[];
  filteredArregloCompetitividad: Competitividad[];
  fueraArregloCompetitividad: Competitividad[];
  sinCompetidorArregloCompetitividad:Competitividad[];
  conCompetidorArregloCompetitividad:Competitividad[];

  dentroArregloCompetitividad:Competitividad[];

  temporalCompetitividad:Competitividad[];

  sortedAscArregloCompetitividad:Competitividad[];
  sortedDescArregloCompetitividad:Competitividad[];
  checkedMargenUtilidad:boolean;
  fechaFiltro:any;
  fechaCorte:string;
  multiMargenUtilidad:boolean;

  checked:boolean = false;


  filteredCompetitividades: Competitividad[] = [];

  constructor(private formBuilder: FormBuilder, private config: PrimeNGConfig, private datePipe: DatePipe, private renderer: Renderer2,
    private router: Router,
    private competitividadService: CompetitividadService) {
    this.macrocategoriaFormGroup = this.formBuilder.group({
      selectedMacrocategoria: [],
      macrocategoria: this.macrocategoria
    });
    this.dateTime.setDate(this.dateTime.getDate());
    this.categoriaFormGroup = this.formBuilder.group({
      selectedCategoria: [],
      categoria: this.categoria
    });
    this.subcategoriaFormGroup = this.formBuilder.group({
      selectedSubcategoria: [],
      subcategoria: this.subcategoria
    });
    this.claseFormGroup = this.formBuilder.group({
      selectedClase: [],
      clase: this.clase
    });
    this.familiaFormGroup = this.formBuilder.group({
      selectedFamilia: [],
      familia: this.familia
    });
    this.proveedorFormGroup = this.formBuilder.group({
      selectedProveedor: [],
      proveedor: this.proveedor
    });
    this.tableFormGroup = this.formBuilder.group({
    });
    this.arregloCompetitividad = new Array<Competitividad>
    this.selectedArregloCompetitividad = new Array<Competitividad>
    this.filteredArregloCompetitividad = new Array<Competitividad>
    this.fueraArregloCompetitividad = new Array<Competitividad>
    this.sinCompetidorArregloCompetitividad= new Array<Competitividad>
    this.conCompetidorArregloCompetitividad=new Array<Competitividad>
    this.dentroArregloCompetitividad= new Array<Competitividad>
    this.temporalCompetitividad=new Array<Competitividad>;
    this.sortedAscArregloCompetitividad=new Array<Competitividad>;
    this.sortedDescArregloCompetitividad=new Array<Competitividad>;
    this.checkedMargenUtilidad=false;
    const eventStr = this.dateTime.toString();
    const [weekday, month, day, year] = eventStr.split(' ');
    const monthMap: { [key: string]: string } = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    const formattedDate = `${day}/${monthMap[month]}/${year}`;
    this.fechaFiltro = formattedDate;
    this.fechaCorte=formattedDate
    this.multiMargenUtilidad=true;
  }

  es: any;

  porcentajes:number[]=[];

  views: any[] | undefined;
  views2: any[] | undefined;
  selectedView: any | undefined;
  selectedView2: any | undefined;

  selectedfecha(event: any) {
    /* console.log("Evento:", event); */
    const eventStr = event.toString();
    const [weekday, month, day, year] = eventStr.split(' ');
    const monthMap: { [key: string]: string } = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    const formattedDate = `${day}/${monthMap[month]}/${year}`;
    this.fechaFiltro = formattedDate;
    const calendarInput = this.myCalendar?.inputfieldViewChild?.nativeElement;
    console.log("Elemento del calendario:", calendarInput);
    if(this.fechaFiltro === this.fechaCorte){
      console.log("Estamos en la fecha corte: "+this.fechaFiltro)

      if (calendarInput) {
        this.renderer.removeClass(calendarInput, 'fecha-seleccionada-diferente');
      console.log("Vuelve a color original")
      }

      this.esFechaCorte=true;
      this.onViewChange();

    }else{
      console.log("No estamos en la fecha corte: "+this.fechaFiltro)


      if (calendarInput) {
        this.renderer.addClass(calendarInput, 'fecha-seleccionada-diferente');
        console.log("se colorea de rojo")
      }


      this.esFechaCorte=false;
      this.isEnabled=false;

    }
  }

  ngOnInit(): void {

    this.config.setTranslation({
      accept: 'Aceptar',
      reject: 'Rechazar',
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Limpiar'
    });

    this.ingresandoValoresDummy();
    console.log("tabla competitividad")
    console.table(this.arregloCompetitividad)

    this.views = [
      { name: "Total Sku's", value: 0 },
      { name: "Sku's dentro de competitividad", value: 1 },
      { name: "Sku's fuera de competitividad", value: 2 },
      { name: "Sku's sin competidor", value: 3 }
    ];

    this.selectedView = this.views[2];

    this.views2 = [
      { name: "Total Sku's", value: 0 },
      { name: "Sku's en línea", value: 1 },
      { name: "Sku's descontinuados", value: 2 },
    ];

    this.selectedView2 = this.views2[0];

  }

  onViewChange() {

    if(this.selectedView.value===0){
      this.temporalCompetitividad=[...this.filteredArregloCompetitividad]
      if(this.esFechaCorte){
        this.isEnabled=true;
      }else{
        this.isEnabled=false;
      }
    }
    if(this.selectedView.value===1){
      this.temporalCompetitividad=[...this.dentroArregloCompetitividad]
      this.isEnabled=false;
    }
    if(this.selectedView.value===2){
      this.temporalCompetitividad=[...this.fueraArregloCompetitividad]
      if(this.esFechaCorte){
        this.isEnabled=true;
      }else{
        this.isEnabled=false;
      }
    }
    if(this.selectedView.value===3){
      this.temporalCompetitividad=[...this.sinCompetidorArregloCompetitividad]
      this.isEnabled=false;
    }
    if(this.selectedView.value===4){
      this.temporalCompetitividad=new Array<Competitividad>
      if(this.esFechaCorte){
        this.isEnabled=true;
      }else{
        this.isEnabled=false;
      }
    }
    if(this.selectedView.value===5){
      this.temporalCompetitividad=new Array<Competitividad>
      if(this.esFechaCorte){
        this.isEnabled=true;
      }else{
        this.isEnabled=false;
      }
    }
  }

  folios(){
    this.router.navigate(['seguimiento-folios']);
  }

  enviarPreciosSeleccionados(){
    if(this.selectedArregloCompetitividad.length>0){
      this.competitividadService.putCompetitividad(this.selectedArregloCompetitividad);
      this.router.navigate(['flujo-precios']);
    }
  }

  irFiltros(){

  }

  filteredCompetitividad() {
    this.filteredArregloCompetitividad = [...this.arregloCompetitividad].filter(competitividad =>
      competitividad.diferencialMargen >= this.rangeValues[0] &&
      competitividad.diferencialMargen <= this.rangeValues[1]
    );

  }

  fueraCompetitividad(){
    this.fueraArregloCompetitividad = [...this.arregloCompetitividad].filter(competitividad =>
      competitividad.precioSugeridoPorcentaje !== null
    );
    this.temporalCompetitividad = [...this.fueraArregloCompetitividad];
  }

  dentroCompetitividad(){
    this.dentroArregloCompetitividad = [...this.arregloCompetitividad].filter(competitividad =>
      competitividad.diferencialMargen <= 10 && competitividad.precioMasCompetitivo!==null
    );
  }

  sinCompetidor(){
    this.sinCompetidorArregloCompetitividad = [...this.arregloCompetitividad].filter(competitividad =>
      competitividad.precioMasCompetitivo === null
    );
  }

  conCompetidor(){
    this.conCompetidorArregloCompetitividad = [...this.arregloCompetitividad].filter(competitividad =>
      competitividad.precioMasCompetitivo !== null
    );
  }

  sortArrays(){
    if(this.isSorted===true){
      this.sortAscCompetitividad()
      this.isSorted=false
      console.log("ascendente")
    } else {
      this.sortDescCompetitividad()
      this.isSorted=true
      console.log("descendente")
    }
  }

  sortAscCompetitividad(): void {
    this.sortedAscArregloCompetitividad = [...this.arregloCompetitividad].sort((a, b) => a.diferencialMargen - b.diferencialMargen);
    this.temporalCompetitividad = [...this.sortedAscArregloCompetitividad];
  }

  sortDescCompetitividad(): void {
    this.sortedDescArregloCompetitividad = [...this.arregloCompetitividad].sort((a, b) => b.diferencialMargen - a.diferencialMargen);
    this.temporalCompetitividad = [...this.sortedDescArregloCompetitividad];
  }

  onHeaderCheckboxToggle(event: any) {
    if (event.checked) {

      this.selectedArregloCompetitividad = [...this.filteredArregloCompetitividad].filter(product => product.precioSugeridoPorcentaje!==null);
      this.onRowSelect()
    } else {

      this.selectedArregloCompetitividad = [];
      this.onRowSelect()
    }
  }
  labelSelected="Seleccionar precios"
  labelSelectedHead=`Enviar\nprecios`
  onRowSelect(){
    if(this.selectedArregloCompetitividad.length>0){
      if(this.selectedArregloCompetitividad.length>1){
        this.labelSelected="Enviar "+this.selectedArregloCompetitividad.length+ " precios seleccionados"
        this.labelSelectedHead="Enviar\n"+this.selectedArregloCompetitividad.length+ " precios"
      } else {
        this.labelSelected="Enviar "+this.selectedArregloCompetitividad.length+ " precio seleccionado"
        this.labelSelectedHead="Enviar\n"+this.selectedArregloCompetitividad.length+ " precio"
      }
    }else{
      this.labelSelected="Seleccionar precios"
      this.labelSelectedHead=`Enviar\nprecios`
    }
  }

  onSliderChange() {
    this.filteredCompetitividad();
  }

  getMinValue(obj: Competitividad): number {

    const temp: number[] = [];
    if(obj.amazon.precioPromocion!=null){
      temp.push(obj.amazon.precioPromocion)
    }else if(obj.amazon.precioRegular!=null){
      temp.push(obj.amazon.precioRegular)
    }
    if(obj.aurrera.precioPromocion!=null){
      temp.push(obj.aurrera.precioPromocion)
    }else if(obj.aurrera.precioRegular!=null){
      temp.push(obj.aurrera.precioRegular)
    }
    if(obj.chedraui.precioPromocion!=null){
      temp.push(obj.chedraui.precioPromocion)
    }else if(obj.chedraui.precioRegular!=null){
      temp.push(obj.chedraui.precioRegular)
    }
    if(obj.liverpool.precioPromocion!=null){
      temp.push(obj.liverpool.precioPromocion)
    }else if(obj.liverpool.precioRegular!=null){
      temp.push(obj.liverpool.precioRegular)
    }
    if(obj.coppel.precioPromocion!=null){
      temp.push(obj.coppel.precioPromocion)
    }else if(obj.coppel.precioRegular!=null){
      temp.push(obj.coppel.precioRegular)
    }
    return Math.min(...temp);
  }

  getMinValueWithoutCoppel(obj: Competitividad): number|null {
    const temp: number[] = [];
    if(obj.amazon.precioPromocion!=null){
      temp.push(obj.amazon.precioPromocion)
    }else if(obj.amazon.precioRegular!=null){
      temp.push(obj.amazon.precioRegular)
    }
    if(obj.aurrera.precioPromocion!=null){
      temp.push(obj.aurrera.precioPromocion)
    }else if(obj.aurrera.precioRegular!=null){
      temp.push(obj.aurrera.precioRegular)
    }
    if(obj.chedraui.precioPromocion!=null){
      temp.push(obj.chedraui.precioPromocion)
    }else if(obj.chedraui.precioRegular!=null){
      temp.push(obj.chedraui.precioRegular)
    }
    if(obj.liverpool.precioPromocion!=null){
      temp.push(obj.liverpool.precioPromocion)
    }else if(obj.liverpool.precioRegular!=null){
      temp.push(obj.liverpool.precioRegular)
    }
    if(temp.length>0){
      return Math.min(...temp);
    } else{
      return null;
    }
  }

  getMinValueWithoutCoppel2(obj: Competitividad): number {

    const temp: number[] = [];
    if(obj.amazon.precioPromocion!=null){
      temp.push(obj.amazon.precioPromocion)
    }else if(obj.amazon.precioRegular!=null){
      temp.push(obj.amazon.precioRegular)
    }
    if(obj.aurrera.precioPromocion!=null){
      temp.push(obj.aurrera.precioPromocion)
    }else if(obj.aurrera.precioRegular!=null){
      temp.push(obj.aurrera.precioRegular)
    }
    if(obj.chedraui.precioPromocion!=null){
      temp.push(obj.chedraui.precioPromocion)
    }else if(obj.chedraui.precioRegular!=null){
      temp.push(obj.chedraui.precioRegular)
    }
    if(obj.liverpool.precioPromocion!=null){
      temp.push(obj.liverpool.precioPromocion)
    }else if(obj.liverpool.precioRegular!=null){
      temp.push(obj.liverpool.precioRegular)
    }
    return Math.min(...temp);
  }

  getMaxValue(obj: Competitividad): number {
    const temp: number[] = [];
    if(obj.amazon.precioPromocion!=null){
      temp.push(obj.amazon.precioPromocion)
    }else if(obj.amazon.precioRegular!=null){
      temp.push(obj.amazon.precioRegular)
    }
    if(obj.aurrera.precioPromocion!=null){
      temp.push(obj.aurrera.precioPromocion)
    }else if(obj.aurrera.precioRegular!=null){
      temp.push(obj.aurrera.precioRegular)
    }
    if(obj.chedraui.precioPromocion!=null){
      temp.push(obj.chedraui.precioPromocion)
    }else if(obj.chedraui.precioRegular!=null){
      temp.push(obj.chedraui.precioRegular)
    }
    if(obj.liverpool.precioPromocion!=null){
      temp.push(obj.liverpool.precioPromocion)
    }else if(obj.liverpool.precioRegular!=null){
      temp.push(obj.liverpool.precioRegular)
    }
    if(obj.coppel.precioPromocion!=null){
      temp.push(obj.coppel.precioPromocion)
    }else if(obj.coppel.precioRegular!=null){
      temp.push(obj.coppel.precioRegular)
    }
    return Math.max(...temp);
  }

  getPorcetajeMinimo(porcentajes: number[]): number {
    return Math.min(...porcentajes)
  }

  getPorcetajeMaximo(porcentajes: number[]): number {
    return Math.max(...porcentajes)
  }


  isCompetitive(obj: Competitividad): boolean {
    if(obj.amazon.precioPromocion!=null){
      return false;
    }else if(obj.amazon.precioRegular!=null){
      return false;
    }
    if(obj.aurrera.precioPromocion!=null){
      return false;
    }else if(obj.aurrera.precioRegular!=null){
      return false;
    }
    if(obj.chedraui.precioPromocion!=null){
      return false;
    }else if(obj.chedraui.precioRegular!=null){
      return false;
    }
    if(obj.liverpool.precioPromocion!=null){
      return false;
    }else if(obj.liverpool.precioRegular!=null){
      return false;
    }
    if(obj.coppel.precioPromocion!=null){
      return true;
    }else if(obj.coppel.precioRegular!=null){
      return true;
    }
    return true;
  }

  public ingresandoValoresDummy() {

    const objetoCompetitividad1       = new Competitividad('1001', 'Descripción del producto', new TiendasCompetitividad('0001','Coppel',1000,null),  null, 0, 0,   null, true,  new TiendasCompetitividad('0001','Amazon',950,null), new TiendasCompetitividad('0001','Bodega Aurrera',700,null), new TiendasCompetitividad('0001','Chedraui',800,null), new TiendasCompetitividad('0001','Liberpool',900,null),'clase','departamento','America','Silver',1);
    const objetoCompetitividad1p      = new Competitividad('2001', 'Descripción del producto', new TiendasCompetitividad('0001','Coppel',1050,1000),  null, 0, 0,   null, true,  new TiendasCompetitividad('0001','Amazon',1000,950), new TiendasCompetitividad('0001','Bodega Aurrera',750,700), new TiendasCompetitividad('0001','Chedraui',850,800), new TiendasCompetitividad('0001','Liberpool',950,900),'clase','departamento','America','Silver',1);
    const objetoCompetitividad1pm     = new Competitividad('3001', 'Descripción del producto', new TiendasCompetitividad('0001','Coppel',1010,960),  null, 0, 0,   null, true,  new TiendasCompetitividad('0001','Amazon',950,null), new TiendasCompetitividad('0001','Bodega Aurrera',1050,1000), new TiendasCompetitividad('0001','Chedraui',900,850), new TiendasCompetitividad('0001','Liberpool',800,null),'clase','departamento','America','Silver',2);
    const objetoCompetitividad1pmn    = new Competitividad('4001', 'Descripción del producto', new TiendasCompetitividad('0001','Coppel',1000,850),  null, 0, 0,   null, true,  new TiendasCompetitividad('0001','Amazon',960,null), new TiendasCompetitividad('0001','Bodega Aurrera',1050,1000), new TiendasCompetitividad('0001','Chedraui',900,850), new TiendasCompetitividad('0001','Liberpool',1050,null),'clase','departamento','America','Silver',1);

    const objetoCompetitividad2   = new Competitividad('1002', 'Descripción del producto', new TiendasCompetitividad('0001','Coppel',750,null),   null, 0, 0,   null, true, new TiendasCompetitividad('0001','Amazon',700,null), new TiendasCompetitividad('0001','Bodega Aurrera',800,null), new TiendasCompetitividad('0001','Chedraui',900,null), new TiendasCompetitividad('0001','Liberpool',1000,null),'clase','departamento','America','Silver',2);
    const objetoCompetitividad2p  = new Competitividad('2002', 'Descripción del producto', new TiendasCompetitividad('0001','Coppel',800,750),    null, 0, 0,   null, true, new TiendasCompetitividad('0001','Amazon',750,700), new TiendasCompetitividad('0001','Bodega Aurrera',850,800), new TiendasCompetitividad('0001','Chedraui',950,900), new TiendasCompetitividad('0001','Liberpool',1050,1000),'clase','departamento','America','Silver',3);

    const objetoCompetitividad4   = new Competitividad('1003', 'Descripción del producto', new TiendasCompetitividad('0001','Coppel',1000,null),  null, 0, 0,   null, true, new TiendasCompetitividad('0001','Amazon',1100,null), new TiendasCompetitividad('0001','Bodega Aurrera',1200,null), new TiendasCompetitividad('0001','Chedraui',1300,null), new TiendasCompetitividad('0001','Liberpool',1400,null),'clase','departamento','America','Silver',2);
    const objetoCompetitividad4p  = new Competitividad('2003', 'Descripción del producto', new TiendasCompetitividad('0001','Coppel',1050,1000),  null, 0, 0,   null, true, new TiendasCompetitividad('0001','Amazon',1150,1100), new TiendasCompetitividad('0001','Bodega Aurrera',1250,1200), new TiendasCompetitividad('0001','Chedraui',1350,1300), new TiendasCompetitividad('0001','Liberpool',1450,1400),'clase','departamento','America','Silver',1);

    const objetoCompetitividad5   = new Competitividad('1004', 'Descripción del producto', new TiendasCompetitividad('0001','Coppel',989,null),   null, 0, 0,   null, true,  new TiendasCompetitividad('0001','Amazon',1000,null), new TiendasCompetitividad('0001','Bodega Aurrera',890,null), new TiendasCompetitividad('0001','Chedraui',1100,null), new TiendasCompetitividad('0001','Liberpool',1200,null),'clase','departamento','America','Silver',3);
    const objetoCompetitividad5p  = new Competitividad('2004', 'Descripción del producto', new TiendasCompetitividad('0001','Coppel',1040,989),   null, 0, 0,   null, true,  new TiendasCompetitividad('0001','Amazon',1050,1000), new TiendasCompetitividad('0001','Bodega Aurrera',1350,890), new TiendasCompetitividad('0001','Chedraui',1150,1100), new TiendasCompetitividad('0001','Liberpool',1250,1200),'clase','departamento','America','Silver',1);

    const objetoCompetitividad6   = new Competitividad('1005', 'Descripción del producto', new TiendasCompetitividad('0001','Coppel',1000,null),  null, 0, 0,   null, true, new TiendasCompetitividad('0001','Amazon',null,null), new TiendasCompetitividad('0001','Bodega Aurrera',null,null), new TiendasCompetitividad('0001','Chedraui',null,null), new TiendasCompetitividad('0001','Liberpool',null,null),'clase','departamento','America','Silver',0);
    const objetoCompetitividad6p  = new Competitividad('2005', 'Descripción del producto', new TiendasCompetitividad('0001','Coppel',1050,1000),  null, 0, 0,   null, true, new TiendasCompetitividad('0001','Amazon',null,null), new TiendasCompetitividad('0001','Bodega Aurrera',null,null), new TiendasCompetitividad('0001','Chedraui',null,null), new TiendasCompetitividad('0001','Liberpool',null,null),'clase','departamento','America','Silver',1);

    this.arregloCompetitividad.push(objetoCompetitividad1);
    this.arregloCompetitividad.push(objetoCompetitividad1p);
    this.arregloCompetitividad.push(objetoCompetitividad1pm);
    this.arregloCompetitividad.push(objetoCompetitividad1pmn);

    this.arregloCompetitividad.push(objetoCompetitividad2);
    this.arregloCompetitividad.push(objetoCompetitividad2p);

    this.arregloCompetitividad.push(objetoCompetitividad4);
    this.arregloCompetitividad.push(objetoCompetitividad4p);

    this.arregloCompetitividad.push(objetoCompetitividad5);
    this.arregloCompetitividad.push(objetoCompetitividad5p);

    this.arregloCompetitividad.push(objetoCompetitividad6);
    this.arregloCompetitividad.push(objetoCompetitividad6p);

    this.calculoPrecios();

    this.contadorPrecios();
    this.filteredCompetitividad()
    this.fueraCompetitividad()
    this.dentroCompetitividad()
    this.sinCompetidor()
    this.conCompetidor()
  }
  contadorPrecios() {
    this.arregloCompetitividad.forEach(elemento=>{
      this.preciosTotales++;
      if(elemento.precioMasCompetitivo === null){
        this.preciosSinCompetidor++;
      }else{
        this.preciosConCompetidor++;
      }
    })

    this.arregloCompetitividad.forEach(elemento=>{
      if(elemento.diferencialMargen <= 10 && elemento.precioMasCompetitivo!==null){
        this.preciosDentroCompetitividad++;
      }
    })

    this.arregloCompetitividad.forEach(elemento=>{
      if(elemento.precioSugeridoPorcentaje !== null){
        this.preciosFueraCompetitividad++;
      }
    })
  }

  calculoPrecios(){
    this.arregloCompetitividad.forEach(elemento=>{
      const tempWithoutCoppel:number|null = this.getMinValueWithoutCoppel(elemento)
      elemento.diferencialUtilidad=  elemento.coppel.precioPromocion!==null?
                                      tempWithoutCoppel!==null?
                                        elemento.coppel.precioPromocion-tempWithoutCoppel
                                        :0
                                      :elemento.coppel.precioRegular!==null?
                                        tempWithoutCoppel!==null?
                                          elemento.coppel.precioRegular-tempWithoutCoppel
                                          :0
                                        :0

      console.log(":( "+elemento.diferencialUtilidad)
    })

    this.arregloCompetitividad.forEach(elemento=>{

      const tempWithoutCoppel:number|null = this.getMinValueWithoutCoppel(elemento)
      elemento.diferencialMargen=   elemento.coppel.precioPromocion!==null?
                                      tempWithoutCoppel!==null?
                                        ((elemento.coppel.precioPromocion-tempWithoutCoppel)/tempWithoutCoppel)*100
                                        :0
                                      :elemento.coppel.precioRegular!==null?
                                        tempWithoutCoppel!==null?
                                          ((elemento.coppel.precioRegular-tempWithoutCoppel)/tempWithoutCoppel)*100
                                          :0
                                        :0
      elemento.diferencialMargen= Math.round(elemento.diferencialMargen)
      this.porcentajes.push(elemento.diferencialMargen)
      console.log(":) "+elemento.diferencialMargen)
    })
    this.porcentajeMinimo=this.getPorcetajeMinimo(this.porcentajes)
    this.porcentajeMaximo=this.getPorcetajeMaximo(this.porcentajes)
    this.rangeValues.push(this.porcentajeMinimo);
    this.rangeValues.push(this.porcentajeMaximo);
    this.arregloCompetitividad.forEach(elemento=>{
      elemento.precioMasCompetitivo=this.getMinValueWithoutCoppel(elemento);
      if(elemento.precioMasCompetitivo!==null && elemento.diferencialMargen>10){
        elemento.precioSugeridoPorcentaje=elemento.precioMasCompetitivo+(elemento.precioMasCompetitivo*0.10);
      } else{
        elemento.precioSugeridoPorcentaje=null;
      }
    })
  }
}

