import { supabase } from "../../../core/api/supabase";
import { Product } from "../../../types";

type ProductFilters = {
  category?: string;
  search?: string;
  sort?: string;
};

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string | null;
  brand: string | null;
  main_image: string | null;
  stock: number | null;
  is_featured: boolean | null;
  specs: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  categories?:
    | {
        name: string;
        slug: string;
      }
    | {
        name: string;
        slug: string;
      }[]
    | null;
  product_images?:
    | {
        image_url: string;
        position: number;
      }[]
    | null;
};

function normalizeCategory(categories: ProductRow["categories"]): {
  name?: string;
  slug?: string;
} {
  if (!categories) return {};
  if (Array.isArray(categories)) {
    return categories[0] ?? {};
  }
  return categories;
}

function mapProduct(row: ProductRow): Product {
  const category = normalizeCategory(row.categories);

  const extraImages =
    row.product_images
      ?.slice()
      .sort((a, b) => a.position - b.position)
      .map((img) => img.image_url) ?? [];

  const images = row.main_image
    ? [row.main_image, ...extraImages.filter((img) => img !== row.main_image)]
    : extraImages;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    price: Number(row.price),
    category_id: row.category_id ?? "",
    category_name: category.name ?? "",
    category_slug: category.slug ?? "",
    brand: row.brand ?? "",
    main_image: row.main_image ?? "",
    images,
    stock: row.stock ?? 0,
    is_featured: row.is_featured ?? false,
    specs: row.specs ?? {},
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export const productService = {
  async getProducts(filters: ProductFilters): Promise<Product[]> {
    const { data, error } = await supabase.from("products").select("*");

    console.log("SUPABASE RAW DATA:", data);
    console.log("SUPABASE ERROR:", error);

    if (error) throw error;

    return (data ?? []).map((row: any) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description ?? "",
      price: Number(row.price),
      category_id: row.category_id ?? "",
      category_name: "",
      category_slug: "",
      brand: row.brand ?? "",
      main_image: row.main_image ?? "",
      images: row.main_image ? [row.main_image] : [],
      stock: row.stock ?? 0,
      is_featured: row.is_featured ?? false,
      specs: row.specs ?? {},
      rating: row.rating ?? 0,
      reviews_count: row.reviews_count ?? 0,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
  },

  async getProductById(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        categories (
          name,
          slug
        ),
        product_images (
          image_url,
          position
        )
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    return mapProduct(data);
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        categories (
          name,
          slug
        ),
        product_images (
          image_url,
          position
        )
      `,
      )
      .eq("is_featured", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data ?? []).map(mapProduct);
  },

  async createProduct(
    product: Omit<Product, "id" | "created_at" | "updated_at">,
  ): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        category_id: product.category_id,
        brand: product.brand,
        main_image: product.main_image,
        stock: product.stock,
        is_featured: product.is_featured,
        specs: product.specs,
      })
      .select(
        `
        *,
        categories (
          name,
          slug
        ),
        product_images (
          image_url,
          position
        )
      `,
      )
      .single();

    if (error) throw error;

    return mapProduct(data);
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.slug !== undefined) payload.slug = updates.slug;
    if (updates.description !== undefined)
      payload.description = updates.description;
    if (updates.price !== undefined) payload.price = updates.price;
    if (updates.category_id !== undefined)
      payload.category_id = updates.category_id;
    if (updates.brand !== undefined) payload.brand = updates.brand;
    if (updates.main_image !== undefined)
      payload.main_image = updates.main_image;
    if (updates.stock !== undefined) payload.stock = updates.stock;
    if (updates.is_featured !== undefined)
      payload.is_featured = updates.is_featured;
    if (updates.specs !== undefined) payload.specs = updates.specs;

    const { error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id);

    if (error) throw error;

    return this.getProductById(id);
  },

  async deleteProduct(id: string): Promise<boolean> {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw error;

    return true;
  },
};
