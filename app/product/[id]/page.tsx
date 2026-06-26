import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;

  // Buscamos el perfume en la base de datos
  const product = await prisma.product.findUnique({
    where: { id },
    include: { brand: true },
  });

  if (!product) {
    notFound();
  }

  // Formateador de moneda dominicana
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
    }).format(price);
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        
        {/* GRID PRINCIPAL: IMAGEN Y DETALLES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          
          {/* COLUMNA IZQUIERDA: CONTENEDOR DE IMAGEN */}
          <div className="aspect-square w-full bg-stone-50 border border-stone-100 p-8 flex items-center justify-center overflow-hidden">
            <img
              src={product.images[0] || 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600'}
              alt={product.name}
              className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* COLUMNA DERECHA: INFORMACIÓN COMERCIAL */}
          <div className="flex flex-col justify-center">
            
            {/* Marca */}
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
              {product.brand.name}
            </span>
            
            {/* Nombre del Perfume */}
            <h1 className="mt-2 text-3xl font-light tracking-tight text-stone-900 sm:text-4xl">
              {product.name}
            </h1>
            
            {/* Género y Tamaño */}
            <div className="mt-3 flex items-center gap-4 text-xs font-medium text-stone-500 uppercase tracking-wider">
              <span>{product.gender === 'UNISEX' ? 'Unisex' : product.gender === 'HOMBRE' ? 'Hombre' : 'Mujer'}</span>
              <span className="h-3 w-px bg-stone-200"></span>
              <span>{product.size} ml</span>
            </div>

            {/* Precio */}
            <p className="mt-6 text-2xl font-serif tracking-tight text-stone-900">
              {formatPrice(product.price)}
            </p>

            {/* Descripción Corta */}
            <p className="mt-6 text-sm text-stone-500 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Botón de Añadir al Carrito con mapeo explícito de propiedades */}
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                images: product.images,
                size: product.size,
                stock: product.stock,
                brandName: product.brand.name
              }} 
            />

            {/* PROPUESTA DE VALOR BOUTIQUE */}
            <div className="mt-8 border-t border-stone-100 pt-6 space-y-4">
              <div className="flex items-center gap-3 text-xs text-stone-500 font-light">
                <ShieldCheck size={16} className="text-amber-700 shrink-0" />
                <span>Garantía de autenticidad 100% verificada.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-500 font-light">
                <Truck size={16} className="text-amber-700 shrink-0" />
                <span>Envío express disponible en todo Santo Domingo e Interior.</span>
              </div>
            </div>

          </div>
        </div>

        {/* --- PIRÁMIDE OLFATIVA (Sección Editorial) --- */}
        <div className="mt-24 border-t border-stone-100 pt-16">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-stone-400 mb-3">
              Arquitectura de la Fragancia
            </h2>
            <p className="text-xl font-light font-serif italic text-stone-900">
              Evolución y Notas Olfativas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
            
            {/* NOTAS DE SALIDA */}
            <div className="bg-stone-50/50 p-8 border border-stone-100/60 rounded-none">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 block mb-2">
                Notas de Salida
              </span>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">
                La Primera Impresión
              </h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                {product.topNotes || 'Notas frescas e impactantes que se perciben durante los primeros 15 minutos.'}
              </p>
            </div>

            {/* NOTAS DE CORAZÓN */}
            <div className="bg-stone-50/50 p-8 border border-stone-100/60 rounded-none">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 block mb-2">
                Notas de Corazón
              </span>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">
                El Alma del Perfume
              </h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                {product.heartNotes || 'Esencias florales, frutales o especiadas que definen la identidad de la fragancia.'}
              </p>
            </div>

            {/* NOTAS DE FONDO */}
            <div className="bg-stone-50/50 p-8 border border-stone-100/60 rounded-none">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 block mb-2">
                Notas de Fondo
              </span>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">
                La Estela Duradera
              </h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                {product.baseNotes || 'Maderas, resinas o almizcles que fijan el perfume a la piel por horas.'}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}