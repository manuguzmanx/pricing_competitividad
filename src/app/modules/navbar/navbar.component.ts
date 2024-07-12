import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  sidebarVisible=true;

  constructor(
    private  layoutService: LayoutService,
  ) {}
  ngOnInit() {
  }

  showMenu(){
    this.layoutService.showMenu();
  }
}
