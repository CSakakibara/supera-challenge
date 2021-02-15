import { useState, createContext } from "react";

export const CartContext = createContext();

function CartContextProvider(props) {
  const [cart, setCart] = useState(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.parse(cart);
    } else {
      return [];
    }
  });

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
