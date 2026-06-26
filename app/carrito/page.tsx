'use client';

import Link from 'next/link';
import { useCart } from '@/store/useCart';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { items, addItem, removeItem, clearCart } = useCart();

  // Calcular el total general
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Formateador de moneda dominicana
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
    }).format(price);
  };

  // Función maestra: Generar el enlace de WhatsApp con el pedido estructurado
  const handleWhatsAppCheckout = () => {
    const phoneNumber = '18295551234'; // 🇩🇴 REEMPLAZA CON TU NÚMERO REAL DE WHATSAPP (sin el +)
    
    let message = `✨ *NUEVO PEDIDO - PERFUMESTORE RD* ✨\n\n`;
    message += `Hola, me interesa concretar la compra de los siguientes artículos:\n\n`;

    items.forEach((item) => {
      message += `▪️ *${item.name}* (${item.brandName})\n`;
      message += `   Cant: ${item.quantity} x ${formatPrice(item.price)}\n`;
      message += `   Formatos/Size: ${item.size} ml\n\n`;
    });

    message += `──────────────────\n`;
    message += `💰 *Total Estimado:* ${formatPrice(total)}\n\n`;
    message += `📍 _Por favor, indíquenme disponibilidad para coordinar el envío (Santo Domingo / Interior)._`;

    // Codificamos el texto para que sea una URL válida
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir en pestaña nueva
    window.open(whatsappUrl, '_blank');
  };

  // Estado: Carrito Vacío
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-white flex flex-col items-center justify-center px-4">
        <ShoppingBag size={48} strokeWidth={1} className="text-stone-300 mb-4" />
        <h1 className="text-xl font-light text-stone-900 tracking-wide uppercase">Tu bolsa está vacía</h1>
        <p className="text-xs text-stone-400 font-light mt-2 mb-8 text-center max-w-xs">
          Explora nuestras colecciones exclusivas y atomizadores de viaje para añadir esencias.
        </p>
        <Link 
          href="/catalogo" 
          className="bg-stone-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-3.5 hover:bg-stone-800 transition-colors"
        >
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24 pt-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="flex justify-between items-end border-b border-stone-100 pb-6">
          <div>
            <Link href="/catalogo" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors mb-2">
              <ArrowLeft size={12} /> Continuar explorando
            </Link>
            <h1 className="text-2xl font-light tracking-tight text-stone-900 uppercase">Tu Bolsa de Compras</h1>
          </div>
          <button 
            onClick={clearCart}
            className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-red-600 transition-colors"
          >
            Vaciar bolsa
          </button>
        </div>

        {/* LISTA DE PRODUCTOS */}
        <div className="mt-8 space-y-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-4 sm:gap-6 border-b border-stone-50 pb-6"
            >
              {/* Imagen Miniatura */}
              <div className="w-20 h-24 bg-stone-50 border border-stone-100 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                <img 
                  src={item.images?.[0] || 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=200'} 
                  alt={item.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              </div>

              {/* Detalles del Producto */}
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400 block">
                  {item.brandName}
                </span>
                <h3 className="text-sm font-medium text-stone-900 truncate">
                  {item.name}
                </h3>
                <p className="text-[11px] text-stone-400 font-light mt-0.5">
                  Tamaño: {item.size} ml
                </p>
                <p className="text-xs font-serif text-stone-900 mt-2 sm:hidden">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>

              {/* Controles de Cantidad */}
              <div className="flex items-center border border-stone-200 bg-white">
                <button 
                  onClick={() => removeItem(item.id)} // Zustand asume restar o remover si llega a 0
                  className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="px-2 text-xs font-medium text-stone-800 min-w-[20px] text-center">
                  {item.quantity}
                </span>
                <button 
                  onClick={() => addItem(item)} // Zustand aumenta el conteo automáticamente
                  className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Precio Total por Item (Escritorio) */}
              <div className="hidden sm:block text-right min-w-[100px]">
                <p className="text-sm font-serif text-stone-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RESUMEN DEL PEDIDO */}
        <div className="mt-12 bg-stone-50 p-6 border border-stone-100">
          <div className="flex justify-between items-baseline pb-4 border-b border-stone-200/60">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-800">Subtotal del Pedido</span>
            <span className="text-xl font-serif text-stone-900">{formatPrice(total)}</span>
          </div>
          
          <div className="mt-3 text-[11px] text-stone-400 font-light leading-relaxed">
            💡 *Nota boutique:* Los envíos se gestionan de inmediato de forma interna en Santo Domingo y vía agencias logísticas exprés al resto del país. Al presionar el botón inferior, coordinarás el método de entrega y pago directamente en nuestro canal de atención.
          </div>

          {/* BOTÓN MAESTRO DE CHECKOUT */}
          <button
            onClick={handleWhatsAppCheckout}
            className="mt-6 w-full bg-stone-900 text-white py-4 text-xs font-bold uppercase tracking-[0.2em] text-center hover:bg-stone-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            Confirmar Pedido vía WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}