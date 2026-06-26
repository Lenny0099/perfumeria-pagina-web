import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  images: string[];
  size: number;
  stock: number;
  brandName: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean; // <-- AGREGADO
  setIsOpen: (open: boolean) => void; // <-- AGREGADO
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void; // <-- AGREGADO
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false, // <-- Inicialmente cerrado
      setIsOpen: (open) => set({ isOpen: open }), // <-- Función para abrir/cerrar
      
      addItem: (product) => set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            isOpen: true, // Opcional: Abre el carrito automáticamente al añadir
          };
        }
        return { 
          items: [...state.items, { ...product, quantity: 1 }],
          isOpen: true // Opcional: Abre el carrito automáticamente al añadir
        };
      }),

      // El removeItem original resta de 1 en 1, lo dejamos igual
      removeItem: (id) => set((state) => ({
        items: state.items
          .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0),
      })),

      // AGREGADO: Para actualizar la cantidad directamente (ej: desde los botones + y - del panel)
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items
          .map((item) => (item.id === id ? { ...item, quantity: quantity } : item))
          .filter((item) => item.quantity > 0),
      })),

      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    { name: 'perfumestore-cart' }
  )
);