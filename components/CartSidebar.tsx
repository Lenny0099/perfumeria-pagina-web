'use client';

import { useCart } from '@/store/useCart';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartSidebar() {
  const router = useRouter();
  
  // Extraemos el estado global del carrito desde Zustand (¡Con removeItem agregado!)
  const { items: cart, isOpen, setIsOpen, updateQuantity, removeItem } = useCart();

  // Calcular el subtotal de la orden en DOP
  const subtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const formatDOP = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fondo oscuro translúcido (Overlay) con cierre al hacer clic */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-100 flex flex-col shadow-2xl">
          
          {/* ENCABEZADO DEL CARRITO */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-stone-900" />
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-900">
                Tu Bolsa ({cart.length})
              </h2>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 text-stone-400 hover:text-stone-900 transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* LISTA DE PRODUCTOS (SCROLLABLE) */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                <p className="text-xs font-light text-stone-400 italic">Tu bolsa de exclusividades está vacía.</p>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-[10px] uppercase font-bold tracking-widest text-stone-900 underline underline-offset-4"
                >
                  Continuar explorando
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex py-6 first:pt-2 group">
                  {/* Imagen del Perfume */}
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-stone-50 border border-stone-100 p-2 flex items-center justify-center">
                    <img
                      src={item.images?.[0] || ''}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Detalles del Perfume */}
                  <div className="ml-4 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          {item.brandName}
                        </span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-stone-300 hover:text-red-700 transition-colors"
                          title="Eliminar artículo"
                        >
                          <Trash2 size={12} strokeWidth={2} />
                        </button>
                      </div>
                      <h3 className="text-xs font-medium text-stone-900 tracking-tight mt-0.5">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-stone-400 font-light mt-0.5">
                        {item.size} ml
                      </p>
                    </div>

                    {/* Controles de Cantidad y Precio */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-200 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                          className="px-2 py-1 text-stone-500 hover:bg-stone-50 transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="px-2 text-xs font-medium text-stone-900 min-w-[20px] text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="px-2 py-1 text-stone-500 hover:bg-stone-50 transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      <span className="text-xs font-serif font-medium text-stone-900">
                        {formatDOP(item.price * (item.quantity || 1))}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* PANEL INFERIOR DE TOTALES */}
          {cart.length > 0 && (
            <div className="border-t border-stone-100 bg-stone-50 px-6 py-6 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Subtotal estimado</span>
                <span className="text-lg font-serif font-semibold text-stone-900">{formatDOP(subtotal)}</span>
              </div>
              
              <p className="text-[10px] text-stone-400 font-light leading-normal">
                Envíos express disponibles en el Distrito Nacional. Entregas garantizadas a todo el país.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/checkout');
                  }}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors rounded-none"
                >
                  Proceder al pago
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}