'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';
import { ShieldCheck, MessageSquare, ArrowLeft } from 'lucide-react';

// Provincias de RD para el selector
const PROVINCIAS_RD = [
  'Distrito Nacional', 'Santo Domingo', 'Santiago', 'La Altagracia (Punta Cana)', 
  'San Cristóbal', 'San Pedro de Macorís', 'La Romana', 'Duarte (San Francisco)', 
  'La Vega', 'Espaillat (Moca)', 'Puerto Plata', 'Peravia (Baní)', 'Azua', 'Barahona', 'Monte Plata', 'San Juan', 'Hato Mayor', 'Samaná', 'El Seibo',
    'Valverde', 'Monseñor Nouel (Bonao)', 'Hermanas Mirabal (Salcedo)', 'Sánchez Ramírez (Cotuí)',
    'María Trinidad Sánchez (Nagua)', 'Bahoruco', 'Independencia', 'Elías Piña', 'Dajabón', 'Monte Cristi', 'Pedernales', 'Santiago Rodríguez', 'Higüey'
    
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cart, clearCart } = useCart();
  
  // Estados del Formulario
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    provincia: 'Distrito Nacional',
    direccion: '',
    metodoPago: 'Transferencia Bancaria',
  });

  // Si entran al checkout con el carrito vacío, los mandamos al catálogo
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/');
    }
  }, [cart, router]);

  const subtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const formatDOP = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency', currency: 'DOP', minimumFractionDigits: 0
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. TU NÚMERO DE WHATSAPP (Configúralo aquí sin el símbolo +)
    const WHATSAPP_NUMBER = '18097858995'; // <-- Cambia esto por tu número real de RD

    // 2. CONSTRUCCIÓN DEL MENSAJE ESTÉTICO
    let mensaje = `✨ *NUEVO PEDIDO - ESENCIA_GALAN* ✨\n\n`;
    mensaje += `👤 *Cliente:* ${formData.nombre}\n`;
    mensaje += `📞 *Teléfono:* ${formData.telefono}\n`;
    mensaje += `📍 *Ubicación:* ${formData.provincia}\n`;
    mensaje += `🏠 *Dirección:* ${formData.direccion}\n`;
    mensaje += `💳 *Método de Pago:* ${formData.metodoPago}\n\n`;
    mensaje += `🛒 *DETALLE DEL PEDIDO:*\n`;
    mensaje += `----------------------------------\n`;

    cart.forEach((item) => {
      mensaje += `▪️ ${item.quantity}x ${item.name} (${item.brandName}) [${item.size}ml]\n`;
      mensaje += `   Subtotal: ${formatDOP(item.price * item.quantity)}\n\n`;
    });

    mensaje += `----------------------------------\n`;
    mensaje += `💰 *TOTAL A PAGAR: ${formatDOP(subtotal)}*\n\n`;
    mensaje += `_Quedo a la espera de sus datos bancarios o confirmación de envío._`;

    // 3. CODIFICAR URL PARA WHATSAPP
    const encodedMessage = encodeURIComponent(mensaje);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // 4. LIMPIAR CARRITO Y REDIRIGIR
    clearCart();
    window.open(whatsappUrl, '_blank');
    router.push('/'); // Redirige al inicio tras ordenar
  };

  if (cart.length === 0) return null;

  return (
    <div className="bg-white min-h-screen pt-12 pb-24 text-stone-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Botón de Regresar */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 mb-8 transition-colors"
        >
          <ArrowLeft size={12} /> Volver a la bolsa
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-light tracking-tight uppercase">Datos de <span className="font-serif italic lowercase text-stone-400">entrega</span></h1>
              <p className="text-xs text-stone-500 font-light mt-1">Completa los campos para procesar tu orden vía WhatsApp de forma inmediata.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-2">Nombre Completo *</label>
                  <input 
                    type="text" required name="nombre" value={formData.nombre} onChange={handleInputChange}
                    className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors rounded-none"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-2">Teléfono de Contacto *</label>
                  <input 
                    type="tel" required name="telefono" value={formData.telefono} onChange={handleInputChange}
                    className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors rounded-none"
                    placeholder="Ej. 809-555-1234"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-2">Provincia *</label>
                <select 
                  name="provincia" value={formData.provincia} onChange={handleInputChange}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors rounded-none"
                >
                  {PROVINCIAS_RD.map((prov) => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-2">Dirección Exacta (Sector, Calle, No. Apto) *</label>
                <textarea 
                  required name="direccion" rows={3} value={formData.direccion} onChange={handleInputChange}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors rounded-none resize-none"
                  placeholder="Ej. Piantini, Av. Abraham Lincoln No. 45, Torre Galán, Apto 4B."
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-2">Método de Pago Preferido *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Transferencia Bancaria',
                    'Efectivo Contra Entrega (Solo DN)'
                  ].map((metodo) => (
                    <label 
                      key={metodo} 
                      className={`border p-4 flex items-center cursor-pointer transition-all ${
                        formData.metodoPago === metodo ? 'border-stone-900 bg-stone-50' : 'border-stone-200 bg-white'
                      }`}
                    >
                      <input 
                        type="radio" name="metodoPago" value={metodo} checked={formData.metodoPago === metodo} onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-xs font-medium text-stone-900">{metodo}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-[0.2em] py-4 transition-colors flex items-center justify-center gap-2 rounded-none shadow-sm"
              >
                <MessageSquare size={14} /> Confirmar pedido por WhatsApp
              </button>

              <div className="flex items-center gap-2 text-[10px] text-stone-400 font-light justify-center pt-2">
                <ShieldCheck size={12} className="text-emerald-600" /> Autenticidad 100% garantizada en cada pieza.
              </div>
            </form>
          </div>

          {/* COLUMNA DERECHA: RESUMEN DE COMPRA */}
          <div className="lg:col-span-5 bg-stone-50 border border-stone-100 p-6 md:p-8 h-fit">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 border-b border-stone-200/60 pb-4 mb-4">Resumen de la orden</h2>
            
            <div className="divide-y divide-stone-200/60 overflow-y-auto max-h-[300px] pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex py-4 first:pt-0">
                  <div className="h-16 w-14 flex-shrink-0 bg-white border border-stone-100 p-1 flex items-center justify-center">
                    <img src={item.images?.[0]} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-medium text-stone-900 line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-stone-400 font-light mt-0.5">{item.brandName} · {item.size}ml</p>
                    </div>
                    <div className="flex justify-between items-baseline text-[11px] font-light text-stone-500 mt-1">
                      <span>Cant: {item.quantity}</span>
                      <span className="font-serif font-medium text-stone-900">{formatDOP(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-4 mt-4 space-y-2">
              <div className="flex justify-between items-baseline text-xs font-light text-stone-500">
                <span>Envío</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Calculado al coordinar</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-dashed border-stone-200">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">Total</span>
                <span className="text-xl font-serif font-semibold text-stone-900">{formatDOP(subtotal)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}