import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./Home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./Auth/Login/login.component').then(m => m.LoginComponent) },
  { path: 'catalog', loadComponent: () => import('./Catalog/catalog.component').then(m => m.CatalogComponent) },
  { path: '**', redirectTo: '' }
];