import { Link } from "react-router-dom";

const shopLinks = [
  { label: "Todos os Produtos", path: "/products" },
  { label: "Relógios", path: "/products?category=Relógios" },
  { label: "Óculos", path: "/products?category=Óculos" },
  { label: "Bolsas", path: "/products?category=Bolsas" },
  { label: "Joias", path: "/products?category=Joias" },
];

const supportLinks = [
  { label: "Fale Conosco", path: "/contact" },
  { label: "Informações de Frete", path: "/shipping" },
  { label: "Devoluções", path: "/returns" },
  { label: "FAQ", path: "/faq" },
];

const legalLinks = [
  { label: "Política de Privacidade", path: "/privacy" },
  { label: "Termos de Serviço", path: "/terms" },
];

export function Footer() {
  const year = new Date().getFullYear();

  const renderLinks = (links: { label: string; path: string }[]) =>
    links.map((link) => (
      <li key={link.label}>
        <Link
          to={link.path}
          className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
        >
          {link.label}
        </Link>
      </li>
    ));

  return (
    <footer
      role="contentinfo"
      className="border-t border-neutral-200 bg-white text-black dark:border-neutral-800 dark:bg-black dark:text-white transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
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

            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Acessórios premium para o indivíduo moderno. Design atemporal e
              qualidade superior.
            </p>
          </div>

          {/* Loja */}
          <nav aria-labelledby="footer-shop">
            <h2
              id="footer-shop"
              className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white"
            >
              Loja
            </h2>

            <ul className="mt-4 space-y-2">{renderLinks(shopLinks)}</ul>
          </nav>

          {/* Suporte */}
          <nav aria-labelledby="footer-support">
            <h2
              id="footer-support"
              className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white"
            >
              Suporte
            </h2>

            <ul className="mt-4 space-y-2">{renderLinks(supportLinks)}</ul>
          </nav>

          {/* Legal */}
          <nav aria-labelledby="footer-legal">
            <h2
              id="footer-legal"
              className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white"
            >
              Legal
            </h2>

            <ul className="mt-4 space-y-2">{renderLinks(legalLinks)}</ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            © {year} Shopix Inc. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
