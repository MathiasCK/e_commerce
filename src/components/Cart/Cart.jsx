import { Container, Typography, Button, Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./cart.styles";
import CartItem from "./CartItem/CartItem";

const Cart = ({ cart, emptyCart, removeItem, updateItemQty }) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart
      <Link to="/" className={classes.link}>
        Start adding some!
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((cartItem) => (
          <Grid item xs={12} sm={4} key={cartItem.id}>
            <CartItem
              updateItemQty={updateItemQty}
              removeItem={removeItem}
              cartItem={cartItem}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cartDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            onClick={emptyCart}
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Go To Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return <div>Loading ....</div>;

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
