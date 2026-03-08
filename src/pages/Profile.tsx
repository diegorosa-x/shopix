import { useAuthStore } from "../store/useAuthStore";
import { useOrders } from "../features/orders/hooks/useOrders";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { formatPrice } from "../utils";
import { Package, MapPin, User as UserIcon, History } from "lucide-react";
import { format } from "date-fns";

export default function Profile() {
  const { user } = useAuthStore();
  const { data: orders, isLoading } = useOrders();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Minha Conta</h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Gerencie seu perfil e veja seu histórico de pedidos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <UserIcon className="mr-2 h-5 w-5" /> Informações do Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden dark:bg-zinc-800">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserIcon className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-zinc-50">
                    {user?.name}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Função da Conta
                </p>
                <Badge className="mt-1 capitalize">
                  {user?.role === "admin" ? "Administrador" : "Usuário"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MapPin className="mr-2 h-5 w-5" /> Endereços Salvos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Entrega Padrão
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Rua das Palmeiras, 123, São Paulo, SP, Brasil
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <History className="mr-2 h-5 w-5" /> Histórico de Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-24 w-full animate-pulse rounded-lg bg-zinc-50 dark:bg-zinc-800"
                    />
                  ))}
                </div>
              ) : orders?.length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center text-zinc-500 dark:text-zinc-400">
                  <Package className="mb-2 h-8 w-8 opacity-20" />
                  <p>Nenhum pedido encontrado.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders?.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
                    >
                      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                        <div>
                          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                            Pedido #{order.id.toUpperCase()}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Realizado em{" "}
                            {format(new Date(order.createdAt), "dd/MM/yyyy")}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                              {formatPrice(order.total)}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {order.items.length} itens
                            </p>
                          </div>
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "success"
                                : "warning"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-6 flex -space-x-2 overflow-hidden">
                        {order.items.map((item) => (
                          <img
                            key={item.id}
                            src={item.main_image}
                            alt={item.name}
                            className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-zinc-900"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
