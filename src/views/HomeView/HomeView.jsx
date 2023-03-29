import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { LoginViewUrl } from "../../constants/url";
import { useUserContext } from "../../contexts/userContext";
import { logout } from "../../firebase/authentication/authentication";
import ProductCard from "../../components/ProductCard/ProductCard";

const movies = [
  {
    id: 1,
    title: "Camisa",
    popularity: "sdasd",
    original_language: "asddafsf",
  },
  {
    id: 2,
    title: "Pantalon",
    popularity: "sdasd",
    original_language: "asddafsf",
  },
  {
    id: 3,
    title: "sad",
    popularity: "sdasd",
    original_language: "asddafsf",
  },
  {
    id: 4,
    title: "dress",
    popularity: "sdasd",
    original_language: "asddafsf",
  },
  {
    id: 9,
    title: "dress",
    popularity: "sdasd",
    original_language: "asddafsf",
  },
  {
    id: 6,
    title: "dress",
    popularity: "sdasd",
    original_language: "asddafsf",
  },
];

export function HomeView() {
  const navigate = useNavigate();
  const { user, isLoadingUser } = useUserContext();
  const [page, setPage] = useState(1);
  const [option, setOption] = useState(0);

  const handleLogout = async () => {
    logout();
    navigate(LoginViewUrl);
  };

  const handlePrev = () => {
    setPage(page - 1);
    if (option === 0) {
      getMovies(page);
    } else {
      getUpcomingMovies(page);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
    if (option === 0) {
      getMovies(page);
    } else {
      getUpcomingMovies(page);
    }
  };

  // const getMovies = async (page) => {
  //   const { data } = await fetchMovies(page);
  //   setMovies(data.results);
  // };

  // const handleCommonMovies = () => {
  //   if (option === 1) {
  //     setPage(1);
  //     getMovies(page);
  //     setOption(0);
  //   }
  // };

  useEffect(() => {
    // if (option === 0) {
    //   getMovies(page);
    // } else {
    //   getUpcomingMovies(page);
    // }
  }, [page, option]);

  return (
    <>
      <div className="flex justify-center pt-10 z-1">
        <div className="mb-3 xl:w-96">
          <div className="relative flex w-full flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
            />
            <button
              className="relative z-[2] flex items-center rounded-r bg-primary bg-indigo-600 px-6 py-2.5 text-xs hover:bg-indigo-800 font-medium uppercase border border-neutral-500 leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              id="button-addon1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl pt-4  pb-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className=" font-sans text-xl font-semibold">Products</h1>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {movies.map((movie) => (
              <ProductCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
        <div className="gap-3 sm:gap-0 float-center">
          {/* Pages */}
          <div className="flex gap-4 justify-center items-center py-5 px-10 ">
            <ul className="inline-flex -space-x-px items-center">
              <li>
                <button
                  disabled={page === 1}
                  onClick={handlePrev}
                  className="px-3 py-2 ml-0 leading-tight text-gray-700 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-300 hover:text-gray-700 disabled:bg-gray-100"
                >
                  Anterior
                </button>
              </li>
              {page >= 2 ? (
                <li>
                  <div className="cursor-default px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300">
                    {page - 1}
                  </div>
                </li>
              ) : null}
              <li>
                <div className="cursor-default px-3 py-2 leading-tight text-indigo-500 border border-gray-300 bg-blue-50">
                  {page}
                </div>
              </li>
              <li>
                <div className="cursor-default px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300">
                  {page + 1}
                </div>
              </li>
              <li>
                <button
                  onClick={handleNext}
                  className="px-3 py-2 leading-tight text-white bg-indigo-600 border border-gray-300 rounded-r-lg hover:bg-indigo-800 hover:text-white "
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
