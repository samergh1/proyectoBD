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
  const [filterProducts, setFilterProducts] = useState([]);

  const getProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
    setIsLoading(false);
    setFilterProducts(data);
  };

  const handleSearch = (text) => {
    if (text) {
      const newData = products.filter((item) => {
        const itemData = item.name
          ? item.name.toLocaleUpperCase()
          : "".toLocaleUpperCase();
        const textData = text.toLocaleUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterProducts(newData);
    } else {
      setFilterProducts(products);
    }
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
        handleSearch,
        filterProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
