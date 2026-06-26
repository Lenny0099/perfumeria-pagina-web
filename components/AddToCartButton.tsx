'use client';

import React, { useState } from 'react';
import { useCart } from '@/store/useCart';
import { toast } from 'react-hot-toast';
import { ShoppingBag } from 'lucide-react';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    size: number;     // El número original de Prisma
    stock: number;    // Requerido por tu CartItem
    brandName: string; // Requerido por tu CartItem
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setLoading(false);
    
    // Validamos si hay stock antes de operar
    if (product.stock <= 0) {
      toast.error('Lo sentimos, esta fragancia está agotada');
      return;
    }

    setLoading(true);
    
    // Enviamos el objeto con las propiedades EXACTAS que pide tu Omit<CartItem, "quantity">
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      size: product.size,
      stock: product.stock,
      brandName: product.brandName,
    });

    toast.success(`${product.name} agregado al carrito`, {
      icon: '✨',
    });
    
    setLoading(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || product.stock <= 0}
      className="mt-8 flex w-full items-center justify-center gap-3 bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-stone-800 active:scale-[0.99] disabled:bg-stone-300 disabled:text-stone-500"
    >
      <ShoppingBag size={16} strokeWidth={1.5} />
      {product.stock <= 0 ? 'Agotado' : loading ? 'Añadiendo...' : 'Añadir al Carrito'}
    </button>
  );
}