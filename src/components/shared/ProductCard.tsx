import React from 'react'
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "../../core/types";
import { formatPrice } from "../../utils";
import { Button } from "../ui/Button";
import { useCartStore } from "../../store/useCartStore";
import { motion } from "motion/react";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const productUrl = `/products/${product.id}`;

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    addItem(product);
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
      aria-labelledby={`product-title-${product.id}`}
    >
      {/* IMAGE */}
      <Link
        to={productUrl}
        className="aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800"
        aria-label={`Ver detalhes do produto ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4 bg-white dark:bg-zinc-900">
        
        {/* CATEGORY + RATING */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {product.category}
          </span>

          <div
            className="flex items-center text-amber-500"
            aria-label={`Avaliação ${product.rating} de 5`}
          >
            <Star
              className="h-3 w-3 fill-current"
              aria-hidden="true"
            />
            <span className="ml-1 text-xs font-bold text-zinc-700 dark:text-zinc-300">
              {product.rating}
            </span>
          </div>
        </div>

        {/* TITLE */}
        <h3
          id={`product-title-${product.id}`}
          className="mb-1 text-base font-semibold text-zinc-900 dark:text-zinc-50"
        >
          <Link
            to={productUrl}
            className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600"
          >
            {product.name}
          </Link>
        </h3>

        {/* DESCRIPTION */}
        <p className="mb-4 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>

        {/* FOOTER */}
        <div className="mt-auto flex items-center justify-between">
          <span
            className="text-lg font-bold text-zinc-900 dark:text-zinc-50"
            aria-label={`Preço ${formatPrice(product.price)}`}
          >
            {formatPrice(product.price)}
          </span>

          <Button
            size="sm"
            variant="outline"
            className="flex h-8 w-8 items-center justify-center p-0"
            onClick={handleAddToCart}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingCart
              className="h-4 w-4"
              aria-hidden="true"
            />
          </Button>
        </div>

      </div>
    </motion.article>
  );
}