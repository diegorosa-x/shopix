import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useProducts } from '../features/products/hooks/useProducts';
import { ProductCard } from '../components/shared/ProductCard';
import { ProductGridSkeleton } from '../components/shared/Skeletons';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Category } from '../core/types';

export default function ProductCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const category = searchParams.get('category') as Category | null;
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'newest';

  const { data: products, isLoading } = useProducts({ category: category || undefined, search, sort });

  const categories: Category[] = ['Relógios', 'Óculos', 'Bolsas', 'Joias'];

  const updateFilters = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) newParams.delete(key);
      else newParams.set(key, value);
    });
    setSearchParams(newParams);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-8">
        {/* Header & Search */}
        <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {category ? category : 'Todos os Produtos'}
            </h1>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">
              {products?.length || 0} itens encontrados
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-10"
                value={search}
                onChange={(e) => updateFilters({ search: e.target.value || null })}
              />
            </div>
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden w-64 flex-shrink-0 space-y-8 md:block">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Categorias</h3>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => updateFilters({ category: null })}
                  className={`block text-sm transition-colors ${!category ? 'font-bold text-black dark:text-white' : 'text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white'}`}
                >
                  Todas as Categorias
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateFilters({ category: cat })}
                    className={`block text-sm transition-colors ${category === cat ? 'font-bold text-black dark:text-white' : 'text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Ordenar por</h3>
              <select
                className="mt-4 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:ring-zinc-300"
                value={sort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
              >
                <option value="newest">Lançamentos</option>
                <option value="price-asc">Preço: Menor para Maior</option>
                <option value="price-desc">Preço: Maior para Menor</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <ProductGridSkeleton />
            ) : products?.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800">
                <p className="text-zinc-500 dark:text-zinc-400">Nenhum produto encontrado com seus critérios.</p>
                <Button variant="ghost" className="mt-4" onClick={() => updateFilters({ category: null, search: null })}>
                  Limpar todos os filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products?.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer (Simplified) */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-xl dark:bg-zinc-950">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Filtros</h2>
              <button onClick={() => setIsFilterOpen(false)} className="dark:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Categorias</h3>
                <div className="mt-4 space-y-4">
                  {['Todas', ...categories].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        updateFilters({ category: cat === 'Todas' ? null : cat });
                        setIsFilterOpen(false);
                      }}
                      className="block w-full text-left text-lg font-medium text-zinc-600 dark:text-zinc-400"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
