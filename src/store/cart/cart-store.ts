import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  // Properties

  cart: CartProduct[];

  // Methods
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
}
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductCart: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce( (acc, item) => acc + item.price * item.quantity, 0);
        const tax = subTotal * 0.18;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

        return { subTotal, tax, total, itemsInCart };

      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Si el producto ya existe en el carrito, actualizar la cantidad
        const updateCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updateCartProduct });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        // console.log({ product, quantity });
        const { cart } = get();

        const updateCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }

          return item;
        });

        set({ cart: updateCartProduct });
      },

      removeProductCart: (product: CartProduct) => {
        const { cart } = get();
        const removeProduct = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: removeProduct });
      },

      clearCart: () => {
        set({ cart: [] })
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
