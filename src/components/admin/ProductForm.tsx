import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Product, ProductPayload } from "../../types";
import { useCategories } from "../../features/categories/hooks/useCategories";
import { productService } from "../../features/products/api/productService";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card, CardContent } from "../ui/Card";

type ProductFormProps = {
  initialData?: Product | null;
  onSubmit: (payload: ProductPayload) => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function ProductForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProductFormProps) {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const [form, setForm] = useState<ProductPayload>({
    name: "",
    slug: "",
    description: "",
    price: 0,
    category_id: "",
    brand: "",
    main_image: "",
    stock: 0,
    is_featured: false,
    specs: {},
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!initialData) return;

    setForm({
      name: initialData.name ?? "",
      slug: initialData.slug ?? "",
      description: initialData.description ?? "",
      price: initialData.price ?? 0,
      category_id: initialData.category_id ?? "",
      brand: initialData.brand ?? "",
      main_image: initialData.main_image ?? "",
      stock: initialData.stock ?? 0,
      is_featured: initialData.is_featured ?? false,
      specs: initialData.specs ?? {},
    });
  }, [initialData]);

  const specsText = useMemo(() => {
    if (!form.specs) return "";

    return Object.entries(form.specs)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  }, [form.specs]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
      return;
    }

    if (name === "price" || name === "stock") {
      setForm((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function generateSlug() {
    const slug = form.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setForm((prev) => ({
      ...prev,
      slug,
    }));
  }

  function handleSpecsChange(value: string) {
    const lines = value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const parsed = lines.reduce<Record<string, string>>((acc, line) => {
      const [key, ...rest] = line.split(":");

      if (!key || rest.length === 0) return acc;

      acc[key.trim()] = rest.join(":").trim();
      return acc;
    }, {});

    setForm((prev) => ({
      ...prev,
      specs: parsed,
    }));
  }

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const publicUrl = await productService.uploadProductImage(file);

      setForm((prev) => ({
        ...prev,
        main_image: publicUrl,
      }));
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar imagem.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Informe o nome do produto.");
      return;
    }

    if (!form.slug.trim()) {
      alert("Informe o slug do produto.");
      return;
    }

    if (!form.category_id) {
      alert("Selecione uma categoria.");
      return;
    }

    if (!form.main_image.trim()) {
      alert("Envie ou informe a imagem principal.");
      return;
    }

    await onSubmit({
      ...form,
      description: form.description ?? "",
      brand: form.brand ?? "",
      specs: form.specs ?? {},
    });
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Nome</label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nome do produto"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium">Slug</label>
                <button
                  type="button"
                  onClick={generateSlug}
                  className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  Gerar do nome
                </button>
              </div>
              <Input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="slug-do-produto"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Descrição</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descrição do produto"
              className="min-h-[120px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Preço</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Estoque</label>
              <Input
                type="number"
                min="0"
                name="stock"
                value={form.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Marca</label>
              <Input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Marca"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Categoria</label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                disabled={categoriesLoading}
                className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Upload da imagem</label>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploading && (
              <p className="mt-2 text-sm text-zinc-500">Enviando imagem...</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Imagem principal</label>
            <Input
              name="main_image"
              value={form.main_image}
              onChange={handleChange}
              placeholder="URL da imagem"
            />

            {form.main_image && (
              <div className="mt-3 h-24 w-24 overflow-hidden rounded border border-zinc-200 dark:border-zinc-800">
                <img
                  src={form.main_image}
                  alt={form.name || "Produto"}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Specs (uma por linha: chave: valor)
            </label>
            <textarea
              value={specsText}
              onChange={(e) => handleSpecsChange(e.target.value)}
              placeholder={`material: couro\ncor: preto`}
              className="min-h-[120px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="is_featured"
              type="checkbox"
              name="is_featured"
              checked={form.is_featured}
              onChange={handleChange}
            />
            <label htmlFor="is_featured" className="text-sm font-medium">
              Produto em destaque
            </label>
          </div>

          <div className="flex gap-3">
            <Button type="submit" isLoading={isLoading || uploading}>
              {initialData ? "Salvar alterações" : "Criar produto"}
            </Button>

            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}