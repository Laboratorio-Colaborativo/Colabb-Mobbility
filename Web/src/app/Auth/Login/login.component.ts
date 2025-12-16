import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Core/Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <h2>Bienvenido</h2>
        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="usuario@colabb.com">
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input type="password" placeholder="********">
        </div>
        <button (click)="login()">Ingresar</button>
        <p><a routerLink="/">Volver al inicio</a></p>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper { display: flex; justify-content: center; align-items: center; height: 100vh; }
    .login-card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 320px; text-align: center; }
    input { width: 90%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; }
    button { width: 100%; padding: 10px; background: #0175C2; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px; }
    a { color: #666; font-size: 0.9rem; text-decoration: none; display: block; margin-top: 15px; }
  `]
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  login() { console.log('Login click'); }
}