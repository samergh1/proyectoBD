import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
// import { UserContextProvider } from "../../contexts/UserContext";

export function Layout() {
  return (
    // <UserContextProvider>
    <main>
      <NavBar />

      <section className="body">
        <Outlet />
      </section>
    </main>
    // </UserContextProvider>
  );
}
