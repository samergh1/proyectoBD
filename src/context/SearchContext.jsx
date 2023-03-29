import React, { useEffect, useState } from "react";

export const SearchContext = React.createContext();

export function SearchContextProvider({ children }) {
  const [loading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
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
        setOpen,
        open,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
