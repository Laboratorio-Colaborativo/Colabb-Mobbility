import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// Asegúrate de importar también Category que definimos en el paso anterior
import { CatalogResponse, Category } from './catalog.models'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  // Endpoints base
  private productsUrl = `${environment.apiBaseUrl}/catalogo`;
  private categoriesUrl = `${environment.apiBaseUrl}/categorias`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de productos paginada y filtrada
   */
  getProducts(
    page: number,
    searchTerm?: string | null,
    categoryId?: string | null
  ): Observable<CatalogResponse> {
    let params = new HttpParams().set('page', page.toString()); // set inicializa

    if (searchTerm) {
      params = params.append('q', searchTerm);
    }
    
    // IMPORTANTE: Aquí conectamos el click del filtro con la API
    if (categoryId) {
      params = params.append('categoria', categoryId);
    }

    return this.http.get<CatalogResponse>(this.productsUrl, { params });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }
}