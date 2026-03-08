import { supabase } from "../../../core/api/supabase";
import type { Category } from "../../../types";

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;

    return data ?? [];
  },
};