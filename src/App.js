import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import { Products, Navbar, Cart, Checkout } from "./components";
import { useFetchCart } from "./context/CartContext";
import { useFetchProducts } from "./context/ProductsContext";

const App = () => {
  const fetchProducts = useFetchProducts();
  const fetchCart = useFetchCart();

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); // Only run on render

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/">
          <Products />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
