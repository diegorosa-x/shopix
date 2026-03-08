import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import type { Product } from "../../../types";
import {
  useDeleteProduct,
  useProducts,
} from "../../../features/products/hooks/useProducts";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Input } from "../../../components/ui/Input";
import { formatPrice } from "../../../utils";
import { AdminPageHeader } from "../../../components/admin/AdminPageHeader";
import {
  AdminDataTable,
  type DataColumn,
} from "../../../components/admin/AdminDataTable";
import {
  RowActionsMenu,
  type RowActionItem,
} from "../../../components/admin/RowActionsMenu";
import { getCategoryBadgeClass } from "../../../features/products/utils/categoryBadge";

export default function ProductsList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products = [], isLoading } = useProducts({});
  const deleteMutation = useDeleteProduct();

  const filteredProducts = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return products;

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.category_name.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.slug.toLowerCase().includes(search)
      );
    });
  }, [products, searchTerm]);

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Deseja realmente deletar o produto "${product.name}"?`,
    );

    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(product.id);
      alert("Produto deletado com sucesso.");
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar produto.");
    }
  }

  function getRowActions(product: Product): RowActionItem[] {
    return [
      {
        label: "Ver detalhes",
        onClick: () => navigate(`/admin/products/${product.id}`),
      },
      {
        label: "Editar produto",
        onClick: () => navigate(`/admin/products/${product.id}/edit`),
      },
      {
        label: "Excluir produto",
        variant: "danger",
        onClick: () => handleDelete(product),
      },
    ];
  }

  const columns: DataColumn<Product>[] = [
    {
      key: "product",
      title: "Produto",
      render: (product) => (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(`/admin/products/${product.id}`)}
            className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <img
              src={product.main_image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </button>

          <div className="min-w-0">
            <button
              type="button"
              onClick={() => navigate(`/admin/products/${product.id}`)}
              className="block truncate text-left font-medium text-zinc-900 hover:underline dark:text-zinc-100"
            >
              {product.name}
            </button>

            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              {product.slug}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      title: "Categoria",
      render: (product) => {
        const categoryLabel = product.category_name || "Sem categoria";

        return (
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getCategoryBadgeClass(
              categoryLabel,
            )}`}
          >
            {categoryLabel}
          </span>
        );
      },
    },
    {
      key: "price",
      title: "Preço",
      render: (product) => (
        <span className="font-medium text-zinc-900 dark:text-zinc-100">
          {formatPrice(product.price)}
        </span>
      ),
    },
    {
      key: "stock",
      title: "Estoque",
      render: (product) => (
        <span
          className={`font-medium ${
            product.stock < 10
              ? "text-red-600 dark:text-red-400"
              : "text-zinc-700 dark:text-zinc-300"
          }`}
        >
          {product.stock} unidades
        </span>
      ),
    },
    {
      key: "featured",
      title: "Destaque",
      render: (product) =>
        product.is_featured ? (
          <Badge>Sim</Badge>
        ) : (
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Não</span>
        ),
    },
    {
      key: "rating",
      title: "Avaliação",
      render: (product) => (
        <span className="text-zinc-700 dark:text-zinc-300">
          {product.rating} / 5.0
        </span>
      ),
    },
    {
      key: "actions",
      title: "",
      className: "w-[60px] text-right",
      headerClassName: "w-[60px] text-right",
      render: (product) => <RowActionsMenu actions={getRowActions(product)} />,
    },
  ];

  const toolbarLeft = (
    <div className="relative w-full max-w-sm">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
      <Input
        placeholder="Buscar produto..."
        className="pl-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );

  const toolbarRight = (
    <>
      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        {filteredProducts.length} produto(s)
      </span>

      <Button onClick={() => navigate("/admin/products/new")}>
        <Plus className="mr-2 h-4 w-4" />
        Criar Produto
      </Button>
    </>
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Produtos"
        description="Gerencie seu catálogo de produtos e estoque."
      />

      <AdminDataTable<Product>
        data={filteredProducts}
        columns={columns}
        keyField="id"
        isLoading={isLoading}
        emptyMessage="Nenhum produto encontrado."
        toolbarLeft={toolbarLeft}
        toolbarRight={toolbarRight}
        enablePagination
        pageSize={10}
      />
    </div>
  );
}
