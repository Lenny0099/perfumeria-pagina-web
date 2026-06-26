export default function ProductSkeleton() {
  return (
    <div className="flex flex-col justify-between h-full animate-pulse">
      {/* Contenedor de la Imagen falsa */}
      <div className="w-full aspect-[3/4] bg-stone-100 border border-stone-200/60 relative" />
      
      {/* Textos falsos */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <div className="h-3 bg-stone-200 w-1/4 rounded-none" />
          <div className="h-2 bg-stone-100 w-1/5 rounded-none" />
        </div>
        
        <div className="h-4 bg-stone-200 w-3/4 rounded-none" />
        
        <div className="space-y-1 pt-1">
          <div className="h-2 bg-stone-100 w-full rounded-none" />
          <div className="h-2 bg-stone-100 w-5/6 rounded-none" />
        </div>
      </div>

      {/* Precio y Botón falsos */}
      <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
        <div className="h-4 bg-stone-200 w-1/3 rounded-none" />
        <div className="w-8 h-8 bg-stone-100 rounded-none" />
      </div>
    </div>
  );
}