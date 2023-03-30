import React, { useEffect, useState } from "react";
import { getAllProducts } from "../firebase/products/products";

export const SearchContext = React.createContext();

export function SearchContextProvider({ children }) {
  const [loading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [bag, setBag] = useState([]);

  const getProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        loading,
        setIsLoading,
        setOpen,
        open,
        products,
        setQuery,
        setSelectedProduct,
        selectedProduct,
        setBag,
        bag,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
