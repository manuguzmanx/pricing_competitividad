import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ButtonModule} from 'primeng/button';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ConfiguracionClusterCompetitividadComponent } from './modules/configuracion-cluster-competitividad/configuracion-cluster-competitividad.component';
import { ReglasNegocioCompetitividadComponentComponent } from './modules/reglas-negocio-competitividad/reglas-negocio-competitividad.component';
import { GestionPreciosCompetitividadComponent } from './modules/gestion-precios-competitividad/gestion-precios-competitividad.component';
import { PermisosUsuariosCompetitividadComponent } from './modules/permisos-usuarios-competitividad/permisos-usuarios-competitividad.component';
import { SeguimientoPreciosCompetitividadComponent } from './modules/seguimiento-precios-competitividad/seguimiento-precios-competitividad.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {CheckboxModule} from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { FiltrosGestionPreciosCompetitividadComponent } from './modules/filtros-gestion-precios-competitividad/filtros-gestion-precios-competitividad.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PaginatorModule } from 'primeng/paginator';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { FlujoPreciosComponent } from './modules/flujo-precios/flujo-precios.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SplitterModule } from 'primeng/splitter';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { SliderModule } from 'primeng/slider';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { RoundPipe } from './pipes/round.pipe';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { PrimeNGConfig } from 'primeng/api';
import { DashboardSeguimientoComponent } from './modules/dashboard-seguimiento/dashboard-seguimiento.component';
import { SeguimientoCompetitividadComponent } from './modules/seguimiento-competitividad/seguimiento-competitividad.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HomeComponent } from './modules/home/home.component';
import { MenuComponent } from './modules/menu/menu.component';
import { RippleModule } from 'primeng/ripple';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ConstruccionComponent } from './modules/construccion/construccion.component';
import { LoginComponent } from './modules/login/login.component';
import { PasswordModule } from 'primeng/password';
import { AltaUsuariosComponent } from './modules/alta-usuarios/alta-usuarios.component';
import { PickListModule } from 'primeng/picklist';
import { FieldsetModule } from 'primeng/fieldset';
import { SeguimientoFoliosComponent } from './modules/seguimiento-folios/seguimiento-folios.component';
import { ConsultaUsuariosComponent } from './modules/consulta-usuarios/consulta-usuarios.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionClusterCompetitividadComponent,
    ReglasNegocioCompetitividadComponentComponent,
    GestionPreciosCompetitividadComponent,
    PermisosUsuariosCompetitividadComponent,
    SeguimientoPreciosCompetitividadComponent,
    FiltrosGestionPreciosCompetitividadComponent,
    FlujoPreciosComponent,
    SeguimientoFoliosComponent,
    SeguimientoPreciosCompetitividadComponent,
    DashboardSeguimientoComponent,
    RoundPipe,
    SeguimientoCompetitividadComponent,
    HomeComponent,
    MenuComponent,
    NavbarComponent,
    ConstruccionComponent,
    LoginComponent,
    AltaUsuariosComponent,
    ConsultaUsuariosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CheckboxModule,
    InputNumberModule,
    ToggleButtonModule,
    PaginatorModule,
    OverlayPanelModule,
    StepsModule,
    TableModule,
    InputSwitchModule,
    InputTextModule,
    FormsModule,
    ChartModule,
    AccordionModule,
    RadioButtonModule,
    CheckboxModule,
    MessageModule,
    DropdownModule,
    CalendarModule,
    SplitterModule,
    MessagesModule,
    PanelModule,
    CardModule,
    SliderModule,
    TabViewModule,
    SliderModule,
    DialogModule,
    DividerModule,
    TooltipModule,
    BadgeModule,
    TagModule,
    ConfirmDialogModule,
    RippleModule,
    SidebarModule,
    MenuModule,
    PasswordModule,
    ButtonModule,
    PickListModule,
    FieldsetModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap:[AppComponent]
})
export class AppModule { }
