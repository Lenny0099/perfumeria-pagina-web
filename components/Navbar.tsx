'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/store/useCart';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const totalItems = useCart((state) => state.getTotalItems());

  useEffect(() => { setMounted(true); }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('searchQuery');
    if (query && String(query).trim().length > 0) {
      router.push(`/catalogo?q=${encodeURIComponent(String(query).trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* LOGO - Más minimalista */}
          <div className="flex items-center">
            <Link href="/" className="group">
              <span className="text-xl font-black tracking-[0.2em] text-stone-900 uppercase transition-colors group-hover:text-amber-700">
                Fragancia_Galan<span className="font-black text-stone-400"></span>
              </span>
            </Link>
          </div>

          {/* NAVEGACIÓN ÚNICA - Solo Catálogo */}
          <div className="hidden md:flex items-center gap-12">
            <Link href="/catalogo" className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500 transition-colors hover:text-stone-900">
              Colecciones
            </Link>
            <Link href="/catalogo?q=hombre" className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500 transition-colors hover:text-stone-900">
              Hombre
            </Link>
            <Link href="/catalogo?q=mujer" className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500 transition-colors hover:text-stone-900">
              Mujer
            </Link>
          </div>

          {/* ACCIONES */}
          <div className="flex items-center gap-6">
            <div className="relative flex items-center">
              {searchOpen && (
                <form onSubmit={handleSearch} className="absolute right-10 sm:w-64 animate-in fade-in slide-in-from-right-4">
                  <input
                    name="searchQuery"
                    type="text"
                    placeholder="Buscar fragancia..."
                    className="w-full rounded-none border-b border-stone-900 bg-transparent py-1 text-sm outline-none placeholder-stone-300"
                    autoFocus
                  />
                </form>
              )}
              <button onClick={() => setSearchOpen(!searchOpen)} className="text-stone-900 hover:text-amber-600 transition-colors">
                <Search size={20} strokeWidth={1.5} />
              </button>
            </div>

            <Link href="/carrito" className="relative text-stone-900 hover:text-amber-600 transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}