export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
}

export interface UpdateProductRequest {
  name?: string;
  price?: number;
  category?: string;
  stock?: number;
  description?: string;
}

export interface ProductListResponse {
  success: boolean;
  data: {
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}

export interface ProductResponse {
  success: boolean;
  data?: Product;
  message: string;
}