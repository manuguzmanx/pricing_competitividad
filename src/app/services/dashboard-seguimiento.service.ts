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

  getSkus(): Observable<any> {
    return this.http.get<any>(`${this.URL}/skus`)

  }

  getMacrocategoria(Macrocategoria:string): Observable<any> {
    const params = new HttpParams()
            .set('nombre', Macrocategoria)

    return this.http.get<any>(`${this.URL}/Macrocategorias`, {params})

  }

  getCategoria(Macrocategoria:string, Categoria:string): Observable<any> {
    const params = new HttpParams()
            .set('Macrocategoria', Macrocategoria)
            .set('nombre', Categoria)

    return this.http.get<any>(`${this.URL}/Categorias`, {params})

  }

  getSubCategoria(Macrocategoria:string, Categoria:string, Subcategoria:string): Observable<any> {
    const params = new HttpParams()
            .set('Macrocategoria', Macrocategoria)
            .set('Categoria', Categoria)
            .set('nombre', Subcategoria)

    return this.http.get<any>(`${this.URL}/SubCategorias`, {params})

  }

  getClases(Macrocategoria:string, Categoria:string, Subcategoria:string, Clase:string): Observable<any> {
    const params = new HttpParams()
            .set('Macrocategoria', Macrocategoria)
            .set('Categoria', Categoria)
            .set('Subcategoria', Subcategoria)
            .set('nombre', Clase)

    return this.http.get<any>(`${this.URL}/Clases`, {params})

  }

  getFamilia(Macrocategoria:string, Categoria:string, Subcategoria:string, Clase:string, Familia:string): Observable<any> {
    const params = new HttpParams()
            .set('Macrocategoria', Macrocategoria)
            .set('Categoria', Categoria)
            .set('Subcategoria', Subcategoria)
            .set('Clase', Clase)
            .set('nombre', Familia)

    return this.http.get<any>(`${this.URL}/Familias`, {params})

  }


  getProveedor(Macrocategoria:string, Categoria:string, Subcategoria:string, Clase:string, Familia:string, Proveedor:string): Observable<any> {
    const params = new HttpParams()
            .set('Macrocategoria', Macrocategoria)
            .set('Categoria', Categoria)
            .set('Subcategoria', Subcategoria)
            .set('Clase', Clase)
            .set('Familia', Familia)
            .set('nombre', Proveedor)

    return this.http.get<any>(`${this.URL}/Proveedores`, {params})

  }
}
