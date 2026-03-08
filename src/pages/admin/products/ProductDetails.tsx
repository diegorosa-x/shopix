import { useNavigate, useParams } from "react-router-dom";
import { Edit2, Trash2, ArrowLeft } from "lucide-react";
import { useDeleteProduct, useProduct } from "../../../features/products/hooks/useProducts";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { formatPrice } from "../../../utils";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id = "" } = useParams();

  const { data: product, isLoading, isError } = useProduct(id);
  const deleteMutation = useDeleteProduct();

  async function handleDelete() {
    if (!product) return;

    const confirmed = window.confirm(
      `Deseja realmente deletar o produto "${product.name}"?`,
    );
    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(product.id);
      alert("Produto deletado com sucesso.");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar produto.");
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Carregando detalhes do produto...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError || !product) {
    return (
      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          <p className="text-red-600 dark:text-red-400">
            Não foi possível carregar os detalhes do produto.
          </p>
          <div>
            <Button variant="outline" onClick={() => navigate("/admin/products")}>
              Voltar para produtos
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const specsEntries = product.specs ? Object.entries(product.specs) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/products")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
            <p className="text-zinc-500 dark:text-zinc-400">{product.slug}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/products/${product.id}/edit`)}
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Editar
          </Button>

          <Button
            onClick={handleDelete}
            isLoading={deleteMutation.isPending}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
        <Card>
          <CardContent className="p-6">
            <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
              <img
                src={product.main_image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="overflow-hidden rounded border border-zinc-200 dark:border-zinc-800"
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-20 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="grid gap-4 p-6 md:grid-cols-2">
              <div>
                <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">Nome</p>
                <p className="font-medium">{product.name}</p>
              </div>

              <div>
                <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">Slug</p>
                <p className="font-medium">{product.slug}</p>
              </div>

              <div>
                <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">Categoria</p>
                <p className="font-medium">{product.category_name || "Sem categoria"}</p>
              </div>

              <div>
                <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">Marca</p>
                <p className="font-medium">{product.brand || "-"}</p>
              </div>

              <div>
                <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">Preço</p>
                <p className="font-medium">{formatPrice(product.price)}</p>
              </div>

              <div>
                <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">Estoque</p>
                <p className="font-medium">{product.stock} unidades</p>
              </div>

              <div>
                <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">Avaliação</p>
                <p className="font-medium">
                  {product.rating} / 5.0 ({product.reviews_count} avaliações)
                </p>
              </div>

              <div>
                <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">Destaque</p>
                {product.is_featured ? <Badge>Em destaque</Badge> : <Badge variant="secondary">Normal</Badge>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">Descrição</p>
              <p className="whitespace-pre-line text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                {product.description || "Sem descrição."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                Especificações
              </p>

              {specsEntries.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Nenhuma especificação cadastrada.
                </p>
              ) : (
                <div className="space-y-3">
                  {specsEntries.map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800"
                    >
                      <span className="text-sm font-medium capitalize">{key}</span>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-4 p-6 md:grid-cols-2">
              <div>
                <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">Criado em</p>
                <p className="font-medium">
                  {new Date(product.created_at).toLocaleString("pt-BR")}
                </p>
              </div>

              <div>
                <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Atualizado em
                </p>
                <p className="font-medium">
                  {new Date(product.updated_at).toLocaleString("pt-BR")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}