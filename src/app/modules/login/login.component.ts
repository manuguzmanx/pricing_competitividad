import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  appSelected=false;

    
  constructor(
    private readonly layoutService: LayoutService,
    private router: Router
  ) {
    this.layoutService.hideNavbar();
  }

  ngOnInit(){
    this.layoutService.showMenu();
  }
  
  showNavbar(){
    console.log("show navbar");
    this.layoutService.showNavbar();

  }

}
