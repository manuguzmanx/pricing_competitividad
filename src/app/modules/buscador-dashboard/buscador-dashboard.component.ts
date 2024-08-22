import { Macrocategoria } from './../../model/macrocategoria';
import { DashboardSeguimientoService } from './../../services/dashboard-seguimiento.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-buscador-dashboard',
  templateUrl: './buscador-dashboard.component.html',
  styleUrls: ['./buscador-dashboard.component.scss']
})
export class BuscadorDashboardComponent implements OnInit{
  @Output() parametrosChange = new EventEmitter<any>();

  macrocategoria:any[] = []
  selectedMacrocategoria:any[] = []
  flagMacrocategoria:boolean = false

  categoria:any[] = []
  selectedCategoria:any[] = []
  flagCategoria:boolean = false
  filteredCategorias: any[] = [];

  subcategoria:any[] = []
  selectedSubCategoria:any[] = []
  flagSubcategoria:boolean = false
  filteredSubCategorias:any[] = []

  clase:any[] = []
  selectedClase:any[] = []
  flagClase:boolean = false

  familia:any[] = []
  selectedFamilia:any[] = []
  flagFamilia:boolean = false

  proveedor:any[] = []
  selectedProveedor:any[] = []
  flagProveedor:boolean = false
  filteredProveedores:any[] =[]

  fechaFiltro:any = Date.now()

  folio:any[] = []
  selectedFolio:any[] = []
  flagFolio:boolean = false

  codigo:any[] = []
  selectedCodigo:any[] = []
  flagCodigo:boolean = false

  listaSkus:any[] = []

  cantFiltrados:number = 0

  dateTime = new Date();

  constructor( private seguimientoService: DashboardSeguimientoService){
    this.dateTime.setDate(this.dateTime.getDate());
    const eventStr = this.dateTime.toString();
    const monthMap: { [key: string]: string } = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    const [weekday, month, day, year] = eventStr.split(' ');
    const formattedDate = `${day}/${monthMap[month]}/${year}`;
    this.fechaFiltro = formattedDate;
  }

  ngOnInit(): void {
    this.actualizarFiltros()
    
  }







  actualizarFiltros(){
    const searchParams = {
      Macrocategoria: this.selectedMacrocategoria?.map(m => m.id) || [],
      Categoria: this.selectedCategoria?.map(c => c.id) || [],
      SubCategoria: this.selectedSubCategoria?.map(s => s.id) || [],
      Clase: this.selectedClase?.map(c => c.id) || [],
      Familia: this.selectedFamilia?.map(f => f.id) || [],
      Proveedor: this.selectedProveedor?.map(p => p.id) || [],
      Folio: this.selectedFolio?.map(f => f.id) || [],
      numero: this.selectedCodigo?.map(c => c.numero) || [],
      fecha: this.fechaFiltro
    };

    forkJoin({
      macrocategoria: this.seguimientoService.getMacrocategoria(searchParams),
      categoria: this.seguimientoService.getCategoria(searchParams),
      subcategoria: this.seguimientoService.getSubCategoria(searchParams),
      clase: this.seguimientoService.getClases(searchParams),
      familia: this.seguimientoService.getFamilia(searchParams),
      proveedor: this.seguimientoService.getProveedor(searchParams),
      codigo: this.seguimientoService.getSkus(searchParams),
      folio: this.seguimientoService.getFolios(searchParams)
    }).subscribe(
      ({ macrocategoria, categoria, subcategoria, clase, familia, proveedor, codigo, folio }) => {
        this.macrocategoria = macrocategoria;
        this.categoria = categoria;
        this.subcategoria = subcategoria;
        this.clase = clase;
        this.familia = familia;
        this.proveedor = proveedor;
        this.codigo = codigo;
        this.folio = folio;
        this.cantFiltrados = this.codigo.length
      },
      (error) => {
        console.error('Error al cargar los filtros', error);
        
      }
    );




  }


  buscar() {
    const parametros = {
      Macrocategoria: this.selectedMacrocategoria?.map(m => m.id) || [],
      Categoria: this.selectedCategoria?.map(c => c.id) || [],
      SubCategoria: this.selectedSubCategoria?.map(s => s.id) || [],
      Clase: this.selectedClase?.map(c => c.id) || [],
      Familia: this.selectedFamilia?.map(f => f.id) || [],
      Proveedor: this.selectedProveedor?.map(p => p.id) || [],
      Folio: this.selectedFolio?.map(f => f.id) || [],
      numero: this.selectedCodigo?.map(c => c.numero) || [],
      fecha: this.fechaFiltro
    };

    this.parametrosChange.emit(parametros);

  }
    // this.seguimientoService.buscar(params).subscribe((resultados) => {
    //   console.log('Resultados de la búsqueda:', resultados);
    //   console.log('params:', params);
    // });
  




  verSeleccionados(){
    console.log("selectedMacrocategoria", this.selectedMacrocategoria)
    console.log("selectedCategoria", this.selectedCategoria)
    console.log("selectedSubCategoria", this.selectedSubCategoria)
    console.log("selectedClase", this.selectedClase)
    console.log("selectedFamilia", this.selectedFamilia)
    console.log("selectedProveedor", this.selectedProveedor)
    console.log("selectedFolio", this.selectedFolio)
    console.log("selectedCodigo", this.selectedCodigo)
    
  }


  manageOptionsMacrocategorias(){
    this.actualizarFiltros()
    if(this.selectedMacrocategoria.length>0){
      this.flagFolio = true
    }else{
      this.flagFolio = false
    }
    
  }

  manageOptionsCategorias(){
    this.actualizarFiltros()
    if(this.selectedMacrocategoria.length==0 && this.selectedCategoria.length > 0){
      this.flagMacrocategoria = true
      this.flagFolio = true

    } else {
      this.flagMacrocategoria = false
      this.manageOptionsMacrocategorias()
    }
  }

  manageOptionsSubcategorias(){
    this.actualizarFiltros()
    if( this.selectedSubCategoria.length > 0){
      if(this.selectedMacrocategoria.length==0) this.flagMacrocategoria = true
      if(this.selectedCategoria.length==0) this.flagCategoria = true
      this.flagFolio = true

    }else{
      this.flagCategoria = false
      this.manageOptionsCategorias()
    }
    
  }

  manageOptionsClases(){
    this.actualizarFiltros()
    if( this.selectedClase.length > 0){
      if(this.selectedMacrocategoria.length==0) this.flagMacrocategoria = true
      if(this.selectedCategoria.length==0) this.flagCategoria = true
      if(this.selectedSubCategoria.length==0) this.flagSubcategoria = true
      this.flagFolio = true

    }else{
      this.flagSubcategoria = false
      this.manageOptionsSubcategorias()
    }
    
  }

  manageOptionsFamilias(){
    this.actualizarFiltros()
    if( this.selectedFamilia.length > 0){
      if(this.selectedMacrocategoria.length==0) this.flagMacrocategoria = true
      if(this.selectedCategoria.length==0) this.flagCategoria = true
      if(this.selectedSubCategoria.length==0) this.flagSubcategoria = true
      if(this.selectedClase.length==0) this.flagClase = true
      this.flagFolio = true

    }else{
      this.flagClase = false
      this.manageOptionsClases()
    }
  }

  manageOptionsProveedores(){
    this.actualizarFiltros()
    if( this.selectedProveedor.length > 0){
      if(this.selectedMacrocategoria.length==0) this.flagMacrocategoria = true
      if(this.selectedCategoria.length==0) this.flagCategoria = true
      if(this.selectedSubCategoria.length==0) this.flagSubcategoria = true
      if(this.selectedClase.length==0) this.flagClase = true
      if(this.selectedFamilia.length==0) this.flagFamilia = true
      this.flagFolio = true

    }else{
      this.flagFamilia = false
      this.manageOptionsFamilias()
    }
  }

  manageOptionsFolio(){
    this.actualizarFiltros()
    if(this.selectedFolio.length > 0 ){
      this.flagMacrocategoria = true
      this.flagCategoria = true
      this.flagSubcategoria = true
      this.flagClase = true
      this.flagFamilia = true
      this.flagProveedor =  true
    } else {
      this.flagMacrocategoria = false
      this.flagCategoria = false
      this.flagSubcategoria = false
      this.flagClase = false
      this.flagFamilia = false
      this.flagProveedor =  false
    }
  }

  manageOptionsCodigo(){
    
    if(this.selectedCodigo.length > 0 ){
      this.flagMacrocategoria = true
      this.flagCategoria = true
      this.flagSubcategoria = true
      this.flagClase = true
      this.flagFamilia = true
      this.flagProveedor =  true
      this.flagFolio = true
      this.cantFiltrados = this.selectedCodigo.length
    } else {
      this.flagMacrocategoria = false
      this.flagCategoria = false
      this.flagSubcategoria = false
      this.flagClase = false
      this.flagFamilia = false
      this.flagProveedor =  false
      this.flagFolio = false
      this.actualizarFiltros()
    }
  }


  reinicarFiltros(){
    this.selectedMacrocategoria = []
    this.selectedCategoria = []
    this.selectedSubCategoria = []
    this.selectedClase = []
    this.selectedFamilia = []
    this.selectedProveedor = []
    this.selectedFolio = []
    this.selectedCodigo = []
    this.actualizarFiltros()
    this.manageOptionsProveedores()
    this.fechaFiltro =  new Date()
  }
}
