import React, { useContext } from "react";
import { Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { UilStar, UilTimes } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { HomeViewUrl, UpdateProductUrl } from "./../../constants/url";
import { useUserContext } from "../../contexts/userContext";
import { toast, Toaster } from "react-hot-toast";
import { UpdateProduct } from "../../views/UpdateProductView/UpdateProduct";
import { deleteProduct, getSizes } from "../../firebase/products/products";
import { arrayUnion } from "@firebase/firestore";
import { SearchContext } from "../../contexts/SearchContext";
const product = {
  name: "Basic Tee 6-Pack ",
  cost: "$192",
  href: "#",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
  imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export function DetailsCard({ openDetail, setOpenDetail, producto }) {
  // const sizes = await getSizes(producto.id)
  const { bag, setBag } = useContext(SearchContext);
  const [search, setSearch] = useState(false);
  const [sizes, setSizes] = useState([]);
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async function handleCart() {
    const qty = await getSizes(producto.id);
    setSizes(qty);
    const productData = {
      id: producto.id,
      name: producto.name,
      cost: producto.cost,
      image: producto.image,
      qty: qty,
    };

    setBag((bag) => bag.concat(productData));
    await timeout(1000);
    toast.success("Added to your cart :)");
    await timeout(1000);
    setOpenDetail(false);
  }

  async function handleDelete() {
    deleteProduct(producto.id);
    await timeout(1000);
    toast.success("Product deleted successfully");
    await timeout(1000);
    setOpenDetail(false);
  }

  const handleEdit = () => {
    navigate(UpdateProductUrl(producto.id));
  };

  const { user, isLoadingUser } = useUserContext();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const navigate = useNavigate();

  return (
    <div>
      <Toaster />
      <Transition.Root show={openDetail} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenDetail}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center h-full overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                      onClick={() => {
                        setOpenDetail(false);
                        navigate(HomeViewUrl);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <UilTimes className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-w-2 h-full overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img
                          src={producto.image}
                          alt={producto.name}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                          {producto.name}
                        </h2>

                        <section
                          aria-labelledby="information-heading"
                          className="mt-2"
                        >
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          <p className="text-2xl text-gray-900">
                            ${producto.cost}
                          </p>
                        </section>

                        <section
                          aria-labelledby="options-heading"
                          className="mt-10"
                        >
                          <div>
                            {/* Colors */}
                            <div className="flex gap-8">
                              <h4 className="text-xl font-bold text-gray-900">
                                Color:
                              </h4>
                              <h4 className="text-lg font-medium text-gray-900">
                                {producto.color}
                              </h4>
                            </div>
                            {/* Sizes */}
                            <div className="mt-10">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xl font-bold text-gray-900">
                                  Size
                                </h4>
                              </div>
                              {sizes.map((s) => {
                                console.log(s.size);
                              })}
                              {/* <RadioGroup
                                value={selectedSize}
                                onChange={setSelectedSize}
                                className="mt-4"
                              >
                                <RadioGroup.Label className="sr-only">
                                  {" "}
                                  Choose a size{" "}
                                </RadioGroup.Label>
                                <div className="grid grid-cols-4 gap-4">
                                  {sizes.map((size) => (
                                    <RadioGroup.Option
                                      // key={size.name}
                                      value={size}
                                      disabled={size.qty <= 0}
                                      className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                                      // className={({ active }) =>
                                      //   classNames(
                                      //     {size.qty <= 0}
                                      //       ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                      //       : "cursor-not-allowed bg-gray-50 text-gray-200",
                                      //     active
                                      //       ? "ring-2 ring-indigo-500"
                                      //       : "",
                                      //     "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                                      //   )
                                      // }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <RadioGroup.Label as="span">
                                            {size.name}
                                          </RadioGroup.Label>
                                          {size.inStock ? (
                                            <span
                                              className={classNames(
                                                active ? "border" : "border-2",
                                                checked
                                                  ? "border-indigo-500"
                                                  : "border-transparent",
                                                "pointer-events-none absolute -inset-px rounded-md"
                                              )}
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            <span
                                              aria-hidden="true"
                                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                            >
                                              <svg
                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                viewBox="0 0 100 100"
                                                preserveAspectRatio="none"
                                                stroke="currentColor"
                                              >
                                                <line
                                                  x1={0}
                                                  y1={100}
                                                  x2={100}
                                                  y2={0}
                                                  vectorEffect="non-scaling-stroke"
                                                />
                                              </svg>
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup> */}
                            </div>

                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  !user.admin ? handleCart() : handleDelete();
                                }}
                                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                {user.admin ? "Delete" : "Add to bag"}
                              </button>
                              {user.admin ? (
                                <button
                                  onClick={handleEdit}
                                  className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  Edit
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
