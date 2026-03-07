import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useLogout } from '../../features/auth/hooks/useAuth';
import { useCartStore } from '../../store/useCartStore';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from '../ThemeToggle';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const logout = useLogout();
  const { totalItems } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-bottom border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-black dark:text-white">
              LUXE<span className="font-light">COMMERCE</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/products" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">Loja</Link>
              <Link to="/products?category=Relógios" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">Relógios</Link>
              <Link to="/products?category=Óculos" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">Óculos</Link>
              <Link to="/products?category=Bolsas" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">Bolsas</Link>
              <Link to="/products?category=Joias" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">Joias</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/cart" className="relative p-2 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
              <ShoppingCart className="h-6 w-6" />
              {totalItems() > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white dark:bg-white dark:text-black">
                  {totalItems()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.role === 'admin' && (
                  <Link to="/admin" className="hidden md:block">
                    <Button variant="outline" size="sm">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Link to="/profile" className="hidden md:block p-2 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                  <User className="h-6 w-6" />
                </Link>
                <button onClick={handleLogout} className="hidden md:block p-2 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <Button size="sm">Entrar</Button>
              </Link>
            )}

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-zinc-600 hover:text-black">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              <Link to="/products" className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">Loja</Link>
              <Link to="/products?category=Relógios" className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">Relógios</Link>
              <Link to="/products?category=Óculos" className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">Óculos</Link>
              <Link to="/products?category=Bolsas" className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">Bolsas</Link>
              <Link to="/products?category=Joias" className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">Joias</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">Perfil</Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">Painel Admin</Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">Sair</button>
                </>
              ) : (
                <Link to="/login" className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">Entrar</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
