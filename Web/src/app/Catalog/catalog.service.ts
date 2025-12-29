import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogResponse } from './catalog.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = `${environment.apiBaseUrl}/catalogo`;

  constructor(private http: HttpClient) { }

  getProducts(
    page: number,
    searchTerm?: string | null,
    categoryId?: string | null
  ): Observable<CatalogResponse> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    if (searchTerm) {
      params = params.append('q', searchTerm);
    }
    if (categoryId) {
      params = params.append('categoria', categoryId);
    }

    return this.http.get<CatalogResponse>(this.apiUrl, { params });
  }
}