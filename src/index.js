import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CartProvider } from "../src/context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { ShippingProvider } from "./context/ShippingContext";

ReactDOM.render(
  <CartProvider>
    <ProductsProvider>
      <ShippingProvider>
        <App />
      </ShippingProvider>
    </ProductsProvider>
  </CartProvider>,
  document.getElementById("root")
);
