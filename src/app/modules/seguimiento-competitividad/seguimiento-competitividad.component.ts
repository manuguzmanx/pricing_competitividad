import { Component, LOCALE_ID, OnInit, Pipe, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Competitividad } from 'src/app/model/competitividad';
import { Router } from '@angular/router';
import { CompetitividadService } from 'src/app/services/competitividad.service';
import { TiendasCompetitividad } from '../../model/tiendas-competitividad';
import { PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Calendar } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Legend } from 'chart.js';
import { HttpBackend } from '@angular/common/http';


@Component({
  selector: 'app-seguimiento-competitividad',
  templateUrl: './seguimiento-competitividad.component.html',
  styleUrls: ['./seguimiento-competitividad.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' },PrimeNGConfig,DatePipe],
})
export class SeguimientoCompetitividadComponent{
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


  tooltipData: any;

  onMouseEnter(objeto: any) {
    this.tooltipData = objeto;
  }


  optionsDataChartHistorico:any;
  dataChartHistorico: any ;
  chartHitoricoOptions:any;

  switchName:string="%"
  switchMargen:boolean = false;

  macrocategoriaFormGroup: FormGroup;


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



  codigos: any[] = [];
  codigosEnRojo: any[] = [];
  codigosEnVerde: any[] = [];
  
  tiendasCoppel: any[] = [];
  tiendasEnVerde: any[] = [];
  tiendasEnRojo: any[] = [];
  
  titulo_modal:string;
  titulo_modal_tienda:string;

  constructor(private formBuilder: FormBuilder, private config: PrimeNGConfig, private datePipe: DatePipe, private renderer: Renderer2,
    private router: Router,
    private competitividadService: CompetitividadService
    ) {
    this.macrocategoriaFormGroup = this.formBuilder.group({
      selectedMacrocategoria: [],
    });
    this.dateTime.setDate(this.dateTime.getDate());
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
    this.titulo_modal = "Código 1001";
    this.titulo_modal_tienda = "Numero de tienda: 123 - Total Sku implementados: 5";
  }

  es: any;
  opcionesFiltros: any[] | undefined;
  opcionesFiltrosModalTiendas: any[] | undefined;
  opcionesFiltrosModalSku: any[] | undefined;
  opcionesFiltrosMomento3: any[] | undefined;
  porcentajes:number[]=[];

  views: any[] | undefined;
  views2: any[] | undefined;
  selectedView: any | undefined;
  selectedView2: any | undefined;
  selectedFiltro: any;
  selectedFiltroModalTiendas: any | undefined;
  selectedFiltroModalSku: any | undefined;
  selectedFiltroMomento3: any;


  tipoCambio:any = [{id:1,name:'Precio Regular'}, {id:2,name:'Promoción'}]
  atendidosChart:any;
  optionsPorCodigo:any;
  optionsPorTienda:any;
  atendidosChart2:any;
  porCodigoChart:any;
  porTiendaChart:any;
  optionsReview:any;
  optionsReview2:any;
  fueraCompChart:any;
  implementadosChart:any;
  noImplementadosChart:any;
  totalM2Chart:any;
  tipoCambioChart:any;
  tiendasValidas:any;
  tiendasNoValidas:any;
  totalVentas:any;
  visibleModal:boolean = false;
  visibleModalTiendas:boolean = false;
  tabModal:any;
  documentStyle : any;
  textColor : any;
  textColorSecondary : any;
  surfaceBorder : any;

  periodicidad:any = [{id:1,name:'Diario'}, {id:2,name:'Semanal'}, {id: 3, name: 'Mensual'}]
  periodicidadSelected: any;



  ngOnInit(): void {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');



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
    this.datosDumyGraficas();

    this.opcionesFiltros = [
      { name: "SKU's", value: 0 },
      { name: "Tiendas", value: 1 },
    ];

    this.opcionesFiltrosModalTiendas = [
      { name: "Todos", value: 0},
      { name: "Implementados", value: 1},
      { name: "No Implementados", value: 2},
    ];

    this.opcionesFiltrosModalSku = [
      { name: "Todos", value: 0},
      { name: "Implementados", value: 1},
      { name: "No Implementados", value: 2},
    ];

    this.opcionesFiltrosMomento3 = [
      { name: "Todos", value: 0 },
      { name: "SKU's", value: 1 },
      { name: "Tiendas", value: 2 },
    ];

    this.selectedFiltro = this.opcionesFiltros[0];
    this.selectedFiltroModalTiendas = this.opcionesFiltrosModalTiendas[0];
    this.selectedFiltroModalSku = this.opcionesFiltrosModalSku[0];
    this.selectedFiltroMomento3 = this.opcionesFiltrosMomento3[0];


    this.views = [
      { name: "Total Sku's", value: 0 },
      { name: "Sku's dentro de competitividad", value: 1 },
      { name: "Sku's fuera de competitividad", value: 2 },
      { name: "Sku's sin competidor", value: 3 }
    ];

    this.selectedView = this.views[2];

    this.views2 = [
      { name: "Sku's en línea", value: 0 },
      { name: "Sku's descontinuados", value: 1 },
    ];

    this.selectedView2 = this.views2[0];


    //Tabla
    this.inicializarDatosDummy();
    this.intDataHistorico();


  }

  intDataHistorico(){
    this.dataChartHistorico = {
      labels: ['26/06/2024', '27/06/2024', '28/06/2024', '29/06/2024', '30/06/2024', '02/07/2024', '02/07/2024'],
      datasets: [
          {
              label: 'Totales',
              data: [5000, 5000, 5000, 5000, 5000, 5000, 5000],
              fill: false,
              backgroundColor: [ '#1046FF'],
              borderColor: ['#1046FF'],
              tension: 0.1,
          },
          {
              label: 'Implementados',
              data: [2200, 2600, 3000, 3250, 3450, 3550, 4000],
              fill: false,
              backgroundColor: [ '#265aa7ff'],
              borderColor: ['#265aa7ff'],
              tension: 0.1
          },
          {
            label: 'No implementados',
            data: [2800, 2400, 2000, 1750, 1550, 1450, 1000],
            fill: false,
            backgroundColor: [ '#c6c4c4'],
            borderColor: ['#c6c4c4'],
            tension: 0.1
        },
        
      ]
    };
    this.optionsDataChartHistorico={
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
            display: true,
            position: 'top',
            labels:  {
           
                color: this.textColor
            }
          }
      },
      scales: {
          x: {
            title: {
              display: false,
              text: 'Día'
            },
              ticks: {
                  color: this.textColorSecondary
              },
              grid: {
                  color: this.surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
            title: {
              display: true,
             text: 'SKU\'s'
            },
              ticks: {
                  color: this.textColorSecondary
              },
              grid: {
                  color: this.surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };
  };

  public filtroM2() {
    this.selectedFiltro.value != 0 ? this.selectedFiltro.value = 1 : this.selectedFiltro.value = 0;
  }

  /* filtroMomento3() {
    this.selectedFiltroMomento3.value != 0 ? this.selectedFiltroMomento3.value = 1 : this.selectedFiltroMomento3.value = 0;
  }
 */
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





  //Tabla
  isPromo(item:any){
    return item.tipo.id == this.tipoCambio[1].id;
  }

  temporalCodigos:any[] = [];
  temporalTiendasCoppel:any[] = [];

  inicializarDatosDummy() {

    this.temporalCodigos = [{
      sku: '1001',
      pp: { precio: false },
      coppel: { precio: 1000, margen_real:  30},
      mc: { comp: 'Aurrera', precio: 700},
      diferencial: 43,
      ps: { precio: 770, diferencial: 16, prcpr: 0, prccp: 12},
      fi: "26/06/2024",
      ff: "03/07/2024",
      canal: { fisico: true, digital: true},
      pi: 770,
      tipo: { id:  1},
      tiendas: {implementado: 875, no_implementado: 125},
      tc: "Promocion"
    },
    {
      sku: '2001',
      pp: { precio: true },
      coppel: { precio: 1000, margen_real:  31},
      mc: { comp: 'Aurrera', precio: 700},
      diferencial: 43,
      ps: { precio: 770, diferencial: 10, prcpr: 0, prccp: 12},
      fi: "26/06/2024",
      ff: "NA",
      canal: { fisico: true, digital: true},
      pi: 770,
      tipo: { id:  2},
      tiendas: {implementado: 1000, no_implementado: 0},
      tc: "Cambio de precio"
    },
    {
      sku: '3001',
      pp: { precio: true },
      coppel: { precio: 960, margen_real:  31},
      mc: { comp: 'Liverpool', precio: 800},
      diferencial: 20,
      ps: { precio: 880, diferencial: 10, prcpr: 0, prccp: 4},
      fi: "26/06/2024",
      ff: "03/07/2024",
      canal: { fisico: true, digital: true},
      pi: 900,
      tipo: { id:  2},
      tiendas: {implementado: 500, no_implementado: 500},
      tc: "Promocion"
    },
    {
      sku: '1004',
      pp: { precio: true },
      coppel: { precio: 989, margen_real:  31},
      mc: { comp: 'Aurrera', precio: 890},
      diferencial: 11,
      ps: { precio: 979, diferencial: 10, prcpr: 0, prccp: 1},
      fi: "26/06/2024",
      ff: "03/07/2024",
      canal: { fisico: true, digital: true},
      pi: 990,
      tipo: { id:  2},
      tiendas: {implementado: 800, no_implementado: 200},
      tc: "Promocion"
    },
    {
      sku: '2004',
      pp: { precio: true },
      coppel: { precio: 989, margen_real:  31},
      mc: { comp: 'Aurrera', precio: 890},
      diferencial: 11,
      ps: { precio: 979, diferencial: 10, prcpr: 0, prccp: 1},
      fi: "26/06/2024",
      ff: "NA",
      canal: { fisico: true, digital: true},
      pi: 979,
      tipo: { id:  2},
      tiendas: {implementado: 800, no_implementado: 200},
      tc: "Cambio de precio"
    },]

    this.codigos = [];

    this.temporalTiendasCoppel=[
      {
        num : "0001",
        nombre: "Cuernavaca",
        pb: 1000,
        pmc: 700,
        pc: 770,
        pi: 770,
        implementados: 2,
        no_implementado: 3,
        promo: 3,
        cambio: 4,
        implementado: true
      },
      {
        num : "0002",
        nombre: "Veracruz",
        pb: 1000,
        pmc: 700,
        pc: 770,
        pi: 1000,
        implementados: 3,
        no_implementado: 2,
        implementado: false
      },
      {
        num : "0003",
        nombre: "Queretaro",
        pb: 1000,
        pmc: 700,
        pc: 770,
        pi: 770,
        implementados: 4,
        no_implementado: 1,
        implementado: true
      },
      {
        num : "0004",
        nombre: "Monterrey",
        pb: 1000,
        pmc: 700,
        pc: 770,
        pi: 770,
        implementados: 2,
        no_implementado: 3,
        implementado: false
      },
      {
        num : "0004",
        nombre: "Zacatecas",
        pb: 1000,
        pmc: 700,
        pc: 770,
        pi: 770,
        implementados: 3,
        no_implementado: 2,
        implementado: false
      },
      {
        num : "0006",
        nombre: "San Luis",
        pb: 1000,
        pmc: 700,
        pc: 770,
        pi: 780,
        implementados: 4,
        no_implementado: 1,
        implementado: false
      },
      {
        num : "0007",
        nombre: "Queretaro",
        pb: 1000,
        pmc: 700,
        pc: 770,
        pi: 770,
        implementados: 5,
        no_implementado: 0,
        implementado: true
      },
      {
        num : "0008",
        nombre: "Monterrey",
        pb: 1000,
        pmc: 700,
        pc: 770,
        pi: 770,
        implementados: 2,
        no_implementado: 3,
        implementado: false
      },
      {
        num : "0009",
        nombre: "Zacatecas",
        pb: 1000,
        pmc: 700,
        pc: 770,
        pi: 770,
        implementados: 4,
        no_implementado: 1,
        implementado: false
      },
      {
        num : "0010",
        nombre: "San Luis",
        pb: 1000,
        pmc: 700,
        pc: 770,
        pi: 780,
        implementados: 3,
        no_implementado: 2,
        implementado: false
      }
    ];
    this.tiendasCoppel = []


    this.codigos = [...this.temporalCodigos]
    this.codigosEnVerde = [...this.temporalCodigos].filter(codigo =>
    codigo.ps.precio == codigo.pi);
    this.codigosEnRojo = [...this.temporalCodigos].filter(codigo =>
    codigo.ps.precio != codigo.pi);

    this.tiendasCoppel = [...this.temporalTiendasCoppel]
    this.tiendasEnVerde = [...this.temporalTiendasCoppel].filter(tienda =>
    tienda.pc == tienda.pi);
    this.tiendasEnRojo = [...this.temporalTiendasCoppel].filter(tienda =>
    tienda.pc != tienda.pi);
  }


  filtroMomento2VerTiendas(){

    if(this.selectedFiltroModalTiendas.value === 0){
      this.codigos = [...this.temporalCodigos];
    }
    if(this.selectedFiltroModalTiendas.value === 1){
      this.codigos = [...this.codigosEnVerde];
    }
    if (this.selectedFiltroModalTiendas.value === 2){
      this.codigos = [...this.codigosEnRojo];
    }

  }


  filtroMomento2VerCodigos(){

    if(this.selectedFiltroModalSku.value === 0){
      this.tiendasCoppel = [...this.temporalTiendasCoppel];
    }
    if(this.selectedFiltroModalSku.value === 1){
      this.tiendasCoppel = [...this.tiendasEnVerde];
    }
    if (this.selectedFiltroModalSku.value === 2){
      this.tiendasCoppel = [...this.tiendasEnRojo];
    }

  }

  datosDumyGraficas() {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.optionsPorTienda = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          tooltip: {
              mode: 'index',
              intersect: false
          },
          legend: {
            display:true,
            position: 'right' ,
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
            title: {
              display: true,
              text: "Tiendas"
            },
              stacked: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
            title: {
              display: true,
              text: "Códigos"
            },
              stacked: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
    };

    this.optionsPorCodigo = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          tooltip: {
              mode: 'index',
              intersect: false
          },
          legend: {
            display:true,
            position: 'right' ,
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
            title: {
              display: true,
              text: "Códigos"
            },
              stacked: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
            title: {
              display: true,
              text: "Tiendas"
            },
              stacked: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
    };


    this.porTiendaChart = {
      labels: ["1","2","3","4","5","6","8","9","10"],
      datasets: [
        {
          type: 'bar',
          label:"Implementados",
          data: [2, 3, 4, 2, 3, 4, 5, 2, 4, 5, 3, 2],
          backgroundColor: [ '#265aa7ff'],
          borderColor: ['#4598d3ff'],
          borderWidth: 1
        },
        {
          type: 'bar',
          label:"No Implementados",
          data: [3, 2, 1, 3, 2, 1, 0, 3, 1, 0, 2, 3],
          backgroundColor: [ '#c6c4c4'],
          borderColor: ['#666666'],
          borderWidth: 1
        }
      ],

    }

    this.porCodigoChart = {
      labels: ["1001", "2001", "3001", "1004", "2004"],
      datasets: [
        {
          type: 'bar',
          label:"Implementado",
          data: [875, 1000, 500, 800, 800],
          backgroundColor: [ '#265aa7ff'],
          borderColor: ['#4598d3ff'],
          borderWidth: 1
        },
        {
          type: 'bar',
          label:"No implementado",
          data: [125, 0, 500, 200, 200],
          backgroundColor: [ '#c6c4c4'],
          borderColor: ['#666666'],
          borderWidth: 1
        }
      ],

    }


    this.atendidosChart = {
      labels: ['Evaluados', 'Fuera del Ejercicio'],
      datasets: [
          {
              data: [7, 5],
              backgroundColor: [documentStyle.getPropertyValue('--blue-700'), documentStyle.getPropertyValue('--gray-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--gray-400')]
          }
      ]
    };

    this.atendidosChart2 = {
      labels: ['Evaluados', 'Fuera del Ejercicio'],
      datasets: [
          {
              data: [12, 7],
              backgroundColor: [documentStyle.getPropertyValue('--blue-700'), documentStyle.getPropertyValue('--gray-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--gray-400')]
          }
      ]
    };

    this.tiendasValidas = {
      labels: ['Ventas validas a la baja', 'Ventas validas a la alza'],
      datasets: [
          {
              data: [112, 346],
              backgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--green-300'), documentStyle.getPropertyValue('--green-400')]
          }
      ]
    };

    this.tiendasNoValidas = {
      labels: ['Ventas no validas a la baja', 'Ventas no validas a la alza'],
      datasets: [
          {
            data: [91, 62],
              backgroundColor: [documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--red-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--red-300'), documentStyle.getPropertyValue('--red-400')]
          }
      ]
    };

    this.totalVentas = {
      labels: ['Ventas validas', 'Ventas no validas'],
      datasets: [
          {
            data: [458, 153],
              backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400')]
          }
      ]
    };

    this.optionsReview = {
      cutout: '60%',
      plugins: {
          legend: {
              display: false,
              position: 'bottom',
              labels:  {
                  usePointStyle: true,
                  color: textColor,

              }
          }
      }
    };

    this.optionsReview2 = {
      cutout: '60%',
      plugins: {
          legend: {
              display: false,
              position: 'bottom',
              labels:  {
                  usePointStyle: true,
                  color: textColor
              }
          }
      }
    };


    this.fueraCompChart= {
      labels: ['Dentro de Competitividad', 'Fuera de Competitividad'],
      datasets: [
          {
              data: [180, 20],
              backgroundColor: [documentStyle.getPropertyValue('--blue-700'), documentStyle.getPropertyValue('--gray-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--gray-400')],
          }
      ],
    };

    this.implementadosChart = {
      labels: ['Implementados', 'No implementados'],
      datasets: [
          {
              data: [9, 1],
              backgroundColor: [documentStyle.getPropertyValue('--blue-700'), documentStyle.getPropertyValue('--gray-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--gray-400')],
          }
      ],
    }

    this.noImplementadosChart = {
      labels: ['No implementados', 'Implementados'],
      datasets: [
          {
              data: [7, 3],
              backgroundColor: [documentStyle.getPropertyValue('--blue-700'), documentStyle.getPropertyValue('--gray-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--gray-400')],
          }
      ],
    }

    this.totalM2Chart = {
      labels: ['No implementados', 'Implementados'],
      datasets: [
          {
              data: [8, 2],
              backgroundColor: [documentStyle.getPropertyValue('--blue-700'), documentStyle.getPropertyValue('--gray-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--gray-400')],
          }
      ],
    }

    this.tipoCambioChart = {
      labels: ['Precio Regular', 'Promoción'],
      datasets: [
          {
              data: [10, 2],
              backgroundColor: [documentStyle.getPropertyValue('--blue-700'), documentStyle.getPropertyValue('--gray-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--gray-400')]
          }
      ]
    };

  }

  showDetailSKU(){
    this.visibleModal = true;
  }

  showDetailTiendas() {
    this.visibleModalTiendas = true;
  }

  exportarExcelCodigos() {
    console.log('Exportando códigos...');
  }

  exportarExcelTiendas() {
    console.log('Exportando tiendas...');
  }

  exportarExcelModalTiendas() {
    console.log('Exportando modal tiendas');
  }

  exportarExcelModalCodigos() {
    console.log('Exportando excel modal códigos');
  }

}
