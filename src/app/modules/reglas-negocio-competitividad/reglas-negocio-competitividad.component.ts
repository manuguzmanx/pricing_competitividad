import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Competitividad } from 'src/app/model/competitividad';
import { Folio } from 'src/app/model/folio';

@Component({
  selector: 'app-reglas-negocio-competitividad',
  templateUrl: './reglas-negocio-competitividad.component.html',
  styleUrls: ['./reglas-negocio-competitividad.component.scss']
})

export class ReglasNegocioCompetitividadComponentComponent implements OnInit{

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

  reglas_negocio = [
    {
      macrocategoria: 'Enseres Domésticos',
      categoria: 'Automotriz',
      diferencia_vs_competitividad: '7%',
      duracion_promocion_dias: '5',
      dias_ser_competitivo: '3',
    },
    {
      macrocategoria: 'Celular y Recámaras',
      categoria: 'Bebés',
      diferencia_vs_competitividad: '9%',
      duracion_promocion_dias: '5',
      dias_ser_competitivo: '3',
    },
    {
      macrocategoria: 'Joyería y Relojería',
      categoria: 'Belleza y CuidadoPersonal',
      diferencia_vs_competitividad: '8%',
      duracion_promocion_dias: '5',
      dias_ser_competitivo: '3',
    },
    {
      macrocategoria: 'Enseres Domésticos',
      categoria: 'Automotriz',
      diferencia_vs_competitividad: '7%',
      duracion_promocion_dias: '5',
      dias_ser_competitivo: '3',
    },
    {
      macrocategoria: 'Celular y Recámaras',
      categoria: 'Bebés',
      diferencia_vs_competitividad: '9%',
      duracion_promocion_dias: '5',
      dias_ser_competitivo: '3',
    },
    {
      macrocategoria: 'Joyería y Relojería',
      categoria: 'Belleza y CuidadoPersonal',
      diferencia_vs_competitividad: '8%',
      duracion_promocion_dias: '5',
      dias_ser_competitivo: '3',
    },
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

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.macrocategoriaFormGroup = this.formBuilder.group({ selectedMacrocategoria: [], macrocategoria: this.macrocategoria});
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

  }

  public agregarRegla() {

  }





  selectedfecha(){
    console.log(this.fechaFiltro)
  }


}
