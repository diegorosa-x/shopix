import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../core/types';
import { formatPrice } from '../../utils';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/useCartStore';
import { motion } from 'motion/react';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      <Link to={`/products/${product.id}`} className="aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider dark:text-zinc-400">{product.category}</span>
          <div className="flex items-center text-amber-400">
            <Star className="h-3 w-3 fill-current" />
            <span className="ml-1 text-xs font-bold text-zinc-700 dark:text-zinc-300">{product.rating}</span>
          </div>
        </div>
        <Link to={`/products/${product.id}`} className="mb-1 text-base font-semibold text-zinc-900 hover:underline dark:text-zinc-50">
          {product.name}
        </Link>
        <p className="mb-4 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{formatPrice(product.price)}</span>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
