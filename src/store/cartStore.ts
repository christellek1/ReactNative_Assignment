import { create } from 'zustand';

interface CartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i._id === item._id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i._id === item._id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  clearCart: () => set({ cart: [] }),
}));
