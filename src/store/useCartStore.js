import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      
      addItem: (item) => {
        set((state) => {
          // Check if item already exists in cart
          const exists = state.items.some((i) => i.id === item.id);
          if (exists) return state;
          
          return { items: [...state.items, item] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id)
        }));
      },

      setItems: (items) => {
        set({ items });
      },

      clearCart: () => {
        set({ items: [], coupon: null });
      },

      applyCoupon: (couponCode) => {
        set({ coupon: couponCode });
      },
      
      removeCoupon: () => {
        set({ coupon: null });
      },

      // Computed value for total (can be derived in components as well)
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price || 0), 0);
      }
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
    }
  )
);
