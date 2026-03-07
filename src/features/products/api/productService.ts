import { MOCK_PRODUCTS } from '../../../mock/data';
import { Product, Category } from '../../../core/types';
import { sleep } from '../../../utils';

export const productService = {
  async getProducts(filters?: { category?: Category; search?: string; sort?: string }): Promise<Product[]> {
    await sleep(800);
    let products = [...MOCK_PRODUCTS];

    if (filters?.category) {
      products = products.filter((p) => p.category === filters.category);
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(
        (p) => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
      );
    }

    if (filters?.sort) {
      switch (filters.sort) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }

    return products;
  },

  async getProductById(id: string): Promise<Product> {
    await sleep(500);
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    await sleep(500);
    return MOCK_PRODUCTS.filter((p) => p.isFeatured);
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    await sleep(1000);
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    MOCK_PRODUCTS.push(newProduct);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    await sleep(1000);
    const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');
    MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...updates };
    return MOCK_PRODUCTS[index];
  },

  async deleteProduct(id: string): Promise<boolean> {
    await sleep(1000);
    const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');
    MOCK_PRODUCTS.splice(index, 1);
    return true;
  }
};
