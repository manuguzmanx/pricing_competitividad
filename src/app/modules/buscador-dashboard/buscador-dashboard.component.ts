import { DashboardSeguimientoService } from './../../services/dashboard-seguimiento.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-buscador-dashboard',
  templateUrl: './buscador-dashboard.component.html',
  styleUrls: ['./buscador-dashboard.component.scss']
})
export class BuscadorDashboardComponent implements OnInit{
  macrocategoria:any[] = []
  selectedMacrocategoria:any[] = []
  flagMacrocategoria:boolean = false

  categoria:any[] = []
  selectedCategoria:any[] = []
  flagCategoria:boolean = false

  subcategoria:any[] = []
  selectedSubCategoria:any[] = []
  flagSubcategoria:boolean = false

  clase:any[] = []
  selectedClase:any[] = []
  flagClase:boolean = false

  familia:any[] = []
  selectedFamilia:any[] = []
  flagFamilia:boolean = false

  proveedor:any[] = []
  selectedProveedor:any[] = []
  flagProveedor:boolean = false

  fechaFiltro:any = Date.now()

  folio:any[] = []
  selectedFolio:any[] = []
  flagFolio:boolean = false

  codigo:any[] = []
  selectedCodigo:any[] = []
  flagCodigo:boolean = false

  listaSkus:any[] = []

  constructor( private seguimientoService: DashboardSeguimientoService){}

  ngOnInit(): void {
    this.inicializarFiltros()
  }

  selectedfecha(){

  }



  inicializarFiltros() {
    forkJoin({
      macrocategoria: this.seguimientoService.getMacrocategoria(''),
      categoria: this.seguimientoService.getCategoria('', ''),
      subcategoria: this.seguimientoService.getSubCategoria('', '', ''),
      clase: this.seguimientoService.getClases('', '', '', ''),
      familia: this.seguimientoService.getFamilia('', '', '', '', ''),
      proveedor: this.seguimientoService.getProveedor('', '', '', '', '', ''),
      codigo: this.seguimientoService.getSkus()
    }).subscribe(
      ({ macrocategoria, categoria, subcategoria, clase, familia, proveedor, codigo }) => {
        this.macrocategoria = macrocategoria;
        this.categoria = categoria;
        this.subcategoria = subcategoria;
        this.clase = clase;
        this.familia = familia;
        this.proveedor = proveedor;
        this.codigo = codigo;
      },
      (error) => {
        console.error('Error al cargar los filtros', error);
        // Aquí podrías mostrar una notificación al usuario o manejar el error de otra manera
      }
    );
  }






  verSeleccionados(){
    console.log(this.selectedMacrocategoria)
  }


  manageOptionsMacrocategorias(){
    if(this.selectedMacrocategoria.length>0){
      this.flagFolio = true
    }else{
      this.flagFolio = false
    }
    
  }

  manageOptionsCategorias(){
    if(this.selectedMacrocategoria.length==0 && this.selectedCategoria.length > 0){
      this.flagMacrocategoria = true
      this.flagFolio = true

    } else {
      this.flagMacrocategoria = false
      this.manageOptionsMacrocategorias()
    }
  }

  manageOptionsSubcategorias(){
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
    } else {
      this.flagMacrocategoria = false
      this.flagCategoria = false
      this.flagSubcategoria = false
      this.flagClase = false
      this.flagFamilia = false
      this.flagProveedor =  false
      this.flagFolio = false
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
    this.inicializarFiltros()
    this.manageOptionsProveedores()
  }
}
