import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../catalog.models';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.css']
})
export class ProductDetailModalComponent implements OnChanges {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();

  // Propiedades para la galería de imágenes
  selectedImageIndex = 0;
  isGalleryOpen = false;

  /**
   * Hook del ciclo de vida que se llama cuando cambia una propiedad de entrada.
   * Se usa aquí para resetear el índice de la imagen cuando se carga un nuevo producto.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.selectedImageIndex = 0;
      this.isGalleryOpen = false; // Asegurarse que la galería esté cerrada al cambiar de producto
    }
  }

  onClose() {
    this.close.emit();
  }

  // --- Métodos para la Galería ---

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  openGallery(): void {
    // Solo abre la galería si hay un array de imágenes con contenido
    if (this.product?.imagenes && this.product.imagenes.length > 0) {
      this.isGalleryOpen = true;
    }
  }

  closeGallery(): void {
    this.isGalleryOpen = false;
  }

  nextImage(): void {
    if (this.product?.imagenes) {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % this.product.imagenes.length;
    }
  }

  prevImage(): void {
    if (this.product?.imagenes) {
      this.selectedImageIndex = (this.selectedImageIndex - 1 + this.product.imagenes.length) % this.product.imagenes.length;
    }
  }
}