import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';
import { useFeaturedProducts } from '../features/products/hooks/useProducts';
import { ProductCard } from '../components/shared/ProductCard';
import { ProductGridSkeleton } from '../components/shared/Skeletons';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';

export default function Home() {
  const { data: featuredProducts, isLoading } = useFeaturedProducts();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-zinc-900">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
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
              Descubra nossa coleção selecionada de acessórios de luxo premium feitos para o estilo moderno.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <Link to="/products">
                <Button size="lg" className="bg-white text-black hover:bg-zinc-200">
                  Ver Coleção
                </Button>
              </Link>
              <Link to="/products?category=Relógios">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Ver Relógios
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Frete Global</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Entrega rápida e segura para mais de 100 países em todo o mundo.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Garantia de 2 Anos</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Garantimos nossa qualidade com uma garantia líder no setor.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Suporte 24/7</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Nossa equipe dedicada está aqui para ajudá-lo a qualquer hora, em qualquer lugar.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Coleção em Destaque</h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">Nossas peças mais populares, selecionadas para você.</p>
          </div>
          <Link to="/products" className="flex items-center text-sm font-semibold hover:underline dark:text-zinc-400 dark:hover:text-white">
            Ver Tudo <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <ProductGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts?.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-3xl font-bold tracking-tight">Compre por Categoria</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Relógios', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
            { name: 'Óculos', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80' },
            { name: 'Bolsas', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80' },
            { name: 'Joias', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80' },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="group relative h-64 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
