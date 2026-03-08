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
import { supabase } from "../../core/api/supabase";
import { useAuthStore } from "../../store/useAuthStore";

const navItems = [
  { name: "Painel", href: "/admin", icon: LayoutDashboard },
  { name: "Produtos", href: "/admin/products", icon: Package },
  { name: "Pedidos", href: "/admin/orders", icon: ShoppingBag },
  { name: "Usuários", href: "/admin/users", icon: Users },
  { name: "Configurações", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
  };

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-neutral-200 bg-white text-black transition-colors duration-300 dark:border-neutral-800 dark:bg-black dark:text-white md:flex">
      <div className="flex h-16 items-center border-b border-neutral-200 px-6 dark:border-neutral-800">
        <Link
          to="/"
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Ir para página inicial"
        >
          <img
            src="/assets/img/shopix-logo-dark.png"
            alt="Shopix"
            className="h-10 w-auto dark:hidden"
          />
          <img
            src="/assets/img/shopix-logo-light.png"
            alt="Shopix"
            className="hidden h-10 w-auto dark:block"
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/admin"}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white",
                )
              }
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}