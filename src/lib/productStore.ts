import { Product } from '@/types/product';

class ProductStore {
  private products: Map<number, Product> = new Map();
  private idCounter = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    const initialProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'iPhone 15',
        price: 5999,
        category: '手机',
        stock: 100,
        description: '苹果最新款智能手机'
      },
      {
        name: 'MacBook Pro',
        price: 12999,
        category: '电脑',
        stock: 50,
        description: '高性能笔记本电脑'
      },
      {
        name: 'iPad Air',
        price: 4399,
        category: '平板',
        stock: 75,
        description: '轻薄平板电脑'
      },
      {
        name: 'AirPods Pro',
        price: 1899,
        category: '耳机',
        stock: 200,
        description: '无线降噪耳机'
      },
      {
        name: 'Apple Watch',
        price: 2999,
        category: '手表',
        stock: 120,
        description: '智能运动手表'
      }
    ];

    initialProducts.forEach(product => {
      this.create(product);
    });
  }

  getAll(options: {
    category?: string;
    page?: number;
    limit?: number;
    search?: string;
  } = {}): {
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } {
    const { category, page = 1, limit = 10, search } = options;
    let filteredProducts = Array.from(this.products.values());

    // 按类别筛选
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // 按名称搜索
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // 按创建时间倒序排列
    filteredProducts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // 分页
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      limit,
      totalPages: Math.ceil(filteredProducts.length / limit)
    };
  }

  getById(id: number): Product | undefined {
    return this.products.get(id);
  }

  create(data: { name: string; price: number; category: string; stock: number; description?: string }): Product {
    const id = this.idCounter++;
    const now = new Date();
    const product: Product = {
      id,
      name: data.name,
      price: data.price,
      category: data.category,
      stock: data.stock,
      description: data.description || '',
      createdAt: now,
      updatedAt: now,
    };
    
    this.products.set(id, product);
    return product;
  }

  update(id: number, data: { 
    name?: string; 
    price?: number; 
    category?: string; 
    stock?: number; 
    description?: string; 
  }): Product | null {
    const product = this.products.get(id);
    if (!product) {
      return null;
    }

    const updatedProduct: Product = {
      ...product,
      ...data,
      updatedAt: new Date(),
    };

    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  delete(id: number): boolean {
    return this.products.delete(id);
  }

  clear(): void {
    this.products.clear();
    this.idCounter = 1;
  }

  getCategories(): string[] {
    const categories = new Set<string>();
    this.products.forEach(product => categories.add(product.category));
    return Array.from(categories);
  }
}

export const productStore = new ProductStore();