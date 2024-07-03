import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoriafilter } from 'src/app/model/categoriafilter';
import { Clasefilter } from 'src/app/model/clasefilter';
import { Familiafilter } from 'src/app/model/familiafilter';
import { Macrocategoria } from 'src/app/model/macrocategoria';
import { Proveedorfilter } from 'src/app/model/proveedorfilter';
import { Subcategoriafilter } from 'src/app/model/subcategoriafilter';

interface Item {
  id: number;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-filtros-gestion-precios-competitividad',
  templateUrl: './filtros-gestion-precios-competitividad.component.html',
  styleUrls: ['./filtros-gestion-precios-competitividad.component.scss']
})



export class FiltrosGestionPreciosCompetitividadComponent implements OnInit{

  arregloMacrocategoria: Macrocategoria[];
  selectedArregloMacrocategoria: Macrocategoria[];
  filteredArregloMacrocategoria: Macrocategoria[];

  arregloCategoriafilter: Categoriafilter[];
  selectedArregloCategoriafilter: Categoriafilter[];
  filteredArregloCategoriafilter: Categoriafilter[];

  arregloSubcategoriafilter: Subcategoriafilter[];
  selectedArregloSubcategoriafilter: Subcategoriafilter[];
  filteredArregloSubcategoriafilter: Subcategoriafilter[];

  arregloClasefilter: Clasefilter[];
  selectedArregloClasefilter: Clasefilter[];
  filteredArregloClasefilter: Clasefilter[];

  arregloFamiliafilter: Familiafilter[];
  selectedArregloFamiliafilter: Familiafilter[];
  filteredArregloFamiliafilter: Familiafilter[];

  arregloProveedorfilter: Proveedorfilter[];
  selectedArregloProveedorfilter: Proveedorfilter[];
  filteredArregloProveedorfilter: Proveedorfilter[];



  loading: boolean = true;
  fechaFiltro:string=''

  /* siguiente */
  items: Item[] = [];
  filteredItems: Item[] = [];
  allSelected: boolean = false;
  searchQueryMacrocategoria: string = '';
  searchQueryCategoria: string = '';
  searchQuerySubcategoria: string = '';
  searchQueryClase: string = '';
  searchQueryFamilia: string = '';
  searchQueryProveedor: string = '';

  constructor(private router: Router){
    this.arregloMacrocategoria = new Array<Macrocategoria>;
    this.selectedArregloMacrocategoria = new Array<Macrocategoria>;
    this.filteredArregloMacrocategoria = new Array<Macrocategoria>;

    this.arregloCategoriafilter = new Array<Categoriafilter>;
    this.selectedArregloCategoriafilter = new Array<Categoriafilter>;
    this.filteredArregloCategoriafilter = new Array<Categoriafilter>;

    this.arregloSubcategoriafilter = new Array<Subcategoriafilter>;
    this.selectedArregloSubcategoriafilter = new Array<Subcategoriafilter>;
    this.filteredArregloSubcategoriafilter = new Array<Subcategoriafilter>;

    this.arregloClasefilter = new Array<Clasefilter>;
    this.selectedArregloClasefilter = new Array<Clasefilter>;
    this.filteredArregloClasefilter = new Array<Clasefilter>;

    this.arregloFamiliafilter = new Array<Familiafilter>;
    this.selectedArregloFamiliafilter = new Array<Familiafilter>;
    this.filteredArregloFamiliafilter = new Array<Familiafilter>;

    this.arregloProveedorfilter = new Array<Proveedorfilter>;
    this.selectedArregloProveedorfilter = new Array<Proveedorfilter>;
    this.filteredArregloProveedorfilter = new Array<Proveedorfilter>;
  }

  ngOnInit(): void {
    this.cargandoMacrocategorias();
    this.cargandoCategorias();
    this.cargandoSubcategorias();
    this.cargandoClases();
    this.cargandoFamilias();
    this.cargandoProveedores();
    this.loading = false;

    /* siguiente */
    this.items = [
      { id: 1, name: 'Item 1', selected: false },
      { id: 2, name: 'Item 2', selected: false },
      { id: 3, name: 'Item 3', selected: false },
      // Agrega más elementos según sea necesario
    ];
    this.filteredItems = [...this.items];
  }

  showSelected(){
    console.log("imprime??")
    console.table(this.selectedArregloMacrocategoria)
  }

  public cargandoMacrocategorias() {

    const objetoMacrocategoria1 = new Macrocategoria('001', 'CELULARES');
    const objetoMacrocategoria2 = new Macrocategoria('002', 'ENCERES DOMÉSTICOS');
    const objetoMacrocategoria3 = new Macrocategoria('003', 'HOGAR Y RECAMARA');
    const objetoMacrocategoria4 = new Macrocategoria('004', 'JOYERIA Y RELOJERIA');
    const objetoMacrocategoria5 = new Macrocategoria('005', 'JUGUETES, BEBES Y');
    const objetoMacrocategoria6 = new Macrocategoria('006', 'LÍNEA BLANCA');
    const objetoMacrocategoria7 = new Macrocategoria('007', 'ÓPTICA');
    const objetoMacrocategoria8 = new Macrocategoria('008', 'TECNOLOGÍA');
    const objetoMacrocategoria9 = new Macrocategoria('009', 'TRANSPORTE');

    this.arregloMacrocategoria.push(objetoMacrocategoria1);
    this.arregloMacrocategoria.push(objetoMacrocategoria2);
    this.arregloMacrocategoria.push(objetoMacrocategoria3);
    this.arregloMacrocategoria.push(objetoMacrocategoria4);
    this.arregloMacrocategoria.push(objetoMacrocategoria5);
    this.arregloMacrocategoria.push(objetoMacrocategoria6);
    this.arregloMacrocategoria.push(objetoMacrocategoria7);
    this.arregloMacrocategoria.push(objetoMacrocategoria8);
    this.arregloMacrocategoria.push(objetoMacrocategoria9);
    this.filteredArregloMacrocategoria=[...this.arregloMacrocategoria];
  }

  public cargandoCategorias() {

    const objetoCategoria1 = new Categoriafilter('001', 'AUDIO Y VIDEO');
    const objetoCategoria2 = new Categoriafilter('002', 'AUTOMOTRIZ');
    const objetoCategoria3 = new Categoriafilter('003', 'BEBES');
    const objetoCategoria4 = new Categoriafilter('004', 'BELLEZA Y CUIDADO');
    const objetoCategoria5 = new Categoriafilter('005', 'BICICLETAS');
    const objetoCategoria6 = new Categoriafilter('006', 'CELULARES');
    const objetoCategoria7 = new Categoriafilter('007', 'COMPUTO, TABLETS');
    const objetoCategoria8 = new Categoriafilter('008', 'DEPORTES');
    const objetoCategoria9 = new Categoriafilter('009', 'ENSERES DOMESTICOS');

    this.arregloCategoriafilter.push(objetoCategoria1);
    this.arregloCategoriafilter.push(objetoCategoria2);
    this.arregloCategoriafilter.push(objetoCategoria3);
    this.arregloCategoriafilter.push(objetoCategoria4);
    this.arregloCategoriafilter.push(objetoCategoria5);
    this.arregloCategoriafilter.push(objetoCategoria6);
    this.arregloCategoriafilter.push(objetoCategoria7);
    this.arregloCategoriafilter.push(objetoCategoria8);
    this.arregloCategoriafilter.push(objetoCategoria9);
    this.filteredArregloCategoriafilter=[...this.arregloCategoriafilter];
  }

  public cargandoSubcategorias() {

    const objetoSubcategoria1 = new Subcategoriafilter('001', 'ACCESORIOS');
    const objetoSubcategoria2 = new Subcategoriafilter('002', 'EJERCICIO');
    const objetoSubcategoria3 = new Subcategoriafilter('003', 'HOGAR');
    const objetoSubcategoria4 = new Subcategoriafilter('004', 'ASEO DE CASA');
    const objetoSubcategoria5 = new Subcategoriafilter('005', 'AUDIO');
    const objetoSubcategoria6 = new Subcategoriafilter('006', 'AUDIO PERSONAL');
    const objetoSubcategoria7 = new Subcategoriafilter('007', 'AUTOMOTRIZ');
    const objetoSubcategoria8 = new Subcategoriafilter('008', 'BEBES');
    const objetoSubcategoria9 = new Subcategoriafilter('009', 'BICICLETAS');

    this.arregloSubcategoriafilter.push(objetoSubcategoria1);
    this.arregloSubcategoriafilter.push(objetoSubcategoria2);
    this.arregloSubcategoriafilter.push(objetoSubcategoria3);
    this.arregloSubcategoriafilter.push(objetoSubcategoria4);
    this.arregloSubcategoriafilter.push(objetoSubcategoria5);
    this.arregloSubcategoriafilter.push(objetoSubcategoria6);
    this.arregloSubcategoriafilter.push(objetoSubcategoria7);
    this.arregloSubcategoriafilter.push(objetoSubcategoria8);
    this.arregloSubcategoriafilter.push(objetoSubcategoria9);
    this.filteredArregloSubcategoriafilter=[...this.arregloSubcategoriafilter];
  }

  public cargandoClases() {

    const objetoClase1 = new Clasefilter('001', 'CELULARES');
    const objetoClase2 = new Clasefilter('002', 'ACCESORIOS TV');
    const objetoClase3 = new Clasefilter('003', 'AIRE ACONDICIONADO');
    const objetoClase4 = new Clasefilter('004', 'ALBERCAS');
    const objetoClase5 = new Clasefilter('005', 'ASADORES');
    const objetoClase6 = new Clasefilter('006', 'ASISTENTE DE VOZ');
    const objetoClase7 = new Clasefilter('007', 'ASPIRADORA INDUSTRIAL');
    const objetoClase8 = new Clasefilter('008', 'ASPIRADORAS');
    const objetoClase9 = new Clasefilter('009', 'AUDIFONOS');

    this.arregloClasefilter.push(objetoClase1);
    this.arregloClasefilter.push(objetoClase2);
    this.arregloClasefilter.push(objetoClase3);
    this.arregloClasefilter.push(objetoClase4);
    this.arregloClasefilter.push(objetoClase5);
    this.arregloClasefilter.push(objetoClase6);
    this.arregloClasefilter.push(objetoClase7);
    this.arregloClasefilter.push(objetoClase8);
    this.arregloClasefilter.push(objetoClase9);
    this.filteredArregloClasefilter=[...this.arregloClasefilter];
  }

  aceptarFiltros(){
    this.router.navigate(['index']);
  }

  public cargandoFamilias() {

    const objetoFamilia1 = new Familiafilter('001', '1.2 A 1.4 PIES');
    const objetoFamilia2 = new Familiafilter('002', '1.5 PIES Y MAYORES');
    const objetoFamilia3 = new Familiafilter('003', '2 QUEMADORES');
    const objetoFamilia4 = new Familiafilter('004', '4 QUEMADORES');
    const objetoFamilia5 = new Familiafilter('005', '5 PIES');
    const objetoFamilia6 = new Familiafilter('006', '5 QUEMADORES');
    const objetoFamilia7 = new Familiafilter('007', '7 PIES');
    const objetoFamilia8 = new Familiafilter('008', '6-10 PIES');
    const objetoFamilia9 = new Familiafilter('009', '9 PIES');

    this.arregloFamiliafilter.push(objetoFamilia1);
    this.arregloFamiliafilter.push(objetoFamilia2);
    this.arregloFamiliafilter.push(objetoFamilia3);
    this.arregloFamiliafilter.push(objetoFamilia4);
    this.arregloFamiliafilter.push(objetoFamilia5);
    this.arregloFamiliafilter.push(objetoFamilia6);
    this.arregloFamiliafilter.push(objetoFamilia7);
    this.arregloFamiliafilter.push(objetoFamilia8);
    this.arregloFamiliafilter.push(objetoFamilia9);
    this.filteredArregloFamiliafilter=[...this.arregloFamiliafilter];
  }

  public cargandoProveedores() {

    const objetoProveedor1 = new Proveedorfilter('001', '2FAST FOR YOU');
    const objetoProveedor2 = new Proveedorfilter('002', 'A OCCHIALI');
    const objetoProveedor3 = new Proveedorfilter('003', 'ACER');
    const objetoProveedor4 = new Proveedorfilter('004', 'ACROS');
    const objetoProveedor5 = new Proveedorfilter('005', 'ACTIVISION');
    const objetoProveedor6 = new Proveedorfilter('006', 'ADIDAS');
    const objetoProveedor7 = new Proveedorfilter('007', 'ADIR');
    const objetoProveedor8 = new Proveedorfilter('008', 'AIWA');
    const objetoProveedor9 = new Proveedorfilter('009', 'ALCATEL');

    this.arregloProveedorfilter.push(objetoProveedor1);
    this.arregloProveedorfilter.push(objetoProveedor2);
    this.arregloProveedorfilter.push(objetoProveedor3);
    this.arregloProveedorfilter.push(objetoProveedor4);
    this.arregloProveedorfilter.push(objetoProveedor5);
    this.arregloProveedorfilter.push(objetoProveedor6);
    this.arregloProveedorfilter.push(objetoProveedor7);
    this.arregloProveedorfilter.push(objetoProveedor8);
    this.arregloProveedorfilter.push(objetoProveedor9);
    this.filteredArregloProveedorfilter=[...this.arregloProveedorfilter];
  }

  filterMacrocategoria(){
    this.filteredArregloMacrocategoria = this.arregloMacrocategoria.filter(item =>
      item.nombre.toLowerCase().includes(this.searchQueryMacrocategoria.toLowerCase())
    );
  }

  filterCategoria(){
    this.filteredArregloCategoriafilter = this.arregloCategoriafilter.filter(item =>
      item.nombre.toLowerCase().includes(this.searchQueryCategoria.toLowerCase())
    );
  }

  filterSubcategoria(){
    this.filteredArregloSubcategoriafilter = this.arregloSubcategoriafilter.filter(item =>
      item.nombre.toLowerCase().includes(this.searchQuerySubcategoria.toLowerCase())
    );
  }

  filterClase(){
    this.filteredArregloClasefilter = this.arregloClasefilter.filter(item =>
      item.nombre.toLowerCase().includes(this.searchQueryClase.toLowerCase())
    );
  }

  filterFamilia(){
    this.filteredArregloFamiliafilter = this.arregloFamiliafilter.filter(item =>
      item.nombre.toLowerCase().includes(this.searchQueryFamilia.toLowerCase())
    );
  }

  filterProveedor(){
    this.filteredArregloProveedorfilter = this.arregloProveedorfilter.filter(item =>
      item.nombre.toLowerCase().includes(this.searchQueryProveedor.toLowerCase())
    );
  }
}
