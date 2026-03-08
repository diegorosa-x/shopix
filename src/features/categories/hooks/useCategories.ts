import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../api/categoryService";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getCategories,
  });
};