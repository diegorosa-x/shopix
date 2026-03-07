import { useOrders, useUpdateOrderStatus } from '../../features/orders/hooks/useOrders';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { formatPrice } from '../../utils';
import { Search, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { format } from 'date-fns';
import { OrderStatus } from '../../core/types';

export default function AdminOrders() {
  const { data: orders, isLoading } = useOrders();

  const updateStatusMutation = useUpdateOrderStatus();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pedidos</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Monitore e gerencie os pedidos dos clientes.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="relative w-full md:w-80">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
              <Input placeholder="Buscar pedidos..." className="pl-10" />
            </div>
            <div className="flex items-center space-x-2">
              <select className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-white">
                <option>Todos os Status</option>
                <option>Pendente</option>
                <option>Pago</option>
                <option>Enviado</option>
                <option>Entregue</option>
                <option>Cancelado</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <tr>
                  <th className="pb-3 font-medium">ID do Pedido</th>
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Data</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="py-4 h-12 bg-zinc-50 rounded mb-2 dark:bg-zinc-800" />
                    </tr>
                  ))
                ) : orders?.map((order) => (
                  <tr key={order.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="py-4 font-medium text-zinc-900 dark:text-zinc-50">#{order.id.toUpperCase()}</td>
                    <td className="py-4 text-zinc-600 dark:text-zinc-400">{order.shippingAddress.fullName}</td>
                    <td className="py-4 text-zinc-500 dark:text-zinc-400">{format(new Date(order.createdAt), 'dd/MM/yyyy')}</td>
                    <td className="py-4 font-medium text-zinc-900 dark:text-zinc-50">{formatPrice(order.total)}</td>
                    <td className="py-4">
                      <select 
                        className="rounded border border-zinc-200 bg-transparent px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:focus:ring-white"
                        value={order.status}
                        onChange={(e) => updateStatusMutation.mutate({ id: order.id, status: e.target.value as OrderStatus })}
                        disabled={updateStatusMutation.isPending && updateStatusMutation.variables?.id === order.id}
                      >
                        <option value="Pendente" className="dark:bg-zinc-900">Pendente</option>
                        <option value="Pago" className="dark:bg-zinc-900">Pago</option>
                        <option value="Enviado" className="dark:bg-zinc-900">Enviado</option>
                        <option value="Entregue" className="dark:bg-zinc-900">Entregue</option>
                        <option value="Cancelado" className="dark:bg-zinc-900">Cancelado</option>
                      </select>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
