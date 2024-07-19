import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionClusterCompetitividadComponent } from './modules/configuracion-cluster-competitividad/configuracion-cluster-competitividad.component';
import { ReglasNegocioCompetitividadComponentComponent } from './modules/reglas-negocio-competitividad/reglas-negocio-competitividad.component';
import { GestionPreciosCompetitividadComponent } from './modules/gestion-precios-competitividad/gestion-precios-competitividad.component';
import { PermisosUsuariosCompetitividadComponent } from './modules/permisos-usuarios-competitividad/permisos-usuarios-competitividad.component';
import { SeguimientoPreciosCompetitividadComponent } from './modules/seguimiento-precios-competitividad/seguimiento-precios-competitividad.component';
import { AppComponent } from './app.component';
import { FiltrosGestionPreciosCompetitividadComponent } from './modules/filtros-gestion-precios-competitividad/filtros-gestion-precios-competitividad.component';
import { FlujoPreciosComponent } from './modules/flujo-precios/flujo-precios.component';
import { DashboardSeguimientoComponent } from './modules/dashboard-seguimiento/dashboard-seguimiento.component';
import { SeguimientoCompetitividadComponent } from './modules/seguimiento-competitividad/seguimiento-competitividad.component';
import { HomeComponent } from './modules/home/home.component';
import { ConstruccionComponent } from './modules/construccion/construccion.component';
import { AltaUsuariosComponent } from './modules/alta-usuarios/alta-usuarios.component';
import { SeguimientoFoliosComponent } from './modules/seguimiento-folios/seguimiento-folios.component';

const routes: Routes = [
  {path: 'cambio-precios', component: GestionPreciosCompetitividadComponent},
  {path: 'configuracion-cluster', component: ConfiguracionClusterCompetitividadComponent},
  {path: 'reglas-negocio', component: ReglasNegocioCompetitividadComponentComponent},
  {path: 'permisos-usuarios', component: PermisosUsuariosCompetitividadComponent},
  {path: 'seguimiento-precios', component: SeguimientoPreciosCompetitividadComponent},
  {path: 'filtros-gestion-precios', component: FiltrosGestionPreciosCompetitividadComponent},
  {path: 'flujo-precios', component: FlujoPreciosComponent},
  {path: 'seguimiento-folios', component: SeguimientoFoliosComponent},
  {path: 'dashboard-seguimiento', component: DashboardSeguimientoComponent},
  {path: 'seguimiento-competitividad', component: SeguimientoCompetitividadComponent},
  {path: 'home', component: HomeComponent},
  {path: 'construccion', component: ConstruccionComponent},
  {path: 'alta-usuarios', component: AltaUsuariosComponent},
  {
    path: '**',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
