import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";
import { UilBars, UilTimes, UilSignout } from "@iconscout/react-unicons";
import { logout } from "../../firebase/authentication/authentication";
import { useUserContext } from "../../contexts/userContext";
import { LoginViewUrl, RegisterViewUrl } from "../../constants/url";

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoadingUser } = useUserContext();
  const navigate = useNavigate();
  const { open, setOpen } = useContext(SearchContext);

  // const handleProfile = () => {
  //   if (user.isDoctor) {
  //     navigate(DoctorProfileUrl(user.uid));
  //   } else if (!user.isDoctor) {
  //     navigate(PatientProfileUrl(user.uid));
  //   }
  // };

  const handleLogout = async () => {
    logout();
    navigate(LoginViewUrl);
  };

  return (
    <>
      <header className="bg-gray-100 sticky top-0 z-1">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 px-6 pt-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 company-logo text-[30px]">
            <a href="#" className="-m-1.5 p-1.5 text-black">
              e-siscom
            </a>
          </div>

          {/* Mobile Menu Button */}
          {/* 
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          ></button>
        </div> */}

          {/* Menu Options */}
          <div className="flex gap-6 text-black font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <button
              onClick={() => {
                setOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
            <p>Paola Márquez</p>
          </div>

          {/* User Name */}
          {!isLoadingUser && !!user ? (
            <div className="flex items-center ml-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              <p>{user.name}</p>

              <div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full p-1 text-black"
                >
                  <span className="sr-only">Logout</span>
                  <UilSignout />
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden ml-6 lg:flex">
              <a href="login" className="ml-3 sm:block">
                <button
                  onclick="login"
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </a>
              <a href="register" className="sm:ml-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign up
                </button>
              </a>
            </div>
          )}
        </nav>
      </header>
      <ShoppingCart open={open} setOpen={setOpen} />
    </>
  );
}
