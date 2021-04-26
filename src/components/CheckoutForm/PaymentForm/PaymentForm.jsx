import { Button, Divider, Typography } from "@material-ui/core";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Review from "./Review";

const PaymentForm = ({ shippingData, checkoutToken }) => {
  return (
    <>
      <Review checkoutToken={checkoutToken} />
    </>
  );
};

export default PaymentForm;
