import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private _showMenu = new BehaviorSubject<boolean>(false);
  private _showNavbar = new BehaviorSubject<boolean>(true);
  showMenu$: Observable<boolean>;
  showNavbar$: Observable<boolean>;
  constructor() {
    this.showMenu$ = this._showMenu.asObservable();
    this.showNavbar$ = this._showNavbar.asObservable();
  }

  showMenu(): void {
    this._showMenu.next(true);
  }


  showNavbar(): void {
    this._showNavbar.next(true);
  }
  hideNavbar(): void {
    this._showNavbar.next(false);
  }

}
