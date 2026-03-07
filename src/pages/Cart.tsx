import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <ShoppingBag className="h-10 w-10 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-bold">Seu carrinho está vazio</h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">Parece que você ainda não adicionou nada ao seu carrinho.</p>
          <Link to="/products" className="mt-8">
            <Button size="lg">Começar a Comprar</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Carrinho de Compras</h1>
      
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <ul className="divide-y divide-zinc-200 border-t border-b border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex py-6"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-zinc-900 dark:text-zinc-50">
                        <h3>
                          <Link to={`/products/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{item.category}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center rounded-md border border-zinc-200 dark:border-zinc-800">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="flex items-center font-medium text-red-600 hover:text-red-500"
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="rounded-xl bg-zinc-50 p-6 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Resumo do Pedido</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Subtotal ({totalItems()} itens)</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{formatPrice(totalPrice())}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Frete</p>
                <p className="text-sm font-medium text-emerald-600">Grátis</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Imposto</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{formatPrice(totalPrice() * 0.08)}</p>
              </div>
              <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-zinc-900 dark:text-zinc-50">Total</p>
                  <p className="text-base font-bold text-zinc-900 dark:text-zinc-50">{formatPrice(totalPrice() * 1.08)}</p>
                </div>
              </div>
            </div>

            <Link to="/checkout" className="mt-8 block">
              <Button className="w-full" size="lg">
                Finalizar Compra <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
              Pagamento seguro processado pelo Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
