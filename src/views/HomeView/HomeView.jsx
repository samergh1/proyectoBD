import React, { useEffect, useState } from "react";

import ProductCart from "../../components/ProductCart/ProductCart";

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
  const [page, setPage] = useState(1);
  const [option, setOption] = useState(0);

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

  const getMovies = async (page) => {
    const { data } = await fetchMovies(page);
    setMovies(data.results);
  };

  const getUpcomingMovies = async (page) => {
    const { data } = await fetchUpcomingMovies(page);
    setMovies(data.results);
  };

  const handleCommonMovies = () => {
    if (option === 1) {
      setPage(1);
      getMovies(page);
      setOption(0);
    }
  };
  const handleUpcomingMovies = () => {
    if (option === 0) {
      setPage(1);
      getUpcomingMovies(page);
      setOption(1);
    }
  };

  useEffect(() => {
    if (option === 0) {
      getMovies(page);
    } else {
      getUpcomingMovies(page);
    }
  }, [page, option]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl pt-16  pb-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {movies.map((movie) => (
            <ProductCart movie={movie} key={movie.id} />
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
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-100"
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
              <div className="cursor-default px-3 py-2 leading-tight text-blue-600 border border-gray-300 bg-blue-50">
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
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Siguiente
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
