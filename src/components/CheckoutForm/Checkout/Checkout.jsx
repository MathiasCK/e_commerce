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

import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import {
  useCart,
  useErrorMessage,
  useHandleCaptureCheckout,
  useOrder,
} from "../../../context/CartContext";
import { commerce } from "../../../utils/commerce";

import AddressForm from "../AddressForm/AddressForm";
import PaymentForm from "../PaymentForm/PaymentForm";

import useStyles from "./checkout.styles";

const steps = ["Shipping adress", "Payment details"];

const Checkout = () => {
  const classes = useStyles();
  const cart = useCart();
  const error = useErrorMessage();
  const order = useOrder();
  const captureCheckout = useHandleCaptureCheckout();

  const [activeStep, setActiveStep] = useState(0);
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

  let Confirmation = () =>
    order.customer ? ( // If it exists
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference})
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to home
      </Button>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        onCaptureCheckout={captureCheckout}
      />
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
