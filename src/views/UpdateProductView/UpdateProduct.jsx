import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HomeViewUrl } from "../../constants/url";
import {
  addProduct,
  addSize,
  getProductById,
  getSizes,
  updateProduct,
  updateSize,
} from "../../firebase/products/products";

export function UpdateProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [formData, setFormData] = useState({});
  const [s, setS] = useState({});
  const [m, setM] = useState({});
  const [l, setL] = useState({});

  const getProduct = async () => {
    const result = await getProductById(productId);
    setFormData({
      name: result.name,
      cost: result.cost,
      color: result.color,
      image: result.image,
    });

    const sizes = await getSizes(productId);
    sizes.map((elem) => {
      if (elem.size === "S") {
        setS({ id: elem.id, size: elem.size, quantity: elem.quantity });
      } else if (elem.size === "M") {
        setM({ id: elem.id, size: elem.size, quantity: elem.quantity });
      } else if (elem.size === "L") {
        setL({ id: elem.id, size: elem.size, quantity: elem.quantity });
      }
    });
  };

  const onSuccess = () => {
    navigate(HomeViewUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateProduct(productId, formData);
    updateSize(productId, s.id, s);
    updateSize(productId, m.id, m);
    updateSize(productId, l.id, l);

    onSuccess();
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((oldData) => ({ ...oldData, [name]: value }));
  };

  const onChangeSize = (event) => {
    if (event.target.name === "S") {
      const { name, value } = event.target;
      setS((oldData) => ({ ...oldData, size: name, quantity: value }));
    } else if (event.target.name === "M") {
      const { name, value } = event.target;
      setM((oldData) => ({ ...oldData, size: name, quantity: value }));
    } else if (event.target.name === "L") {
      const { name, value } = event.target;
      setL((oldData) => ({ ...oldData, size: name, quantity: value }));
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <section className="bg-gray-200 dark:bg-gray-900 h-screen w-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Update a product
            </h1>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Product name"
                  required=""
                />
              </div>

              <div>
                <label
                  htmlFor="color"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  id="color"
                  value={formData.color}
                  onChange={onChange}
                  placeholder="Product color"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <div>
                <label
                  htmlFor="cost"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cost
                </label>
                <input
                  type="number"
                  name="cost"
                  id="cost"
                  value={formData.cost}
                  onChange={onChange}
                  placeholder="$50"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product image
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={onChange}
                  placeholder="Image URL"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center items-center">
              <div>
                <label
                  htmlFor="S"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Inventory (Size S)
                </label>
                <input
                  type="number"
                  name="S"
                  id="S"
                  value={s.quantity}
                  onChange={onChangeSize}
                  placeholder="100"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="M"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Inventory (Size M)
                </label>
                <input
                  type="number"
                  name="M"
                  id="M"
                  value={m.quantity}
                  onChange={onChangeSize}
                  placeholder="100"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="L"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Inventory (Size L)
                </label>
                <input
                  type="number"
                  name="L"
                  id="L"
                  value={l.quantity}
                  onChange={onChangeSize}
                  placeholder="100"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 w-full text-white hover:scale-105 transition-all hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update product
              </button>
              <button
                onClick={() => {
                  navigate(HomeViewUrl);
                }}
                className="bg-blue-500 w-full text-white hover:scale-105 transition-all hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
