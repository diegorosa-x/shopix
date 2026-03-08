import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../../components/admin/ProductForm";
import { useProduct, useUpdateProduct } from "../../../features/products/hooks/useProducts";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent } from "../../../components/ui/Card";
import type { ProductPayload } from "../../../types";

export default function ProductEdit() {
  const navigate = useNavigate();
  const { id = "" } = useParams();

  const { data: product, isLoading, isError } = useProduct(id);
  const updateMutation = useUpdateProduct();

  async function handleSubmit(payload: ProductPayload) {
    if (!id) return;

    try {
      await updateMutation.mutateAsync({
        id,
        payload,
      });

      alert("Produto atualizado com sucesso.");
      navigate(`/admin/products/${id}`);
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar produto.");
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Carregando produto...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError || !product) {
    return (
      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          <p className="text-red-600 dark:text-red-400">
            Não foi possível carregar o produto.
          </p>
          <div>
            <Button onClick={() => navigate("/admin/products")} variant="outline">
              Voltar para produtos
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Editar produto</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Atualize os dados de {product.name}.
          </p>
        </div>

        <Button variant="outline" onClick={() => navigate(`/admin/products/${id}`)}>
          Voltar
        </Button>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/admin/products/${id}`)}
        isLoading={updateMutation.isPending}
      />
    </div>
  );
}