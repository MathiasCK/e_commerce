import { createContext, useContext, useState } from "react";
import { commerce } from "../utils/commerce";

const ShippingContext = createContext({});

export const ShippingProvider = ({ children }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");

  const [shippingSubdivsions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivsion, setShippingSubdivision] = useState("");

  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

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
    setShippingOption(options[0].id);
  };

  return (
    <ShippingContext.Provider
      value={{
        shippingCountry,
        shippingSubdivsion,
        shippingOption,
        shippingOptions,
        countries,
        subdivisions,
        options,
        setShippingCountry,
        setShippingSubdivision,
        setShippingOption,
        fetchShippingCountries,
        fetchSubDivisions,
        fetchShippingOptions,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};

export const useShippingContext = () => useContext(ShippingContext);

export const useSetShippingCountry = () =>
  useShippingContext().setShippingCountry;

export const useSetShippingSubdivision = () =>
  useShippingContext().setShippingSubdivision;

export const useSetShippingOption = () =>
  useShippingContext().setShippingOption;

export const useShippingCountry = () => useShippingContext().shippingCountry;

export const useShippingSubDivision = () =>
  useShippingContext().shippingSubdivsion;

export const useShippingOption = () => useShippingContext().shippingOption;

export const useShippingOptions = () => useShippingContext().shippingOptions;

export const useCountries = () => useShippingContext().countries;

export const useSudivisions = () => useShippingContext().subdivisions;

export const useOptions = () => useShippingContext().options;

export const useFetchShippingCountries = () =>
  useShippingContext().fetchShippingCountries;

export const useFetchSubDivisions = () =>
  useShippingContext().fetchSubDivisions;

export const useFetchShippingOptions = () =>
  useShippingContext().fetchShippingOptions;
