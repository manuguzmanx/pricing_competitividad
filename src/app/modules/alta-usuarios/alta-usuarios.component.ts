import { Component, LOCALE_ID } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Clase } from 'src/app/model/clase';
import { Router } from '@angular/router';



@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' },PrimeNGConfig,DatePipe],
})
export class AltaUsuariosComponent {

  sourceClass!: Clase[];

  targetClass!: Clase[];

  constructor(private router: Router,
    ) {
  }

  selectedTipodeUsuario: any;
  selectedEstatusdeUsuario: any;

  opcionesTipodeUsuario: any[] | undefined;
  opcionesEstatusdeUsuario: any[] | undefined;

  ngOnInit() {

    this.sourceClass = [
      {
        id_macro: '01',
        nombre_macro: 'Celulares',
      },
      {
        id_macro: '02',
        nombre_macro: 'Enseres domesticos',
      },
      {
        id_macro: '03',
        nombre_macro: 'Celular y recamaras',
      },
      {
        id_macro: '04',
        nombre_macro: 'Joyeria y relojeria',
      },
      {
        id_macro: '05',
        nombre_macro: 'Juguetes, bebes y ap. ejercicio',
      },
    ];

    this.targetClass = [

    ];

    this.opcionesTipodeUsuario = [
      { name: "PLANNER", value: 0 },
      { name: "CATEGORIA", value: 1 },
      { name: "ADMINISTRADOR PLANNER", value: 2 },
      { name: "ADMINISTRADOR CATEGORIA", value: 3 },
      { name: "SUPER USUARIO", value: 4 }
    ];

    this.opcionesEstatusdeUsuario = [
      { name: "ACTIVO", value: 0 },
      { name: "INACTIVO", value: 1 },

    ];

    // this.macrocategorias = [
    //   {
    //     nombre_macro: 'Celulares',
    //   },
    //   {
    //     nombre_macro: 'Enseres domesticos',
    //   },
    //   {
    //     nombre_macro: 'Celular y recamaras',
    //   },
    //   {
    //     nombre_macro: 'Joyeria y relojeria',
    //   },
    //   {
    //     nombre_macro: 'Juguetes, bebes y ap. ejercicio',
    //   },
    // ];

  }
  

  public filtroSeleccionarTipoUsuario() {
    this.selectedTipodeUsuario.value != 0 ? this.selectedTipodeUsuario.value = 1 : this.selectedTipodeUsuario.value = 0;
  }

  public filtroSeleccionarEstatusUsuario() {
    this.selectedEstatusdeUsuario.value != 0 ? this.selectedEstatusdeUsuario.value = 1 : this.selectedEstatusdeUsuario.value = 0;
  }

  regresar(){
    this.router.navigate(['consulta-usuarios']);

  }
}



