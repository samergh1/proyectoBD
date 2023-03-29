import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  UilShoppingCart,
  UilSignout,
  UilPlusCircle,
} from "@iconscout/react-unicons";
import { logout } from "../../firebase/authentication/authentication";
import { useUserContext } from "../../contexts/userContext";
import { LoginViewUrl, RegisterViewUrl } from "../../constants/url";
import { SearchContext } from "../../contexts/SearchContext";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";

export function NavBar() {
  const { user, isLoadingUser } = useUserContext();
  const navigate = useNavigate();
  const { open, setOpen } = useContext(SearchContext);
  const handleLogout = async () => {
    logout();
    navigate(LoginViewUrl);
  };

  return (
    <>
      <header className="bg-gray-100 sticky top-0 z-10">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 px-6 pt-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 company-logo text-[30px]">
            <a href="#" className="-m-1.5 p-1.5 text-black">
              e-siscom
            </a>
          </div>

          {/* User Name */}
          {!isLoadingUser && !!user ? (
            <div className="flex gap-6 text-black font-bold items-center">
              {user.admin ? (
                <UilPlusCircle className="text-indigo-500 cursor-pointer" />
              ) : (
                <UilShoppingCart
                  className="text-indigo-500 cursor-pointer"
                  onClick={() => {
                    setOpen(true);
                  }}
                />
              )}
              <p>{user.name}</p>
              <div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full p-1 text-black"
                >
                  <span className="sr-only">Logout</span>
                  <UilSignout className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : null}
        </nav>
      </header>
      <ShoppingCart open={open} setOpen={setOpen} />
    </>
  );
}
