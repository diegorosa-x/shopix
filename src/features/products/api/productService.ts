import { supabase } from "../../../core/api/supabase";
import type { Product, ProductPayload } from "../../../types";

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
  specs: Record<string, string> | null;
  rating: number | null;
  reviews_count: number | null;
  created_at: string;
  updated_at: string;
  categories?:
    | {
        id?: string;
        name: string;
        slug: string;
      }
    | {
        id?: string;
        name: string;
        slug: string;
      }[]
    | null;
  product_images?:
    | {
        id?: string;
        image_url: string;
        position: number;
      }[]
    | null;
};

function normalizeCategory(categories: ProductRow["categories"]): {
  id?: string;
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
    price: Number(row.price ?? 0),
    category_id: row.category_id ?? "",
    category_name: category.name ?? "",
    category_slug: category.slug ?? "",
    brand: row.brand ?? "",
    main_image: row.main_image ?? "",
    stock: Number(row.stock ?? 0),
    is_featured: row.is_featured ?? false,
    specs: row.specs ?? {},
    rating: Number(row.rating ?? 0),
    reviews_count: Number(row.reviews_count ?? 0),
    created_at: row.created_at,
    updated_at: row.updated_at,
    images,
  };
}

function applyClientFilters(products: Product[], filters: ProductFilters): Product[] {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(
      (product) => product.category_slug === filters.category,
    );
  }

  if (filters.search) {
    const search = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.category_name.toLowerCase().includes(search),
    );
  }

  switch (filters.sort) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "newest":
    default:
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      break;
  }

  return filtered;
}

export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        categories (
          id,
          name,
          slug
        ),
        product_images (
          id,
          image_url,
          position
        )
      `,
      )
      .order("created_at", { ascending: false });

    console.log("SUPABASE RAW DATA:", data);
    console.log("SUPABASE ERROR:", error);

    if (error) throw error;

    const mapped = (data ?? []).map((row) => mapProduct(row as ProductRow));
    return applyClientFilters(mapped, filters);
  },

  async getProductById(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        categories (
          id,
          name,
          slug
        ),
        product_images (
          id,
          image_url,
          position
        )
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    return mapProduct(data as ProductRow);
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        categories (
          id,
          name,
          slug
        ),
        product_images (
          id,
          image_url,
          position
        )
      `,
      )
      .eq("is_featured", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data ?? []).map((row) => mapProduct(row as ProductRow));
  },

  async createProduct(payload: ProductPayload): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: payload.name,
        slug: payload.slug,
        description: payload.description,
        price: payload.price,
        category_id: payload.category_id,
        brand: payload.brand,
        main_image: payload.main_image,
        stock: payload.stock,
        is_featured: payload.is_featured,
        specs: payload.specs,
      })
      .select(
        `
        *,
        categories (
          id,
          name,
          slug
        ),
        product_images (
          id,
          image_url,
          position
        )
      `,
      )
      .single();

    if (error) throw error;

    return mapProduct(data as ProductRow);
  },

  async updateProduct(id: string, payload: Partial<ProductPayload>): Promise<Product> {
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (payload.name !== undefined) updateData.name = payload.name;
    if (payload.slug !== undefined) updateData.slug = payload.slug;
    if (payload.description !== undefined) updateData.description = payload.description;
    if (payload.price !== undefined) updateData.price = payload.price;
    if (payload.category_id !== undefined) updateData.category_id = payload.category_id;
    if (payload.brand !== undefined) updateData.brand = payload.brand;
    if (payload.main_image !== undefined) updateData.main_image = payload.main_image;
    if (payload.stock !== undefined) updateData.stock = payload.stock;
    if (payload.is_featured !== undefined) updateData.is_featured = payload.is_featured;
    if (payload.specs !== undefined) updateData.specs = payload.specs;

    const { error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;

    return this.getProductById(id);
  },

  async deleteProduct(id: string): Promise<boolean> {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  },

  async uploadProductImage(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop() ?? "jpg";
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product_images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("product_images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  },
};