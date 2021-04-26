import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import { commerce } from "../../../utils/commerce";

import AddressForm from "../AddressForm/AddressForm";
import PaymentForm from "../PaymentForm/PaymentForm";

import useStyles from "./checkout.styles";

const steps = ["Shipping adress", "Payment details"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const cart = useCart();
  const [shippingData, setShippingData] = useState();

  const [checkoutToken, setCheckoutToken] = useState(null);

  // Genereate token for adress form
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {
        console.log(error.message);
      }
    };
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const backStep = () => setActiveStep((prev) => prev - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Confirmation = () => <div>Confirmed</div>;

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} />
    );

  return (
    <div>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* If we're on the last step */}
          {activeStep === steps.length ? (
            <Confirmation />
          ) : !checkoutToken ? (
            <div>Loading Form ...</div>
          ) : (
            <Form />
          )}
        </Paper>
      </main>
    </div>
  );
};

export default Checkout;
