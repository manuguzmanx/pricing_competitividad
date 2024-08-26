import { Macrocategoria } from './../model/macrocategoria';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardSeguimientoService {

  private URL = 'http://localhost:3000';

  public gifList:any[] = []

  constructor(private http: HttpClient) { }

  buscar(params: any) {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/skus`, { params: httpParams });
  }

  getSkus(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/skus`, { params: httpParams });

  }

  getFolios(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/Folios`, { params: httpParams });

  }

  getMacrocategoria(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/Macrocategorias`, { params: httpParams });

  }

  getCategoria(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/Categorias`, { params: httpParams });

  }

  getSubCategoria(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/SubCategorias`, { params: httpParams });

  }

  getClases(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/Clases`, { params: httpParams });

  }

  getFamilia(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/Familias`, { params: httpParams });

  }


  getProveedor(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/Proveedores`, { params: httpParams });

  }


  getRankings(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/ranking`, { params: httpParams });

  }


  getSkusCoppel(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/codigosDetalle`, { params: httpParams });

  }


  getDist(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/dist`, { params: httpParams });

  }
  getEvaluaciones(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get(`${this.URL}/datosGenerales`, { params: httpParams });

  }
}
