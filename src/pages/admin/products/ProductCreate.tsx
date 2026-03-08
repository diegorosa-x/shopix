import { useNavigate } from "react-router-dom";
import ProductForm from "../../../components/admin/ProductForm";
import { Button } from "../../../components/ui/Button";
import { useCreateProduct } from "../../../features/products/hooks/useProducts";
import type { ProductPayload } from "../../../types";

export default function ProductCreate() {
  const navigate = useNavigate();
  const createMutation = useCreateProduct();

  async function handleSubmit(payload: ProductPayload) {
    try {
      const created = await createMutation.mutateAsync(payload);
      alert("Produto criado com sucesso.");
      navigate(`/admin/products/${created.id}`);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar produto.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Novo produto</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Cadastre um novo produto no catálogo.
          </p>
        </div>

        <Button variant="outline" onClick={() => navigate("/admin/products")}>
          Voltar
        </Button>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/products")}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}