import { Component, LOCALE_ID } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { PickListModule } from 'primeng/picklist';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' },PrimeNGConfig,DatePipe],
})
export class AltaUsuariosComponent {


  constructor(
    ) {

  }

  selectedTipodeUsuario: any;
  selectedEstatusdeUsuario: any;


  opcionesTipodeUsuario: any[] | undefined;
  opcionesEstatusdeUsuario: any[] | undefined;




  ngOnInit(): void {
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

    this.selectedTipodeUsuario = this.opcionesTipodeUsuario[0];
    this.selectedEstatusdeUsuario = this.opcionesEstatusdeUsuario[0];

  }
  

  public filtroSeleccionarTipoUsuario() {
    this.selectedTipodeUsuario.value != 0 ? this.selectedTipodeUsuario.value = 1 : this.selectedTipodeUsuario.value = 0;
  }

  public filtroSeleccionarEstatusUsuario() {
    this.selectedEstatusdeUsuario.value != 0 ? this.selectedEstatusdeUsuario.value = 1 : this.selectedEstatusdeUsuario.value = 0;
  }
}

