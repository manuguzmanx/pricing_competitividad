import { Injectable } from '@angular/core';
import { Competitividad } from '../model/competitividad';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitividadService {

  private competitividadArray: Competitividad[] = [];
  private competitividadSubject = new BehaviorSubject<Competitividad[]>(this.competitividadArray);

  constructor() { }

  getCompetitividad() {
    return this.competitividadSubject.asObservable();
  }

  putCompetitividad(competitividad:Competitividad[]){
    this.competitividadArray = competitividad;
    this.competitividadSubject= new BehaviorSubject<Competitividad[]>(this.competitividadArray);
  }
}
