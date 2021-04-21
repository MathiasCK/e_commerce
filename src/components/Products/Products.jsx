import { Grid } from "@material-ui/core";
import React from "react";
import Product from "./Product/Product";

import useStyles from "./products.styles";

const products = [
  {
    id: 1,
    name: "Rhoes",
    description: "Running shoes",
    price: "50$",
    image:
      "https://cdn.runrepeat.com/i/balenciaga/31210/balenciaga-triple-s-clear-sole-trainers-44ba-600.jpg",
  },
  {
    id: 2,
    name: "Macbook",
    description: "Apple macbook",
    price: "500$",
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-pro-13-og-202011?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1604347427000",
  },
];

const Products = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing="4">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
