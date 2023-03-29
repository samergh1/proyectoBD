import React, { useEffect, useState } from "react";

export const SearchContext = React.createContext();

export function SearchContextProvider({ children }) {
  const [loading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState([]);
  //   const getProducts = async () => {
  //     const data = await getProducts();
  //     setProducts(data);
  //   };

  //   useEffect(() => {
  //     getProducts();
  //   }, []);

  return (
    <SearchContext.Provider
      value={{
        loading,
        setIsLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
