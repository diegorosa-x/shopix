import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { useProduct } from '../features/products/hooks/useProducts';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { formatPrice } from '../utils';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const { data: product, isLoading, error } = useProduct(id!);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
          <div className="space-y-6">
            <div className="h-8 w-1/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-12 w-3/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-24 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-10 w-1/3 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Produto não encontrado</h2>
        <Link to="/products" className="mt-4 text-zinc-500 hover:underline dark:text-zinc-400 dark:hover:text-white">Voltar ao catálogo</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/products" className="mb-8 flex items-center text-sm font-medium text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao catálogo
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-4">
            <Badge variant="secondary">{product.category}</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{product.name}</h1>
          
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-zinc-200 dark:text-zinc-800'}`} />
              ))}
              <span className="ml-2 text-sm font-bold text-zinc-900 dark:text-zinc-50">{product.rating}</span>
            </div>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">({product.reviewsCount} avaliações)</span>
          </div>

          <p className="mt-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50">{formatPrice(product.price)}</p>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Descrição</h3>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-10 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center rounded-md border border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  +
                </button>
              </div>
              <Button
                size="lg"
                className="flex-1"
                onClick={() => addItem(product, quantity)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao Carrinho
              </Button>
            </div>

            <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
              <div className={`mr-2 h-2 w-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
              {product.stock > 0 ? `Em estoque (${product.stock} unidades)` : 'Fora de estoque'}
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-3 dark:border-zinc-800">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-zinc-400" />
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Frete grátis</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-5 w-5 text-zinc-400" />
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Garantia de 2 anos</span>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCcw className="h-5 w-5 text-zinc-400" />
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Devolução em 30 dias</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
