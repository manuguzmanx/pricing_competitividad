import { Component, LOCALE_ID } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consulta-usuarios',
  templateUrl: './consulta-usuarios.component.html',
  styleUrls: ['./consulta-usuarios.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' },PrimeNGConfig,DatePipe],
})
export class ConsultaUsuariosComponent {

    constructor(private formBuilder: FormBuilder
      ) {
        this.macrocategoriaFormGroup = this.formBuilder.group({
          selectedMacrocategoria: [],
          macrocategoria: this.macrocategoria
        });
        this.categoriaFormGroup = this.formBuilder.group({
          selectedCategoria: [],
          categoria: this.categoria
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
    
  
    public filtroSeleccionarTipoUsuario() {
      this.selectedTipodeUsuario.value != 0 ? this.selectedTipodeUsuario.value = 1 : this.selectedTipodeUsuario.value = 0;
    }
  
    public filtroSeleccionarEstatusUsuario() {
      this.selectedEstatusdeUsuario.value != 0 ? this.selectedEstatusdeUsuario.value = 1 : this.selectedEstatusdeUsuario.value = 0;
    }
  
}
