import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '../../utils';
import { useLogout } from '../../features/auth/hooks/useAuth';

const navItems = [
  { name: 'Painel', href: '/admin', icon: LayoutDashboard },
  { name: 'Produtos', href: '/admin/products', icon: Package },
  { name: 'Pedidos', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Usuários', href: '/admin/users', icon: Users },
  { name: 'Configurações', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const logout = useLogout();

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-zinc-200 bg-white md:flex dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-16 items-center border-b border-zinc-200 px-6 dark:border-zinc-800">
        <Link to="/" className="text-xl font-bold tracking-tighter text-black dark:text-white">
          LUXE<span className="font-light">ADMIN</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === '/admin'}
            className={({ isActive }) =>
              cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white'
                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white'
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <button
          onClick={logout}
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
        >
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  );
}
