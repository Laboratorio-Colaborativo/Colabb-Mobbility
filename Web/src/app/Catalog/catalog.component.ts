import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap, shareReplay, tap } from 'rxjs/operators';

import { Product, CatalogResponse, CatalogMetadata, Category } from './catalog.models';
import { CatalogService } from './catalog.service';
import { UiStateService } from '../shared/services/ui-state.service';
import { DoodleButtonComponent } from '../shared/components/doodle-button/doodle-button.component';
import { IconComponent } from '../shared/components/icons/icon.component';
import { ProductDetailModalComponent } from './Components/product-detail-modal/product-detail-modal.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductDetailModalComponent,
    DoodleButtonComponent,
    IconComponent
  ],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit, OnDestroy {
  // --- INYECCIONES ---
  public uiState = inject(UiStateService);
  private catalogService = inject(CatalogService);

  // --- CONTROLES DE FILTROS ---
  private page$ = new BehaviorSubject<number>(1);
  searchControl = new FormControl('');
  categoryControl = new FormControl('');
  sortControl = new FormControl('default');
  limitControl = new FormControl(12);

  // --- STREAMS DE PRODUCTOS (Reactividad Pura) ---
  catalogResponse$!: Observable<CatalogResponse>;
  products$!: Observable<Product[]>;
  metadata$!: Observable<CatalogMetadata | null>;
  
  // --- GESTIÓN DEL MENÚ (ÁRBOL DE CATEGORÍAS) ---
  // Ya no usamos Observable aquí, usamos array local para manejar la UI de padres/hijos
  categoriesTree: Category[] = []; 
  activeParent: Category | null = null;

  // --- EXTRAS ---
  selectedProduct: Product | null = null;
  protected readonly Math = Math;
  private filtersSubscription?: Subscription;

  // --- GETTERS PARA UI ---
  get areFiltersActive(): boolean {
    return !!this.searchControl.value ||
           !!this.categoryControl.value ||
           this.sortControl.value !== 'default';
  }

  ngOnInit(): void {
    // 1. CARGA DEL MENÚ (Una sola vez al inicio)
    // Nos suscribimos manualmente para guardar la estructura del árbol en memoria
    this.catalogService.getCategories().subscribe({
      next: (data) => {
        this.categoriesTree = data;
        console.log('Árbol de categorías cargado:', this.categoriesTree);
      },
      error: (err) => console.error('Error cargando categorías:', err)
    });

    // 2. CONFIGURACIÓN DE FILTROS DE PRODUCTOS
    const search$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      tap(searchTerm => {
        // Side effect: si el usuario busca, limpiamos el filtro de categoría.
        if (searchTerm && this.categoryControl.value) {
          this.activeParent = null;
          // Esto dispara el stream de category$, que es lo que queremos.
          this.categoryControl.setValue('');
        }
      })
    );

    const category$ = this.categoryControl.valueChanges.pipe(startWith(''));
    const sort$ = this.sortControl.valueChanges.pipe(startWith(this.sortControl.value || 'default'));
    const limit$ = this.limitControl.valueChanges.pipe(startWith(this.limitControl.value || 12));

    // Reseteamos a página 1 si cambian filtros
    this.filtersSubscription = combineLatest([search$, category$, sort$, limit$]).subscribe(() => this.page$.next(1));

    // 3. LA TUBERÍA MAESTRA (Carga de Productos)
    this.catalogResponse$ = combineLatest([this.page$, search$, category$, sort$, limit$]).pipe(
      switchMap(([page, searchTerm, categoryId, sortBy, limit]) =>
        // @ts-ignore - Asumimos que el servicio se actualizará para aceptar sortBy y limit
        this.catalogService.getProducts(page, searchTerm, categoryId, sortBy, limit)
      ),
      shareReplay(1)
    );

    this.products$ = this.catalogResponse$.pipe(map(response => response.data));
    this.metadata$ = this.catalogResponse$.pipe(map(response => response.metadata));
  }

  ngOnDestroy(): void {
    this.filtersSubscription?.unsubscribe();
  }

  // --- MÉTODOS DE UI PARA EL ÁRBOL (Tus nuevos métodos) ---

  /**
   * Clic en Nivel 1 (Padre)
   */
  selectParentCategory(category: Category | null) {
    // Caso 1: Clic en "Todos los productos". Esto SÍ debe aplicar un filtro para mostrar todo.
    if (!category) {
      this.activeParent = null;
      this.categoryControl.setValue('');
      return;
    }

    // Caso 2: Clic en una categoría padre para expandir/colapsar sus subcategorías.
    // Si se hace clic en la categoría que ya está activa, la colapsamos (la hacemos null).
    // Si se hace clic en una nueva, la establecemos como activa.
    this.activeParent = this.activeParent?.id === category.id ? null : category;
    // IMPORTANTE: No se aplica ningún filtro aquí. La acción es puramente para la UI de expandir/colapsar.
  }

  /**
   * Clic en Nivel 2 (Hijo)
   */
  selectSubCategory(subId: string) {
    // El activeParent se mantiene visible, pero el filtro cambia al ID del hijo
    this.categoryControl.setValue(subId);
  }

  /**
   * Limpia todos los filtros y resetea la vista.
   */
  clearAllFilters(): void {
    // Resetea los controles, lo que automáticamente dispara la tubería de RxJS.
    this.searchControl.setValue('');
    this.categoryControl.setValue('');
    this.sortControl.setValue('default');
    // El estado de la UI también se resetea.
    this.activeParent = null;
  }

  // --- MÉTODOS DE UI PARA PRODUCTOS ---

  openProductDetails(product: Product): void {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden';
  }

  closeProductDetails(): void {
    this.selectedProduct = null;
    document.body.style.overflow = 'auto';
  }

  changePage(newPage: number): void {
    if (newPage > 0) {
      this.page$.next(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}