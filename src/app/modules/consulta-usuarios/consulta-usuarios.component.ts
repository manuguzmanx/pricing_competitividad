import { Component, LOCALE_ID } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-usuarios',
  templateUrl: './consulta-usuarios.component.html',
  styleUrls: ['./consulta-usuarios.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' },PrimeNGConfig,DatePipe],
})
export class ConsultaUsuariosComponent {

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
        this.familiaFormGroup = this.formBuilder.group({
          selectedFamilia: [],
          familia: this.familia
        });
    }
  
    selectedTipodeUsuario: any;
    selectedEstatusdeUsuario: any;
  
    opcionesTipodeUsuario: any[] | undefined;
    opcionesEstatusdeUsuario: any[] | undefined;
  
    ngOnInit(): void {

    }
  
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

    familiaFormGroup: FormGroup;
    familia = [
      { name: '1.2 a 1.4 Pies', code: '00016' },
      { name: '1.5 Pies a mayores', code: '00017' },
      { name: '2 Quemadores', code: 'C00018' },
      { name: '4 Quemadores', code: '00019' },
      { name: '5 Pies', code: '00020' }
    ];
    
    
  usuarios = [
    {
      tipo_usuario: 'Administrador',
      nombre: 'Martin Marquez Santiago',
      correo_electronico: 'martin.marquez@coppel.com',
      numero_empleado: '1001',
      estatus: 'ACTIVO',
    },
    {
      tipo_usuario: 'Administrador',
      nombre: 'Rodrigo Buzany Gomez',
      correo_electronico: 'rodrigo.buzany@coppel.com',
      numero_empleado: '1002',
      estatus: 'ACTIVO',
    },
    {
      tipo_usuario: 'Administrador',
      nombre: 'Luis Manuel Vargas Guzman',
      correo_electronico: 'luis.vargasy@coppel.com',
      numero_empleado: '1003',
      estatus: 'INACTIVO',
    },
  ];

    public filtroSeleccionarTipoUsuario() {
      this.selectedTipodeUsuario.value != 0 ? this.selectedTipodeUsuario.value = 1 : this.selectedTipodeUsuario.value = 0;
    }
  
    public filtroSeleccionarEstatusUsuario() {
      this.selectedEstatusdeUsuario.value != 0 ? this.selectedEstatusdeUsuario.value = 1 : this.selectedEstatusdeUsuario.value = 0;
    }
  
    public irNuevoUsuario(){
      this.router.navigate(['alta-usuarios']);
    }
}
