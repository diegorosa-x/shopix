import { useDashboardStats } from '../../features/orders/hooks/useOrders';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { formatPrice } from '../../utils';
import { DollarSign, ShoppingBag, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useDashboardStats();
  const { resolvedTheme } = useThemeStore();

  if (isLoading) return <div className="p-8 text-center">Carregando painel...</div>;

  const isDark = resolvedTheme === 'dark';
  const COLORS = isDark 
    ? ['#ffffff', '#a1a1aa', '#71717a', '#3f3f46']
    : ['#000000', '#3f3f46', '#71717a', '#a1a1aa'];

  const chartGridColor = isDark ? '#27272a' : '#f4f4f5';
  const chartTextColor = isDark ? '#a1a1aa' : '#71717a';
  const chartTooltipBg = isDark ? '#18181b' : '#ffffff';
  const chartStrokeColor = isDark ? '#ffffff' : '#000000';

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Receita Total</p>
                <h3 className="mt-1 text-2xl font-bold">{formatPrice(stats?.totalRevenue || 0)}</h3>
              </div>
              <div className="rounded-full bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+12.5% em relação ao mês passado</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total de Pedidos</p>
                <h3 className="mt-1 text-2xl font-bold">{stats?.totalOrders}</h3>
              </div>
              <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <ShoppingBag className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+8.2% em relação ao mês passado</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total de Usuários</p>
                <h3 className="mt-1 text-2xl font-bold">{stats?.totalUsers}</h3>
              </div>
              <div className="rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-red-600 dark:text-red-400">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              <span>-2.4% em relação ao mês passado</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Produtos Ativos</p>
                <h3 className="mt-1 text-2xl font-bold">{stats?.totalProducts}</h3>
              </div>
              <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <Package className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+4 novos esta semana</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Visão Geral da Receita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.salesData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartStrokeColor} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={chartStrokeColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: chartTextColor }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: chartTextColor }} tickFormatter={(val) => `$${val}`} />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: chartTooltipBg,
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      color: isDark ? '#fff' : '#000'
                    }}
                    itemStyle={{ color: isDark ? '#fff' : '#000' }}
                    formatter={(val) => [`$${val}`, 'Receita']}
                  />
                  <Area type="monotone" dataKey="amount" stroke={chartStrokeColor} strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vendas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.categoryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: chartTextColor }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: chartTextColor }} />
                  <Tooltip
                    cursor={{ fill: chartGridColor }}
                    contentStyle={{ 
                      backgroundColor: chartTooltipBg,
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      color: isDark ? '#fff' : '#000'
                    }}
                    itemStyle={{ color: isDark ? '#fff' : '#000' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {stats?.categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table (Simplified) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pedidos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <tr>
                  <th className="pb-3 font-medium">ID do Pedido</th>
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium text-right">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="py-4 font-medium text-zinc-900 dark:text-zinc-50">#ORD-723{i}</td>
                    <td className="py-4 text-zinc-600 dark:text-zinc-400">Cliente {i}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Pago
                      </span>
                    </td>
                    <td className="py-4 text-zinc-900 font-medium dark:text-zinc-50">$249.00</td>
                    <td className="py-4 text-right text-zinc-500 dark:text-zinc-400">Mar {i}, 2024</td>
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
