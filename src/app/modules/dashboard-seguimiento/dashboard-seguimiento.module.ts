import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { DashboardSeguimientoRoutingModule } from './dashboard-seguimiento-routing.module';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


@NgModule({
  bootstrap: [AppComponent],

  imports: [
    CommonModule,
    DashboardSeguimientoRoutingModule,
    MessagesModule
  ],
  exports: [
    MessageModule
  ]
})
export class FlujoPreciosModule { }
