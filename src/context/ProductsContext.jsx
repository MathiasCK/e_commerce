import { createContext, useState, useContext } from "react";
import { commerce } from "../utils/commerce";

const ProductsContext = createContext({});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);

export const useProducts = () => useProductsContext().products;

export const useFetchProducts = () => useProductsContext().fetchProducts;
