import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Catalog/header.component';
import { CommonModule } from '@angular/common';



@Component({
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  selector: 'app-root',
  standalone: true,
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []  
})

export class AppComponent {}