import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import React from "react";

import useStyles from "./cart-item-styles";

const CartItem = ({ cartItem }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        image={cartItem.media.source}
        alt={cartItem.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{cartItem.name}</Typography>
        <Typography variant="h5">
          {cartItem.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small">
            -
          </Button>
          <Typography>{cartItem.quantity}</Typography>
          <Button type="button" size="small">
            +
          </Button>
        </div>
        <Button variant="contained" type="button" color="secondary">
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
