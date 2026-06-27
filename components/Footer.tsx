import { useMemo } from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-stone-800 border-t border-stone-800 text-stone-400 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12 border-b border-stone-800">
          
          {/* Columna 1: Marca */}
          <div className="md:col-span-1">
            <span className="text-sm font-black tracking-[0.3em] text-stone-300 uppercase">
              Fragancia_Galan
            </span>
            <p className="mt-4 text-xs font-black text-stone-400 leading-relaxed max-w-xs">
              Curadores de alta perfumería y fragancias exclusivas en la República Dominicana. Autenticidad garantizada.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-200 mb-4">Explorar</h3>
            <ul className="space-y-2 text-xs font-black text-stone-400">
              <li><Link href="/catalogo" className="hover:text-stone-100 transition-colors">Ver Todo</Link></li>
              <li><Link href="/catalogo?q=hombre" className="hover:text-stone-100 transition-colors">Colección Hombre</Link></li>
              <li><Link href="/catalogo?q=mujer" className="hover:text-stone-100 transition-colors">Colección Mujer</Link></li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-200 mb-4">Asistencia</h3>
            <ul className="space-y-2 text-xs font-black text-stone-400">
              <li><Link href="/contacto" className="hover:text-stone-100 transition-colors">Contacto</Link></li>
              <li><Link href="/envios" className="hover:text-stone-100 transition-colors">Envíos & Entregas</Link></li>
              <li><Link href="/garantia" className="hover:text-stone-100 transition-colors">Garantía Genuina</Link></li>
            </ul>
          </div>

          {/* Columna 4: Nota de Lujo */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-200 mb-4">Boutique Sanchez Ramirez</h3>
            <p className="text-xs font-black text-stone-400 leading-relaxed">
              Envíos express disponibles en el Distrito Nacional y entregas aseguradas a todas las provincias de RD.
            </p>
          </div>

        </div>

        {/* Créditos Finales */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black tracking-wider text-stone-500 uppercase">
          <p>© {currentYear} Fragancia_Galan. Todos los derechos reservados.</p>
          <p className="font-serif italic text-stone-300">The Art of Pure Essence</p>
        </div>
      </div>
    </footer>
  );
}