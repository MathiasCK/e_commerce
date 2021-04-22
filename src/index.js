import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CartProvider } from "../src/context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";

ReactDOM.render(
  <CartProvider>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </CartProvider>,
  document.getElementById("root")
);
