import { createContext, useContext, useState } from "react";
import { commerce } from "../utils/commerce";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();

    setCart(cart);
    //setCart(await commerce.cart.retrieve())
  };

  const addToCartHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const updateCartHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const removeCartHandler = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const emptyCartHandler = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCartHandler,
        updateCartHandler,
        removeCartHandler,
        emptyCartHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

export const useCart = () => useCartContext().cart;

export const useFetchCart = () => useCartContext().fetchCart;

export const useAddToCartHandler = () => useCartContext().addToCartHandler;

export const useUpdateCartHandler = () => useCartContext().updateCartHandler;

export const useRemoveCartHandler = () => useCartContext().removeCartHandler;

export const useEmptyCartHandler = () => useCartContext().emptyCartHandler;
