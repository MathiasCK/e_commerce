import {
  AppBar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/commerce.png";
import { useCart } from "../../context/CartContext";

import useStyles from "./navbar.styles";

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();

  const cart = useCart();
  const totalItems = cart.total_items;

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            Commerce.js
          </Typography>
          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
