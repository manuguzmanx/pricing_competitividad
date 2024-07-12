import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private _showMenu = new BehaviorSubject<boolean>(false);
  showMenu$: Observable<boolean>;

  constructor() {
    this.showMenu$ = this._showMenu.asObservable();
  }

  showMenu(): void {
    this._showMenu.next(true);
  }

}
