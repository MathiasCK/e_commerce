import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../FormInput";
import { Link } from "react-router-dom";

import { commerce } from "../../../utils/commerce";
import { useCart } from "../../../context/CartContext";
import {
  useCountries,
  useFetchShippingCountries,
  useFetchShippingOptions,
  useFetchSubDivisions,
  useOptions,
  useSetShippingOption,
  useSetShippingSubdivision,
  useShippingCountry,
  useShippingOption,
  useShippingOptions,
  useShippingSubDivision,
  useSudivisions,
} from "../../../context/ShippingContext";

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm();
  const cart = useCart();

  const shippingCountry = useShippingCountry();
  const shippingSubdivsion = useShippingSubDivision();
  const shippingOption = useShippingOption();
  const shippingOptions = useShippingOptions();

  const setShippingCountry = useShippingCountry();
  const setShippingSubdivision = useSetShippingSubdivision();
  const setShippingOption = useSetShippingOption();

  const countries = useCountries();
  const subdivisions = useSudivisions();
  const options = useOptions();

  const fetchShippingCountries = useFetchShippingCountries();
  const fetchSubDivisions = useFetchSubDivisions();
  const fetchShippingOptions = useFetchShippingOptions();

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubDivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivsion)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivsion
      );
  }, [shippingSubdivsion]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Adress
      </Typography>

      <FormProvider {...methods}>
        {/* Send data back to checkout */}
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivsion,
              shippingOptions,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="adress1" label="Adress" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="ZIP / Postal Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivsion}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back To Cart
            </Button>
            <Typography variant="h6">
              Your total is: {cart.subtotal.formatted_with_symbol}
            </Typography>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
