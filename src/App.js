import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import { Products, Navbar, Cart } from "./components";

// Utils
import { commerce } from "./utils/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();

    setCart(cart);
    //setCart(await commerce.cart.retrieve())
  };

  const addToCartHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const updateCartQtyHandler = async (productId, quantity) => {
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
            <Cart
              cart={cart}
              emptyCart={emptyCartHandler}
              removeItem={removeCartHandler}
              updateItemQty={updateCartQtyHandler}
            />
          </Route>
          <Route exact path="/">
            <Products products={products} onAddToCart={addToCartHandler} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
