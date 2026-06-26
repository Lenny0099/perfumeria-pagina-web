'use client';

import { useState, useMemo, useEffect } from 'react';
import { useCart } from '@/store/useCart';
import { ShoppingBag, SlidersHorizontal, Sparkles } from 'lucide-react';
import ProductSkeleton from '@/components/ProductSkeleton';

// 1. BASE DE DATOS REAL DE PERFUMES (Con imágenes correspondientes y precios reales en RD)
const PERFUME_DATABASE = [
  // --- PERFUMES ÁRABES ---
  {
    id: 'ara-01',
    name: 'Club de Nuit Intense Man',
    brandName: 'Armaf',
    category: 'ARABE',
    gender: 'HOMBRE',
    price: 4600,
    size: 105,
    image: '/perfumes/club.jpg', // Foto real de la botella negra con su cadena
    description: 'El rey árabe de los cumplidos. Salida cítrica de limón y piña con un secado ahumado de maderas nobles y abedul.'
  },
  {
    id: 'ara-02',
    name: 'Khamrah',
    brandName: 'Lattafa',
    category: 'ARABE',
    gender: 'UNISEX',
    price: 3400,
    size: 100,
    image: '/perfumes/khamra.jpg', // Representación limpia licorosa/gourmand
    description: 'Gourmand espectacular e hiper-viral. Una mezcla densa de canela, praliné dulce, dátiles y un fondo cálido de vainilla.'
  },
  {
    id: 'ara-03',
    name: 'Asad',
    brandName: 'Lattafa',
    category: 'ARABE',
    gender: 'HOMBRE',
    price: 3900,
    size: 100,
    image: '/perfumes/asad.jpg', // Frasco negro con detalles dorados árabes
    description: 'Una explosión negra de especias, pimienta y tabaco dulce con un fondo de vainilla negra y ámbar de gran proyección.'
  },
  {
    id: 'ara-04',
    name: 'Yara Rose',
    brandName: 'Lattafa',
    category: 'ARABE',
    gender: 'MUJER',
    price: 3800,
    size: 100,
    image: '/perfumes/yara.jpg', // Frasco rosado característico de Yara
    description: 'El favorito de las redes. Aroma ultra femenino que evoca un batido cremoso de fresas con almizcle, orquídeas y helado de vainilla.'
  },
  // --- PERFUMES DE DISEÑADOR ---
  {
    id: 'dis-01',
    name: 'Sauvage Eau de Parfum',
    brandName: 'Dior',
    category: 'DISENADOR',
    gender: 'HOMBRE',
    price: 5100,
    size: 100,
    image: '/perfumes/sauvage.jpg', // Botella real azul degradada de Dior Sauvage
    description: 'Elegancia indomable. Bergamota de Calabria combinada con acordes misteriosos de humo, absoluto de vainilla y ambroxan.'
  },
  {
    id: 'dis-02',
    name: 'Bleu de Chanel Parfum',
    brandName: 'Chanel',
    category: 'DISENADOR',
    gender: 'HOMBRE',
    price: 11500,
    size: 100,
    image: '/perfumes/blue.jpg', // Botella real cuadrada azul oscuro de Bleu de Chanel
    description: 'La cumbre de las fragancias azules limpias. Apertura fresca e intensa que evoluciona hacia un sándalo de Nueva Caledonia majestuoso.'
  },
  {
    id: 'dis-03',
    name: 'Libre Intense',
    brandName: 'YSL',
    category: 'DISENADOR',
    gender: 'MUJER',
    price: 2900,
    size: 90,
    image: '/perfumes/libre.jpg', // Frasco geométrico con el logo dorado de YSL envuelto
    description: 'La tensión floral definitiva. Lavanda de Francia combinada con la sensualidad ardiente del azahar de Marruecos y orquídea oculta.'
  },
  {
    id: 'dis-04',
    name: 'Good Girl Eau de Parfum',
    brandName: 'Carolina Herrera',
    category: 'DISENADOR',
    gender: 'MUJER',
    price: 2900,
    size: 80,
    image: '/perfumes/girl.jpg', // Zapatilla de tacón real azul oscuro y dorado de Carolina Herrera
    description: 'Audaz y misteriosa en su icónico frasco de zapatilla de tacón. Notas sofisticadas de haba tonka, cacao profundo, jazmín y nardos.'
  },
];

export default function CatalogPage() {
  const addItem = useCart((state) => state.addItem);
  
  // Estados de Filtros e Inicialización
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'TODOS' | 'ARABE' | 'DISENADOR'>('TODOS');
  const [selectedGender, setSelectedGender] = useState<'TODOS' | 'HOMBRE' | 'MUJER' | 'UNISEX'>('TODOS');

  // Efecto controlado para el Skeleton inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Filtrado de Datos Reactivo
  const filteredProducts = useMemo(() => {
    return PERFUME_DATABASE.filter((perfume) => {
      const matchCategory = selectedCategory === 'TODOS' || perfume.category === selectedCategory;
      const matchGender = selectedGender === 'TODOS' || perfume.gender === selectedGender;
      return matchCategory && matchGender;
    });
  }, [selectedCategory, selectedGender]);

  // Formateador DOP
  const formatDOP = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado del Catálogo */}
        <div className="border-b border-stone-100 pb-8 mb-12">
          <div className="flex items-center gap-2 text-amber-700 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
            <Sparkles size={12} /> Alta Perfumería en RD
          </div>
          <h1 className="text-3xl md:text-5xl font-light text-stone-900 tracking-tight uppercase">
            Nuestra <span className="font-serif italic lowercase text-stone-400">colección</span>
          </h1>
          <p className="text-xs text-stone-500 font-light mt-3 max-w-xl leading-relaxed">
            Explora las joyas olfativas del medio oriente y las casas de diseñador más icónicas a nivel global. Autenticidad certificada con entrega inmediata.
          </p>
        </div>

        {/* BARRA DE FILTROS MINIMALISTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-stone-50 p-4 border border-stone-100 mb-12">
          
          {/* Filtro: Casa / Origen */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mr-2 flex items-center gap-1">
              <SlidersHorizontal size={10} /> Casa:
            </span>
            {(['TODOS', 'ARABE', 'DISENADOR'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? 'bg-stone-900 border-stone-900 text-white'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                }`}
              >
                {cat === 'TODOS' ? 'Ver Todos' : cat === 'ARABE' ? 'Árabes 🐪' : 'Diseñador ✨'}
              </button>
            ))}
          </div>

          {/* Filtro: Género */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mr-2">Género:</span>
            {(['TODOS', 'HOMBRE', 'MUJER', 'UNISEX'] as const).map((gen) => (
              <button
                key={gen}
                onClick={() => setSelectedGender(gen)}
                className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider transition-all ${
                  selectedGender === gen
                    ? 'text-stone-900 border-b-2 border-stone-900 font-extrabold'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                {gen.toLowerCase()}
              </button>
            ))}
          </div>

        </div>

        {/* RENDERS DE PRODUCTOS / SKELETONS */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-stone-200">
            <p className="text-sm font-light text-stone-400 italic">No encontramos fragancias con esos filtros aplicados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
            {filteredProducts.map((perfume) => (
              <div key={perfume.id} className="flex flex-col justify-between group h-full">
                
                {/* Imagen del Producto */}
                <div className="w-full aspect-[3/4] bg-stone-50 border border-stone-100 p-6 flex items-center justify-center overflow-hidden relative group-hover:border-stone-200 transition-all">
                  <span className="absolute top-3 left-3 text-[9px] bg-stone-900 text-white font-sans px-2 py-0.5 tracking-wider font-semibold uppercase">
                    {perfume.category}
                  </span>
                  
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info Textual */}
                <div className="mt-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        {perfume.brandName}
                      </span>
                      <span className="text-[9px] text-stone-400 font-light tracking-wide uppercase">
                        {perfume.size} ml / {perfume.gender.toLowerCase()}
                      </span>
                    </div>
                    
                    <h3 className="text-sm font-medium text-stone-900 tracking-tight group-hover:text-amber-800 transition-colors">
                      {perfume.name}
                    </h3>
                    
                    <p className="text-[11px] text-stone-400 font-light leading-relaxed line-clamp-2 pt-1">
                      {perfume.description}
                    </p>
                  </div>

                  {/* Precio & Acción */}
                  <div className="mt-4 pt-3 border-t border-stone-50 flex items-center justify-between">
                    <span className="text-sm font-serif font-medium text-stone-900">
                      {formatDOP(perfume.price)}
                    </span>
                    
                    <button
                      onClick={() => addItem({
                        id: perfume.id,
                        name: perfume.name,
                        price: perfume.price,
                        images: [perfume.image],
                        size: perfume.size,
                        stock: 10,
                        brandName: perfume.brandName
                      })}
                      className="p-2 border border-stone-200 text-stone-600 hover:text-white hover:bg-stone-900 hover:border-stone-900 transition-all rounded-none"
                      title="Agregar a la bolsa"
                    >
                      <ShoppingBag size={14} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}