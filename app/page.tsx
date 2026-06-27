import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, MapPin, CheckCircle, ShieldCheck, Award, Package, Flame } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Traemos todos los perfumes de la base de datos
  const products = await prisma.product.findMany({
    include: { brand: true },
    orderBy: { createdAt: 'desc' }
  });

  // Tomamos los primeros 5 perfumes de la base de datos para las Tarjetas Destacadas
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="w-full bg-white text-stone-900 pb-24">
      
      {/* =========================================================
          1. HERO INFORMATIVO PRINCIPAL (Estable en todas las pantallas)
          ========================================================= */}
      <section className="relative overflow-hidden bg-stone-50 border-b border-stone-100 px-4 pt-16 pb-16 sm:pt-24 sm:pb-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none select-none" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Columna Izquierda: Mensaje y Acción */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-block rounded-none border border-stone-200 bg-white px-4 py-1.5 shadow-sm">
                <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-stone-600">
                  <Sparkles size={10} className="text-amber-600 fill-amber-600/20" /> Alta Perfumería en RD
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light tracking-tight text-stone-900 leading-tight">
                La empresa con las fragancias <br />
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-amber-700 to-stone-900">más exclusiva de</span> República Dominicana.
              </h1>
              
              <p className="max-w-xl text-sm text-stone-500 font-light tracking-wide leading-relaxed">
                Conectamos a entusiastas y coleccionistas con las composiciones olfativas más galardonadas del mundo. Desde botellas completas hasta formatos de viaje controlados.
              </p>

              <div className="pt-2 sm:pt-4">
                <Link 
                  href="/catalogo" 
                  className="inline-block bg-stone-900 text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-all hover:bg-stone-800 hover:tracking-[0.3em] active:scale-[0.98] shadow-sm"
                >
                  Explorar Catálogo Real
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Panel de Datos / Garantías */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              
              {/* Métrica 1 */}
              <div className="bg-white border border-stone-200 p-6 flex items-start gap-4 shadow-sm">
                <div className="p-3 bg-stone-50 text-stone-900">
                  <Award size={20} className="stroke-[1.5]" />
                </div>
                <div>
                  <span className="block text-xl font-mono font-bold text-stone-900 tracking-tight">100% Original</span>
                  <span className="block text-xs uppercase font-bold tracking-wider text-amber-700 mt-0.5">Garantía Certificada</span>
                  <p className="text-xs text-stone-400 font-light mt-1.5 leading-relaxed">
                    Cada mililitro proviene estrictamente de distribuidores autorizados y casas oficiales.
                  </p>
                </div>
              </div>

              {/* Métrica 2 */}
              <div className="bg-white border border-stone-200 p-6 flex items-start gap-4 shadow-sm">
                <div className="p-3 bg-stone-50 text-stone-900">
                  <Package size={20} className="stroke-[1.5]" />
                </div>
                <div>
                  <span className="block text-xl font-mono font-bold text-stone-900 tracking-tight">Decants Disponibles</span>
                  <span className="block text-xs uppercase font-bold tracking-wider text-stone-500 mt-0.5">Tipo Premium</span>
                  <p className="text-xs text-stone-400 font-light mt-1.5 leading-relaxed">
                    Dando lo mejor de cada fragancia en formatos portátiles de alta calidad.
                  </p>
                </div>
              </div>

              {/* Métrica 3 */}
              <div className="bg-white border border-stone-200 p-6 flex items-start gap-4 shadow-sm">
                <div className="p-3 bg-stone-50 text-stone-900">
                  <ShieldCheck size={20} className="stroke-[1.5]" />
                </div>
                <div>
                  <span className="block text-xl font-mono font-bold text-stone-900 tracking-tight">Despacho VIP</span>
                  <span className="block text-xs uppercase font-bold tracking-wider text-stone-500 mt-0.5">Envío Seguro en RD</span>
                  <p className="text-xs text-stone-400 font-light mt-1.5 leading-relaxed">
                    Entregas y envíos en todo el país a través de transportes altamente confiables.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          3. SECCIÓN GENERAL: TODOS LOS PRODUCTOS DEL CATÁLOGO
          ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="border-b border-stone-100 pb-4 mb-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
            Explorar Colección Completa
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================
          4. SECCIÓN FINAL: FORMATOS DE VIAJE / DECANT ÚNICO (Blindado para Móvil)
          ========================================================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-24 md:mt-32 mb-16 w-full clear-both">
        <div className="border-t border-stone-100 pt-16 md:pt-24">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-12 items-center">
            
            {/* Bloque de Texto */}
            <div className="space-y-6 md:col-span-7 text-left w-full">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-700 block">
                Formatos de Bolsillo
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-stone-900 leading-tight">
                Lujo portátil: Tus esencias favoritas en <span className="font-serif italic">decants de 10ml</span>.
              </h2>
              <p className="text-sm text-stone-500 font-light leading-relaxed max-w-xl">
                Lleva tu fragancia exclusiva contigo a cualquier lugar. Nuestros atomizadores matte black de 10ml son recargables, discretos y diseñados para proteger la integridad de cada aroma, perfectos para el bolsillo o bolso de mano.
              </p>
              
              {/* Beneficios */}
              <div className="pt-2 space-y-3 text-xs md:text-sm font-medium text-stone-800">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-stone-400" />
                  <span>Entrega exclusiva en todo RD</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-stone-400" />
                  <span>Autenticidad garantizada</span>
                </div>
              </div>

              {/* Botón */}
              <div className="pt-4">
               
              </div>
            </div>

            {/* Imagen del Decant (Usando el componente oficial Image con tamaños fijos para móvil) */}
            <div className="md:col-span-5 flex justify-center md:justify-end w-full pt-4 md:pt-0">
              <div className="relative w-full max-w-[280px] h-[280px] bg-stone-50 border border-stone-100 p-2 group overflow-hidden shadow-sm">
                <Image 
                  src="/images/ato.jpg" 
                  alt="Colección de decants de perfume de 10ml"
                  fill
                  sizes="(max-width: 768px) 280px, 280px"
                  priority
                  className="p-2 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}