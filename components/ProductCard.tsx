'use client';

import React from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/useCart'; // <-- Importamos el store

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    size: number;
    gender: string;
    images: string[];
    brand: { name: string };
    stock?: number; // Hacemos opcional el stock por si acaso
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  // Extraemos la función de añadir al carrito desde Zustand
  const addItem = useCart((state) => state.addItem);

  const formatDOP = (amount: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita navegar a la página de detalle al pulsar el botón
    
    // Pasamos el item formateado para el carrito
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: product.size,
      images: product.images,
      brandName: product.brand.name,
      stock: product.stock ?? 10, // Si no viene stock, asumimos 10 por defecto
    });
    toast.success('Producto añadido al carrito');
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-200 hover:shadow-xl dark:border-zinc-900 dark:bg-zinc-900/50 dark:hover:border-zinc-800">
      
      <span className="absolute top-6 left-6 z-10 rounded-full bg-zinc-900/80 px-3 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur-sm uppercase dark:bg-zinc-100 dark:text-zinc-950">
        {product.gender}
      </span>

      <Link href={`/product/${product.id}`} className="block flex-1 group/link">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-950">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover/link:scale-105"
            loading="lazy"
          />
        </div>

        <div className="mt-4 flex flex-col">
          <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase dark:text-amber-500">
            {product.brand.name}
          </p>
          <h3 className="mt-1 text-base font-bold text-zinc-900 tracking-tight dark:text-white line-clamp-1 group-hover/link:text-amber-600 dark:group-hover/link:text-amber-500 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Tamaño: {product.size} ml / 3.4 oz
          </p>
        </div>
      </Link>

      <div className="mt-4 pt-4 border-t border-zinc-50 dark:border-zinc-800/50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Precio</span>
          <span className="text-lg font-extrabold text-zinc-950 dark:text-white">
            {formatDOP(product.price)}
          </span>
        </div>

        <button 
          onClick={handleAddToCart}
          className="relative z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white transition-colors hover:bg-amber-600 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-amber-500 dark:hover:text-zinc-950"
          title="Añadir al carrito"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>

    </div>
  );
}