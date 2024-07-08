import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  bootstrap: [AppComponent],

  imports: [
    CommonModule,
    MessagesModule,
    HomeRoutingModule
  ],
  exports: [
    MessageModule
  ]
})
export class HomeModule { }
