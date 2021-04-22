import { Grid } from "@material-ui/core";
import React from "react";
import { useAddToCartHandler } from "../../context/CartContext";
import { useProducts } from "../../context/ProductsContext";
import Product from "./Product/Product";

import useStyles from "./products.styles";

const Products = () => {
  const addToCart = useAddToCartHandler();
  const classes = useStyles();
  const products = useProducts();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing="4">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
