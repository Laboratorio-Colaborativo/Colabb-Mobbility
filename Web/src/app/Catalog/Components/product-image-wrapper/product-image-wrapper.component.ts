import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-image-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-image-wrapper.component.html',
  styleUrl: './product-image-wrapper.component.css'
})
export class ProductImageWrapperComponent {
// La ruta de la imagen del producto
  @Input() src: string = '';
  
  // Texto alternativo (importante para accesibilidad)
  @Input() alt: string = 'Producto Colabb';
  
  // El tipo define el color: por defecto 'talleres' (amarillo)
  @Input() type: 'talleres' | 'moteros' = 'talleres';
}
