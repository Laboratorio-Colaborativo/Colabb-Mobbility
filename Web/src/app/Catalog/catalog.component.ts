import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap, shareReplay } from 'rxjs/operators';
import { Product, CatalogResponse, CatalogMetadata, } from './catalog.models';
import { CatalogService } from './catalog.service';
import { UiStateService } from '../shared/services/ui-state.service';
import { DoodleButtonComponent } from '../shared/components/doodle-button/doodle-button.component';
import { IconComponent } from '../shared/components/icons/icon.component';
import { MarkerBadgeComponent } from '../shared/components/marker-badge/marker-badge.component';
import { ProductDetailModalComponent } from './product-detail-modal.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductDetailModalComponent,
    DoodleButtonComponent,
    IconComponent,
    MarkerBadgeComponent
  ],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit, OnDestroy {
  public uiState = inject(UiStateService);

  // Streams for filters
  private page$ = new BehaviorSubject<number>(1);
  searchControl = new FormControl('');
  categoryControl = new FormControl(''); // For category filter

  // Observable for the API response
  catalogResponse$!: Observable<CatalogResponse>;

  // Observables for derived data
  products$!: Observable<Product[]>;
  metadata$!: Observable<CatalogMetadata | null>;

  selectedProduct: Product | null = null;

  // Expose Math to the template
  protected readonly Math = Math;

  private filtersSubscription?: Subscription;

  categories = [
    { id: '', name: 'Global' },
    { id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', name: 'Lubricantes y Químicos' },
    { id: 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', name: 'Sistema de Frenos' },
    { id: 'c3d4e5f6-a7b8-9012-3456-7890abcdef01', name: 'Kits de Mantenimiento' },
    { id: 'd4e5f6a7-b8c9-0123-4567-890abcdef012', name: 'Filtros' }
  ];

  private catalogService = inject(CatalogService);

  ngOnInit(): void {
    const search$ = this.searchControl.valueChanges.pipe(
      startWith(''), // Carga los productos al inicio
      debounceTime(300), // Espera 300ms antes de buscar
      distinctUntilChanged()
    );

    const category$ = this.categoryControl.valueChanges.pipe(startWith(''));

    // Cuando un filtro cambia, volvemos a la página 1
    this.filtersSubscription = combineLatest([search$, category$]).subscribe(() => this.page$.next(1));

    this.catalogResponse$ = combineLatest([this.page$, search$, category$]).pipe(
      switchMap(([page, searchTerm, categoryId]) =>
        this.catalogService.getProducts(page, searchTerm, categoryId)
      ),
      shareReplay(1) // Evita múltiples llamadas a la API con los mismos filtros
    );

    this.products$ = this.catalogResponse$.pipe(map(response => response.data));
    this.metadata$ = this.catalogResponse$.pipe(map(response => response.metadata));
  }

  ngOnDestroy(): void {
    this.filtersSubscription?.unsubscribe();
  }

  openProductDetails(product: Product): void {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
  }
  closeProductDetails(): void {
    this.selectedProduct = null;
    document.body.style.overflow = 'auto'; // Restaura el scroll
  }

  changePage(newPage: number): void {
    if (newPage > 0) {
      this.page$.next(newPage);
      window.scrollTo(0, 0); // Sube al inicio de la página
    }
  }
}