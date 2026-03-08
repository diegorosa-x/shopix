import { useMemo, useState } from "react";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "../../features/products/hooks/useProducts";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { formatPrice } from "../../utils";
import { Plus, Edit2, Trash2, Search, Filter, X } from "lucide-react";
import { Input } from "../../components/ui/Input";
import ProductForm from "../../components/admin/ProductForm";
import type { Product, ProductPayload } from "../../types";

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data: products = [], isLoading } = useProducts({});
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const search = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(search) ||
        p.category_name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search)
      );
    });
  }, [products, searchTerm]);

  async function handleCreateProduct(payload: ProductPayload) {
    try {
      await createMutation.mutateAsync(payload);
      setShowForm(false);
      alert("Produto criado com sucesso.");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar produto.");
    }
  }

  async function handleUpdateProduct(payload: ProductPayload) {
    if (!editingProduct) return;

    try {
      await updateMutation.mutateAsync({
        id: editingProduct.id,
        payload,
      });
      setEditingProduct(null);
      setShowForm(false);
      alert("Produto atualizado com sucesso.");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar produto.");
    }
  }

  async function handleDeleteProduct(id: string) {
    const confirmed = window.confirm("Deseja realmente deletar este produto?");
    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(id);
      alert("Produto deletado com sucesso.");
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar produto.");
    }
  }

  function openCreateForm() {
    setEditingProduct(null);
    setShowForm(true);
  }

  function openEditForm(product: Product) {
    setEditingProduct(product);
    setShowForm(true);
  }

  function closeForm() {
    setEditingProduct(null);
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Produtos</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Gerencie seu catálogo de produtos e estoque.
          </p>
        </div>

        <Button onClick={openCreateForm}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
        </Button>
      </div>

      {showForm && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {editingProduct ? "Editar produto" : "Novo produto"}
            </h3>

            <Button variant="ghost" size="icon" onClick={closeForm}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ProductForm
            initialData={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
            onCancel={closeForm}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="relative w-full md:w-80">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filtrar
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <tr>
                  <th className="pb-3 font-medium">Produto</th>
                  <th className="pb-3 font-medium">Categoria</th>
                  <th className="pb-3 font-medium">Preço</th>
                  <th className="pb-3 font-medium">Estoque</th>
                  <th className="pb-3 font-medium">Avaliação</th>
                  <th className="pb-3 font-medium text-right">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td
                        colSpan={6}
                        className="mb-2 h-16 rounded-lg bg-zinc-50 py-4 dark:bg-zinc-800"
                      />
                    </tr>
                  ))
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-zinc-500 dark:text-zinc-400"
                    >
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded border border-zinc-200 dark:border-zinc-800">
                            <img
                              src={product.main_image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="ml-3">
                            <p className="font-medium text-zinc-900 dark:text-zinc-50">
                              {product.name}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4">
                        <Badge variant="secondary">
                          {product.category_name || "Sem categoria"}
                        </Badge>
                      </td>

                      <td className="py-4 font-medium text-zinc-900 dark:text-zinc-50">
                        {formatPrice(product.price)}
                      </td>

                      <td className="py-4">
                        <span
                          className={`font-medium ${
                            product.stock < 10
                              ? "text-red-600 dark:text-red-400"
                              : "text-zinc-600 dark:text-zinc-400"
                          }`}
                        >
                          {product.stock} unidades
                        </span>
                      </td>

                      <td className="py-4 text-zinc-600 dark:text-zinc-400">
                        {product.rating} / 5.0
                      </td>

                      <td className="py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEditForm(product)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                            onClick={() => handleDeleteProduct(product.id)}
                            isLoading={
                              deleteMutation.isPending &&
                              deleteMutation.variables === product.id
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}