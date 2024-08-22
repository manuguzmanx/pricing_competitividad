import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  private filtrosURL = 'http://localhost:3000/filtros';

  constructor(private http: HttpClient) { }

  getFiltros(): Observable<any> {
    return this.http.get(this.filtrosURL);
  }

  getPost(id: number): Observable<any> {
    return this.http.get(`${this.filtrosURL}/${id}`);
  }
}
