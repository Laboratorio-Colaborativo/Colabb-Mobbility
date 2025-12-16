import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <h1>Colabb Mobility</h1>
      <p>Movilidad urbana inteligente y sostenible.</p>
      <div class="actions">
        <button routerLink="/login" class="btn primary">Iniciar Sesión</button>
        <button routerLink="/catalog" class="btn secondary">Ver Catálogo</button>
      </div>
    </div>
  `,
  styles: [`
    .home-container { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; }
    h1 { font-size: 3.5rem; color: #0175C2; margin-bottom: 0.5rem; }
    .actions { gap: 1rem; display: flex; margin-top: 2rem; }
    .btn { padding: 12px 24px; font-size: 1rem; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; }
    .primary { background: #0175C2; color: white; }
    .secondary { background: #e0e0e0; color: #333; }
  `]
})
export class HomeComponent {}