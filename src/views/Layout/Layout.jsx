import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { ShoppingCart } from "../../components/ShoppingCart/ShoppingCart";
import {
  SearchContext,
  SearchContextProvider,
} from "../../context/SearchContext";
// import { UserContextProvider } from "../../contexts/UserContext";

export function Layout() {
  return (
    // <SearchContextProvider>
    <main>
      {/* <ShoppingCart open={open} setOpen={setOpen} /> */}
      <NavBar />

      <section className="body">
        <Outlet />
      </section>
    </main>
    // </SearchContextProvider>
  );
}
