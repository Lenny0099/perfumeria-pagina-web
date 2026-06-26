'use client';

import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { toast } from 'react-hot-toast';

// Tipado para consistencia con tu base de datos
interface Perfume {
  id: string;
  name: string;
  brandName: string;
  price: number;
  images: string[];
  size: number;
  genero: 'HOMBRE' | 'MUJER' | 'UNISEX';
  coleccionEtiqueta: string; // Ej: "Premium #1", "Icono Global"
  rareza: number; // Número de 1 a 5 estrellas
}

// Datos de prueba basados en tu colección de alta gama
const RECOMENDADOS_PREMIUM: Perfume[] = [
  {
    id: '1',
    name: 'Bleu de Chanel Eau de Parfum',
    brandName: 'CHANEL',
    price: 4000,
    images: ['/perfumes/chanel.jpg'], // Ajusta a tus rutas reales
    size: 100,
    genero: 'HOMBRE',
    coleccionEtiqueta: 'Premium #1',
    rareza: 4
  },
  {
    id: '2',
    name: 'Erba pura ',
    brandName: 'XERJOFF',
    price: 3500,
    images: ['/perfumes/Erba.jpg'],
    size: 100,
    genero: 'HOMBRE',
    coleccionEtiqueta: 'Icono Global #1',
    rareza: 5
  },
  {
    id: '3',
    name: 'Eros Eau de Toilette',
    brandName: 'VERSACE',
    price: 3100,
    images: ['/perfumes/eros.jpg'],
    size: 100,
    genero: 'UNISEX',
    coleccionEtiqueta: 'Clásico Moderno #3',
    rareza: 4
  }
];

export default function ProductCarouselMobile() {
  const { addItem } = useCart();

  const formatDOP = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (perfume: Perfume) => {
    addItem({
      id: perfume.id,
      name: perfume.name,
      price: perfume.price,
      images: perfume.images,
      size: perfume.size,
      brandName: perfume.brandName,
      stock: 10 // valor por defecto
    });
    toast.success(`${perfume.name} añadido a tu colección`);
  };

  return (
    <section className="bg-stone-950 py-12 text-white block md:hidden">
      <div className="px-6 mb-6 text-center">
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
          Valor de Colección
        </h2>
        <p className="text-xl font-serif font-light tracking-wide mt-1">
          Alta Perfumería en <span className="italic text-amber-400">RD 🇩🇴</span>
        </p>
      </div>

      {/* Contenedor del Carrusel Táctil */}
      <div className="flex gap-5 overflow-x-auto px-6 pb-6 scrollbar-none snap-x snap-mandatory">
        {RECOMENDADOS_PREMIUM.map((perfume) => (
          <div 
            key={perfume.id}
            className="w-[82vw] sm:w-[60vw] flex-shrink-0 bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/30 p-5 flex flex-col justify-between snap-center shadow-xl shadow-black/50 relative group"
          >
            
            {/* Etiqueta de Género flotante */}
            <span className="absolute top-8 left-8 z-10 bg-black/60 backdrop-blur-md text-[9px] font-bold tracking-widest text-stone-300 px-2.5 py-1 uppercase border border-stone-700">
              {perfume.genero}
            </span>

            {/* 1. Imagen enmarcada al estilo galería */}
            <div className="w-full aspect-square bg-white border border-amber-500/20 p-4 flex items-center justify-center overflow-hidden">
              <img 
                src={perfume.images[0]} 
                alt={perfume.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* 2. Información del Perfume */}
            <div className="mt-5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 block">
                {perfume.brandName}
              </span>
              
              <h3 className="text-sm font-serif font-medium tracking-wide text-stone-100 line-clamp-1">
                {perfume.name}
              </h3>

              <div className="text-[11px] text-stone-400 font-light space-y-0.5">
                <p>Tamaño: {perfume.size} ml / 3.4 oz</p>
                <p className="text-stone-300">
                  Colección: <span className="text-amber-400/90 italic font-medium">{perfume.coleccionEtiqueta}</span>
                </p>
              </div>

              {/* Sistema de Estrellas dinámico */}
              <div className="flex items-center gap-0.5 pt-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 mr-1.5">Rarity:</span>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={10} 
                    className={i < perfume.rareza ? "fill-amber-400 text-amber-400" : "text-stone-700"} 
                  />
                ))}
              </div>
            </div>

            {/* 3. Fila de precio y botón integrado */}
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase font-bold tracking-widest text-stone-500">Precio</p>
                <p className="text-base font-serif font-semibold text-amber-400 mt-0.5">
                  {formatDOP(perfume.price)}
                </p>
              </div>

              <button
                onClick={() => handleAddToCart(perfume)}
                className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-stone-950 border border-amber-500/40 px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 rounded-none"
              >
                Añadir <ShoppingBag size={11} strokeWidth={2.5} />
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}