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

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm();
  const { register } = methods;
  const cart = useCart();

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");

  const [shippingSubdivsions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivsion, setShippingSubdivision] = useState("");

  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  console.log("SHIPPINGOPTION", shippingOption);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivsions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((s_Option) => ({
    id: s_Option.id,
    label: `${s_Option.description} - (${s_Option.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    // [ NO, SE, DE ] ...
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubDivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);

    console.log("FROM FETCH");
    setShippingOption(options[0].id);
  };

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
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <input
              placeholder="Your firstname *"
              className="input"
              required
              {...register("firstName")}
              label="First name"
            />
            <input
              placeholder="Your lastname *"
              className="input"
              required
              {...register("lastName")}
              label="Last name"
            />
            <input
              placeholder="Your adress *"
              className="input"
              required
              {...register("address1")}
              label="Address"
            />
            <input
              placeholder="Your email adress *"
              className="input"
              required
              {...register("email")}
              label="Email"
            />
            <input
              placeholder="City *"
              className="input"
              required
              {...register("city")}
              label="City"
            />
            <input
              placeholder="ZIP *"
              className="input"
              required
              {...register("zip")}
              label="ZIP / Postal Code"
            />

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
                onChange={(e) => {
                  setShippingOption(e.target.value);
                  console.log("FROM EVENT LISTENWER");
                }}
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

const hello = {
  status_code: 422,
  error: {
    message: "The given data was invalid.",
    type: "unprocessable_entity",
    errors: {
      "fulfillment.shipping_method": ["The shipping method field is required."],
    },
  },
  help: {
    slack: "http://slack.commercejs.com",
    _comment:
      "*help* & *console* error responses will not be returned when using production/live API keys.",
  },
};

export default AddressForm;
