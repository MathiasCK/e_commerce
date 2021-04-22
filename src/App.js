import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import { Products, Navbar, Cart } from "./components";
import { useCart, useFetchCart } from "./context/CartContext";
import { useFetchProducts } from "./context/ProductsContext";

const App = () => {
  const fetchProducts = useFetchProducts();

  const cart = useCart();
  const fetchCart = useFetchCart();

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); // Only run on render

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/">
            <Products />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
