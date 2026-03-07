import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold tracking-tighter text-black dark:text-white">
              LUXE<span className="font-light">COMMERCE</span>
            </Link>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              Acessórios de luxo premium para o indivíduo moderno. Artesanato de qualidade, design atemporal.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Loja</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/products" className="text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white">Todos os Produtos</Link></li>
              <li><Link to="/products?category=Relógios" className="text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white">Relógios</Link></li>
              <li><Link to="/products?category=Óculos" className="text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white">Óculos</Link></li>
              <li><Link to="/products?category=Bolsas" className="text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white">Bolsas</Link></li>
              <li><Link to="/products?category=Joias" className="text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white">Joias</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Suporte</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/contact" className="text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white">Fale Conosco</Link></li>
              <li><Link to="/shipping" className="text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white">Informações de Frete</Link></li>
              <li><Link to="/returns" className="text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white">Devoluções</Link></li>
              <li><Link to="/faq" className="text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/privacy" className="text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white">Política de Privacidade</Link></li>
              <li><Link to="/terms" className="text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white">Termos de Serviço</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} LuxeCommerce Inc. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
