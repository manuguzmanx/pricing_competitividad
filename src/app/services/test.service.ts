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

  getTestById(id: number): Observable<any> {
    return this.http.get(`${this.URLTest}/${id}`);
  }

  createTest(post: any): Observable<any> {
    return this.http.post(this.URLTest, post);
  }

  updateTest(id: number, post: any): Observable<any> {
    return this.http.put(`${this.URLTest}/${id}`, post);
  }

  deleteTest(id: number): Observable<any> {
    return this.http.delete(`${this.URLTest}/${id}`);
  }

}
