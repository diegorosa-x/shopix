import { Link } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useLogout } from "../../features/auth/hooks/useAuth";
import { useCartStore } from "../../store/useCartStore";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "../ThemeToggle";

const navItems = [
  { label: "Loja", path: "/products" },
  { label: "Relógios", path: "/products?category=watches" },
  { label: "Óculos", path: "/products?category=glasses" },
  { label: "Bolsas", path: "/products?category=shoulder-bags" },
  { label: "Joias", path: "/products?category=accessories" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const logout = useLogout();
  const { totalItems } = useCartStore();

  const handleLogout = () => logout();

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/90 backdrop-blur-md"
      role="navigation"
      aria-label="Menu principal"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
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

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8 pl-32">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="text-sm font-medium text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">

            <ThemeToggle />

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Carrinho com ${totalItems()} itens`}
              className="relative p-2 text-zinc-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white transition-colors"
            >
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />

              {totalItems() > 0 && (
                <span
                  aria-live="polite"
                  className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black"
                >
                  {totalItems()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">

                {user?.role === "admin" && (
                  <Link to="/admin">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden md:flex border-white text-white"
                    >
                      <LayoutDashboard
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Admin
                    </Button>
                  </Link>
                )}

                <Link
                  to="/profile"
                  aria-label="Perfil do usuário"
                  className="hidden md:block p-2 text-zinc-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white"
                >
                  <User className="h-6 w-6" aria-hidden="true" />
                </Link>

                <button
                  onClick={handleLogout}
                  aria-label="Sair da conta"
                  className="hidden md:block p-2 text-zinc-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white"
                >
                  <LogOut className="h-6 w-6" aria-hidden="true" />
                </button>

              </div>
            ) : (
              <Link to="/login">
                <Button
                  size="sm"
                  className="hidden md:block bg-white text-black hover:bg-zinc-200"
                >
                  Entrar
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              aria-label="Abrir menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-800 bg-black"
          >
            <ul className="space-y-1 px-3 pt-2 pb-3">

              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="block px-3 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    >
                      Perfil
                    </Link>
                  </li>

                  {user?.role === "admin" && (
                    <li>
                      <Link
                        to="/admin"
                        className="block px-3 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                      >
                        Painel Admin
                      </Link>
                    </li>
                  )}

                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    >
                      Sair
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                  >
                    Entrar
                  </Link>
                </li>
              )}

            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}