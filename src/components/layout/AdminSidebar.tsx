import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "../../utils";
import { useLogout } from "../../features/auth/hooks/useAuth";

const navItems = [
  { name: "Painel", href: "/admin", icon: LayoutDashboard },
  { name: "Produtos", href: "/admin/products", icon: Package },
  { name: "Pedidos", href: "/admin/orders", icon: ShoppingBag },
  { name: "Usuários", href: "/admin/users", icon: Users },
  { name: "Configurações", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const logout = useLogout();

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 border-r border-neutral-200 bg-white text-black dark:border-neutral-800 dark:bg-black dark:text-white transition-colors duration-300">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-neutral-200 px-6 dark:border-neutral-800">
        <Link
          to="/"
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Ir para página inicial"
        >
          <img
            src="/assets/img/shopix-logo-dark.png"
            alt="Shopix"
            className="h-25 w-auto"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav aria-label="Admin navigation" className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/admin"}
            className={({ isActive }) =>
              cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white",
              )
            }
          >
            <item.icon
              className="mr-3 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
        <button
          onClick={logout}
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
          Sair
        </button>
      </div>
    </aside>
  );
}
