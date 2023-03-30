import { useState } from "react";
import { Link } from "react-router-dom";
import { DetailsCard } from "../DetailsCard/DetailsCard";

export default function ProductCard({ product }) {
  const imgUrl = "https://image.tmdb.org/t/p/original";
  const [openDetail, setOpenDetail] = useState(false);
  return (
    <>
      <div
        className="group relative z-1"
        onClick={() => {
          setOpenDetail(true);
        }}
      >
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img
            // src={`${imgUrl}${movie.poster_path}`}
            src={product.image}
            // src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
            alt={product.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              {/* <Link to={MovieDetailPageUrl(movie.id)}> */}
              <span aria-hidden="true" className="absolute inset-0" />
              <p className="text-lg">{product.name}</p>
              {/* </Link> */}
            </h3>
            <p className="text-sm font-medium text-gray-900">
              Price: {product.cost}
            </p>
            <p className="text-sm text-gray-500">No se que agregar</p>
          </div>
        </div>
      </div>
      {openDetail ? (
        <DetailsCard
          openDetail={openDetail}
          setOpenDetail={setOpenDetail}
          producto={product}
        />
      ) : null}
    </>
  );
}
