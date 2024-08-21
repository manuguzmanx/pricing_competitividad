import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private URLTest = 'http://localhost:3000/test';

  constructor(private http: HttpClient) { }

  getTest(): Observable<any> {
    return this.http.get(this.URLTest);
  }

}
