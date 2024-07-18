import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Competitividad } from 'src/app/model/competitividad';
import { Router } from '@angular/router';
import { Folio } from 'src/app/model/folio';
import { Codigo } from 'src/app/model/codigo';

@Component({
  selector: 'app-seguimiento-folios',
  templateUrl: './seguimiento-folios.component.html',
  styleUrls: ['./seguimiento-folios.component.scss']
})

export class SeguimientoFoliosComponent implements OnInit{

  selectedData: any;

  showOverlay(event: any, data: any, overlaypanel: any) {
    this.selectedData = data;
    overlaypanel.toggle(event);
  }

  hideOverlay(overlaypanel: any) {
    overlaypanel.hide();
  }

  switchEvent(){
    if(this.switchMargen){
      this.switchName='utilidad'
    }else{
      this.switchName='margen'
    }
  }
  switchName:string="margen"
  switchMargen:boolean = false;

  macrocategoriaFormGroup: FormGroup;
  macrocategoria = [
    { name: 'Celulares', code: '00001' },
    { name: 'Enseres domesticos', code: '00002' },
    { name: 'Celular y recamaras', code: '00003' },
    { name: 'Joyeria y relojeria', code: '00004' },
    { name: 'Juguetes, bebes y ap. ejercicio', code: '00005' }
  ];

  categoriaFormGroup: FormGroup;
  categoria = [
    { name: 'Audio y video', code: '00006' },
    { name: 'Automotriz', code: '00007' },
    { name: 'Bebes', code: '00008' },
    { name: 'Belleza y cuidado personal', code: '00009' },
    { name: 'Bicicleta y movilidad electrica', code: '00010' }
  ];

  subcategoriaFormGroup: FormGroup;
  subcategoria = [
    { name: 'Accesorios', code: '00011' },
    { name: 'Aparatos de ejercicio', code: '00012' },
    { name: 'Articulos de oficina', code: '00013' },
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

  rangosFormGroup: FormGroup;
  rangos = [
    { name: '0% - 10%', code: '00001' },
    { name: '11% - 20%', code: '00002' },
    { name: '21% - 30%', code: 'C00003' },
    { name: '31% - 40%', code: '00004' },
    { name: '41% - 50%', code: '00005' },
    { name: '51% - 60%', code: '00006' }
  ];

  rangeValues: number[] = [0, 100];

  tableFormGroup: FormGroup;

  modalRef: null = null;
  regla = {id_nivel: 1}
  modalRefGenerico: null = null;
  modalRefProveedores: null = null;
  modalRefTablaProveedores: null = null;
  loading:boolean = false;
  usuarios: null = null;
  catalogoDepartamentos: null = null;
  catalogoNivelReglaNegocio: null = null;
  catalogoClases: null = null;
  catalogoClasesAsignadas: null = null;
  catalogoReglasNegocio: null = null;
  catalogoReglasNegocioAll: null = null;
  catalogoNombreReglasNegocio: null = null;
  catalogoNombreReglasNegocioEstrategiaPrecios: null = null;

  selectedDepartamento: null = null;
  selectedNivelReglaNegocio: null = null;
  selectedClase: null = null;
  selectedNombreRegla: null = null;
  selectedNombreReglaPadre: null = null;
  selectedNombreReglaOptimizador: null = null;
  navActivo:boolean = true;

  reglaNegocioEstrategiaPrecios:null = null;
  selected_estatus: boolean = false;
  //selected_objetivo: number;
  selected_tipo_dato: string = "";
  selected_nombre_regla: string = "";
  selected_nombre_regla_optimizador: string = "";
  selected_id_nivel:number=0;
  selected_tipo_valor:string="";
  reglaNegocioEstrategiaPreciosCatalogo:null = null;
  reglaNegocioEstrategiaPreciosCatalogoTemp:null = null;
  reglaNegocioEstrategiaPreciosCatalogoAll:null = null;
  reglaNegocioEstrategiaPreciosCatalogoPadre:null = null;
  reglaNegocioEstrategiaPreciosCatalogoPadreAll:null = null;

  selected_valor_default:string="";
  selected_valor_minimo:string="";
  selected_valor_maximo:string="";


  arregloCompetitividad: Competitividad[];
  arregloFolio: Folio[];
  selectedArregloCompetitividad: Competitividad[];
  filteredArregloCompetitividad: Competitividad[];

  selectedArregloCompetitividadEnviados: Competitividad[];
  filteredArregloCompetitividadEnviados: Competitividad[];


  checkedMargenUtilidad:boolean;
  fechaFiltro:string;
  multiMargenUtilidad:boolean;


  //Paginador
  startRow:number=0;
  rowsPerPage:number=0;
  numeroPaginas:number=0;
  totalRegistros:number=0;
  checkSelectAll:boolean=false;

  reglas: null = null;
  usuario: null = null;

  catalogoProveedores:null = null
  catalogoProveedoresAsignados:null = null
  catalogoProveedoresSeleccionados:null = null

  tipo_lista:boolean=false;
  tipo_porcentaje_o_dias:boolean=false;
  valor_cargado:boolean=false;

  grupoReglasPadre:null = null;

  objetivos_optimizacion: null = null;
  objetivos_selected:null = null;

  filteredCompetitividades: Competitividad[] = [];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
  ) {
      this.macrocategoriaFormGroup = this.formBuilder.group({
        selectedMacrocategoria: [],
        macrocategoria: this.macrocategoria
      });
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
      this.rangosFormGroup = this.formBuilder.group({
        selectedRango: [],
        rangos: this.rangos
      });
      this.tableFormGroup = this.formBuilder.group({
      });
      this.arregloCompetitividad = new Array<Competitividad>
      this.arregloFolio = new Array<Folio>;
      this.selectedArregloCompetitividad = new Array<Competitividad>
      this.filteredArregloCompetitividad = new Array<Competitividad>

      this.selectedArregloCompetitividadEnviados = new Array<Competitividad>
      this.filteredArregloCompetitividadEnviados = new Array<Competitividad>

      this.checkedMargenUtilidad=false;
      this.fechaFiltro="03/05/2024"
      this.multiMargenUtilidad=true;

  }

  ngOnInit(): void {

    // this.ingresandoValoresDummy();
    this.ingresandoValoresDummyFolios();
    console.log("tabla competitividad")
    console.table(this.arregloCompetitividad)
  }

  toggleEnviarPrecio(competividad: Competitividad) {
    competividad.enviarPrecio = !competividad.enviarPrecio;
  }

  enviarPreciosSeleccionados(){
    this.router.navigate(['flujo-precios'],{
      queryParams:
      {
        selectedArregloCompetitividad:JSON.stringify(this.selectedArregloCompetitividad)
      }
    });
  }

  irFiltros(){
    this.router.navigate(['filtros-gestion-precios']);
  }

  irSeguimientoCompetitividad() {
    this.router.navigate(['seguimiento-competitividad']);
  }


  filteredCompetitividad() {
    this.filteredArregloCompetitividad = this.arregloCompetitividad.filter(competitividad =>
      competitividad.diferencialMargen >= this.rangeValues[0] &&
      competitividad.diferencialMargen <= this.rangeValues[1]
    );

    this.filteredArregloCompetitividadEnviados = this.filteredArregloCompetitividad;


  }

  onSliderChange() {
    this.filteredCompetitividad();
  }

  selectedfecha(){
    console.log(this.fechaFiltro)
  }


  public ingresandoValoresDummyFolios() {

    const objetoFolio1 = new Folio('0001', '2024-05-23', 'Enviado', 'Celulares', 'Audio y video', 'Accesorios', 'Accesorios Celulares', '1.2 a 1.4 Pies', '2Fast 4You', [
      new Codigo('1001', 'Descripción', '700', '10%', '900', '12%', 'tipo cambio', Date.now().toString()),
      new Codigo('1002', 'Descripción', '800', '10%', '1000', '10%', 'tipo cambio', Date.now().toString()),
      new Codigo('1003', 'Descripción', '1700', '10%', '1900', '12%', 'tipo cambio', Date.now().toString()),
    ]);
    const objetoFolio2 = new Folio('0002', '2024-05-23', 'Enviado', 'Enceres domesticos', 'Automotriz', 'Aparatos de ejercicio', 'Accesorios Celulares Apple', '1.5 Pies a mayores', 'A Occhiali', [
      new Codigo('1001', 'Descripción', '700', '10%', '900', '12%', 'tipo cambio', Date.now().toString()),
      new Codigo('1002', 'Descripción', '800', '10%', '1000', '10%', 'tipo cambio', Date.now().toString()),
      new Codigo('1003', 'Descripción', '1700', '10%', '1900', '12%', 'tipo cambio', Date.now().toString()),
    ]);
    const objetoFolio3 = new Folio('0003', '2024-05-23', 'Enviado', 'Celular y recamaras', 'Bebes', 'Articulos de oficina', 'Accesorios TV', '2 Quemadores', 'Acer', [
      new Codigo('1001', 'Descripción', '700', '10%', '900', '12%', 'tipo cambio', Date.now().toString()),
      new Codigo('1002', 'Descripción', '800', '10%', '1000', '10%', 'tipo cambio', Date.now().toString()),
      new Codigo('1003', 'Descripción', '1700', '10%', '1900', '12%', 'tipo cambio', Date.now().toString()),
    ]);
    const objetoFolio4 = new Folio('0004', '2024-05-23', 'Enviado', 'Joyeria y relojeria', 'Belleza y cuidado personal', 'Aseo de caja', 'Aires Acondicionados', '4 Quemadores', 'Acros', [
      new Codigo('1001', 'Descripción', '700', '10%', '900', '12%', 'tipo cambio', Date.now().toString()),
      new Codigo('1002', 'Descripción', '800', '10%', '1000', '10%', 'tipo cambio', Date.now().toString()),
      new Codigo('1003', 'Descripción', '1700', '10%', '1900', '12%', 'tipo cambio', Date.now().toString()),
    ]);
    const objetoFolio5 = new Folio('0005', '2024-05-23', 'Enviado', 'Juguetes, bebes y ap. ejercicio', 'Bicicleta y movilidad electrica', 'Audio', 'Albercas', '5 Pies', 'Activision', [
      new Codigo('1001', 'Descripción', '700', '10%', '900', '12%', 'tipo cambio', Date.now().toString()),
      new Codigo('1002', 'Descripción', '800', '10%', '1000', '10%', 'tipo cambio', Date.now().toString()),
      new Codigo('1003', 'Descripción', '1700', '10%', '1900', '12%', 'tipo cambio', Date.now().toString()),
    ]);
    const objetoFolio6 = new Folio('0006', '2024-05-23', 'Enviado', 'Celulares', 'Audio y video', 'Accesorios', 'Accesorios Celulares', '1.2 a 1.4 Pies', '2Fast 4You', [
      new Codigo('1001', 'Descripción', '700', '10%', '900', '12%', 'tipo cambio', Date.now().toString()),
      new Codigo('1002', 'Descripción', '800', '10%', '1000', '10%', 'tipo cambio', Date.now().toString()),
      new Codigo('1003', 'Descripción', '1700', '10%', '1900', '12%', 'tipo cambio', Date.now().toString()),
    ]);
    const objetoFolio7 = new Folio('0007', '2024-05-23', 'Enviado', 'Enceres domesticos', 'Automotriz', 'Aparatos de ejercicio', 'Accesorios Celulares Apple', '1.5 Pies a mayores', 'A Occhiali', [
      new Codigo('1001', 'Descripción', '700', '10%', '900', '12%', 'tipo cambio', Date.now().toString()),
      new Codigo('1002', 'Descripción', '800', '10%', '1000', '10%', 'tipo cambio', Date.now().toString()),
      new Codigo('1003', 'Descripción', '1700', '10%', '1900', '12%', 'tipo cambio', Date.now().toString()),
    ]);
    const objetoFolio8 = new Folio('0008', '2024-05-23', 'Enviado', 'Celular y recamaras', 'Bebes', 'Articulos de oficina', 'Accesorios TV', '2 Quemadores', 'Acer', [
      new Codigo('1001', 'Descripción', '700', '10%', '900', '12%', 'tipo cambio', Date.now().toString()),
      new Codigo('1002', 'Descripción', '800', '10%', '1000', '10%', 'tipo cambio', Date.now().toString()),
      new Codigo('1003', 'Descripción', '1700', '10%', '1900', '12%', 'tipo cambio', Date.now().toString()),
    ]);
    const objetoFolio9 = new Folio('0009', '2024-05-23', 'Enviado', 'Joyeria y relojeria', 'Belleza y cuidado personal', 'Aseo de caja', 'Aires Acondicionados', '4 Quemadores', 'Acros', [
      new Codigo('1001', 'Descripción', '700', '10%', '900', '12%', 'tipo cambio', Date.now().toString()),
      new Codigo('1002', 'Descripción', '800', '10%', '1000', '10%', 'tipo cambio', Date.now().toString()),
      new Codigo('1003', 'Descripción', '1700', '10%', '1900', '12%', 'tipo cambio', Date.now().toString()),
    ]);
    const objetoFolio10 = new Folio('0010', '2024-05-23', 'Enviado', 'Juguetes, bebes y ap. ejercicio', 'Bicicleta y movilidad electrica', 'Audio', 'Albercas', '5 Pies', 'Activision', [
      new Codigo('1001', 'Descripción', '700', '10%', '900', '12%', 'tipo cambio', Date.now().toString()),
      new Codigo('1002', 'Descripción', '800', '10%', '1000', '10%', 'tipo cambio', Date.now().toString()),
      new Codigo('1003', 'Descripción', '1700', '10%', '1900', '12%', 'tipo cambio', Date.now().toString()),
    ]);

    this.arregloFolio.push(objetoFolio1);
    this.arregloFolio.push(objetoFolio2);
    this.arregloFolio.push(objetoFolio3);
    this.arregloFolio.push(objetoFolio4);
    this.arregloFolio.push(objetoFolio5);
    this.arregloFolio.push(objetoFolio6);
    this.arregloFolio.push(objetoFolio7);
    this.arregloFolio.push(objetoFolio8);
    this.arregloFolio.push(objetoFolio9);
    this.arregloFolio.push(objetoFolio10);
    console.log(objetoFolio1.codigo[0].num_codigo);
    // this.filteredFolios();
  }
}
