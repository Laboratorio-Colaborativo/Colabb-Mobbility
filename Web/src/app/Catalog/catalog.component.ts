import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="catalog-container">
      <header>
        <h2>Catálogo de Productos</h2>
        <button routerLink="/" class="btn-back">Volver</button>
      </header>
      
      <div class="grid">
        <!-- Placeholder para productos -->
        <div class="card" *ngFor="let item of [1,2,3]">
          <div class="img-placeholder">Imagen</div>
          <h3>Producto {{item}}</h3>
          <p>Descripción breve del vehículo eléctrico.</p>
          <button>Ver Detalles</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .catalog-container { padding: 2rem; }
    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
    .card { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    .img-placeholder { height: 150px; background: #eee; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
    .btn-back { padding: 8px 16px; background: transparent; border: 1px solid #333; cursor: pointer; }
  `]
})
export class CatalogComponent {}