import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../FormInput";

import { commerce } from "../../../utils/commerce";

const AddressForm = ({ checkoutToken }) => {
  const methods = useForm();

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivsions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivsion, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOptionn] = useState("");

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);

    // [ NO, SE, DE ] ...
    setShippingCountry(Object.keys(countries)[0]);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Adress
      </Typography>
      <FormProvider {...methods}>
        <form>
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
            {/*
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </Select>
            </Grid>*/}
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
