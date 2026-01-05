export interface Product {
  item_id: string;
  referencia: string;
  nombre: string;
  descripcion: string | null;
  imagen: string;
  imagenes?: string[];
  tipo: string;
  precio_desde: number;
  tiene_stock: boolean;
  categoria_nombre: string;
  compatible_con_mi_moto: boolean;
}

export interface CatalogMetadata {
  total_items: number;
  page: number;
  limit: number;
  filtros_activos: {
    search: string | null;
    categoria: string | null;
    nave_modelo_id: string | null;
  };
}

export interface CatalogResponse {
  metadata: CatalogMetadata;
  data: Product[];
}

export interface Category {
  id: string;             // UUID
  nombre: string;         // "Repuestos", "Frenos"
  descripcion?: string;   // Opcional
  es_titulo: boolean;     // true si es Padre
  parent_id?: string;     // UUID del padre (opcional)
  subcategorias?: Category[]; // RECURSIVIDAD: Una lista de sí misma
}