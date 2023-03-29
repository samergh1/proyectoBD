import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { SearchContextProvider } from "../../contexts/SearchContext";
// import { UserContextProvider } from "../../contexts/UserContext";

export function Layout() {
  return (
    <SearchContextProvider>
      <main>
        <NavBar />

        <section className="body">
          <Outlet />
        </section>
      </main>
      //{" "}
    </SearchContextProvider>
  );
}
