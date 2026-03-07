import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useCreateOrder } from '../features/orders/hooks/useOrders';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { formatPrice } from '../utils';
import { CheckCircle2, CreditCard, Truck, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

type Step = 'shipping' | 'payment' | 'confirmation';

export default function Checkout() {
  const [step, setStep] = useState<Step>('shipping');
  const { items, totalPrice, clearCart } = useCartStore();
  const createOrderMutation = useCreateOrder();
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    fullName: 'Alex Johnson',
    address: '123 Luxury Ave',
    city: 'New York',
    zipCode: '10001',
    country: 'USA',
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createOrderMutation.mutate({
      userId: 'u1',
      items,
      total: totalPrice() * 1.08,
      shippingAddress: shippingData,
      paymentMethod: 'Credit Card',
    }, {
      onSuccess: () => {
        setStep('confirmation');
        clearCart();
      }
    });
  };

  if (step === 'confirmation') {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Pedido Confirmado!</h1>
          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
            Obrigado pela sua compra. Enviamos um e-mail de confirmação para sua caixa de entrada.
          </p>
          <div className="mt-10 flex space-x-4">
            <Button onClick={() => navigate('/profile')}>Ver Pedidos</Button>
            <Button variant="outline" onClick={() => navigate('/')}>Continuar Comprando</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {/* Progress Bar */}
          <div className="mb-12 flex items-center justify-between">
            <div className={`flex flex-1 items-center transition-colors ${step === 'shipping' ? 'text-black dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${step === 'shipping' ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black' : 'border-zinc-200 dark:border-zinc-800'}`}>1</div>
              <span className="ml-2 font-semibold">Entrega</span>
            </div>
            <div className="mx-4 h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            <div className={`flex flex-1 items-center transition-colors ${step === 'payment' ? 'text-black dark:text-white' : 'text-zinc-400 dark:text-zinc-600'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${step === 'payment' ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black' : 'border-zinc-200 dark:border-zinc-800'}`}>2</div>
              <span className="ml-2 font-semibold">Pagamento</span>
            </div>
          </div>

          {step === 'shipping' ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><MapPin className="mr-2 h-5 w-5" /> Endereço de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <Input
                    label="Nome Completo"
                    value={shippingData.fullName}
                    onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                    required
                  />
                  <Input
                    label="Endereço"
                    value={shippingData.address}
                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Cidade"
                      value={shippingData.city}
                      onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                      required
                    />
                    <Input
                      label="CEP"
                      value={shippingData.zipCode}
                      onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                      required
                    />
                  </div>
                  <Input
                    label="País"
                    value={shippingData.country}
                    onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                    required
                  />
                  <Button type="submit" className="w-full">Continuar para Pagamento</Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5" /> Método de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full border-4 border-black dark:border-white" />
                        <span className="ml-3 font-medium">Cartão de Crédito / Débito</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-6 w-10 rounded bg-zinc-100 dark:bg-zinc-800" />
                        <div className="h-6 w-10 rounded bg-zinc-100 dark:bg-zinc-800" />
                      </div>
                    </div>
                    <div className="mt-6 space-y-4">
                      <Input label="Número do Cartão" placeholder="0000 0000 0000 0000" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Data de Validade" placeholder="MM/AA" />
                        <Input label="CVV" placeholder="123" />
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="outline" className="flex-1" onClick={() => setStep('shipping')}>Voltar</Button>
                    <Button type="submit" className="flex-1" isLoading={createOrderMutation.isPending}>Finalizar Pedido {formatPrice(totalPrice() * 1.08)}</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4">
          <Card className="bg-zinc-50 dark:bg-zinc-900">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-800">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 truncate dark:text-zinc-50">{item.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Qtd: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
              <div className="border-t border-zinc-200 pt-4 space-y-2 dark:border-zinc-800">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Frete</span>
                  <span className="font-medium text-emerald-600">Grátis</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Imposto (8%)</span>
                  <span className="font-medium">{formatPrice(totalPrice() * 0.08)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-zinc-200 pt-2 dark:border-zinc-800">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice() * 1.08)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
