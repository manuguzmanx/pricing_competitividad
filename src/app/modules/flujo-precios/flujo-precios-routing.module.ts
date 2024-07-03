import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlujoPreciosComponent } from './flujo-precios.component';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlujoPreciosRoutingModule { }
