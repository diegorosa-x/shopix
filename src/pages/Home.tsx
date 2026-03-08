import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';
import { useFeaturedProducts } from '../features/products/hooks/useProducts';
import { ProductCard } from '../components/shared/ProductCard';
import { ProductGridSkeleton } from '../components/shared/Skeletons';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
export default function Home() {
  const { data: featuredProducts, isLoading } = useFeaturedProducts();

  const categories = [
    {
      label: 'Relógios',
      slug: 'watches',
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Óculos',
      slug: 'glasses',
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Bolsas',
      slug: 'shoulder-bags',
      image:
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Acessórios',
      slug: 'accessories',
      image:
        'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <main className="space-y-20 pb-20">
      <header className="relative h-[80vh] w-full overflow-hidden bg-zinc-900">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80"
          alt="Coleção premium de acessórios de luxo"
          loading="eager"
          className="h-full w-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-3xl px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold tracking-tighter text-white sm:text-7xl"
            >
              ELEVE O SEU <span className="italic">ESTILO</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-lg text-zinc-300 sm:text-xl"
            >
              Descubra nossa coleção selecionada de acessórios premium feitos
              para o estilo moderno.
            </motion.p>

            <motion.nav
              aria-label="Ações principais"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-zinc-200"
                >
                  Ver Coleção
                </Button>
              </Link>

              <Link to="/products?category=watches">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  Ver Relógios
                </Button>
              </Link>
            </motion.nav>
          </div>
        </div>
      </header>

      <section
        aria-labelledby="features-title"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      >
        <h2 id="features-title" className="sr-only">
          Benefícios da loja
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: Truck,
              title: 'Frete Global',
              text: 'Entrega rápida e segura para mais de 100 países.',
            },
            {
              icon: ShieldCheck,
              title: 'Garantia de 2 Anos',
              text: 'Garantia completa para todos os produtos.',
            },
            {
              icon: Clock,
              title: 'Suporte 24/7',
              text: 'Equipe disponível a qualquer hora.',
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col items-center rounded-xl border border-zinc-100 bg-white p-8 text-center shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-black transition-colors dark:bg-zinc-800 dark:text-white">
                <feature.icon className="h-7 w-7" aria-hidden="true" />
              </div>

              <h3 className="text-xl font-bold text-black transition-colors dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-zinc-500 transition-colors dark:text-zinc-400">
                {feature.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="featured-products-title"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2
              id="featured-products-title"
              className="text-3xl font-bold tracking-tight"
            >
              Coleção em Destaque
            </h2>

            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Nossas peças mais populares selecionadas para você.
            </p>
          </div>

          <Link
            to="/products"
            className="flex items-center text-sm font-semibold hover:underline dark:text-zinc-400"
          >
            Ver Tudo <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <ProductGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section
        aria-labelledby="categories-title"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <h2
          id="categories-title"
          className="mb-10 text-3xl font-bold tracking-tight"
        >
          Compre por Categoria
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group relative h-64 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800"
              aria-label={`Ver produtos da categoria ${cat.label}`}
            >
              <img
                src={cat.image}
                alt={`Categoria ${cat.label}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />

              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{cat.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}