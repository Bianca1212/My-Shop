import PropTypes from "prop-types";
import { serverUrl } from "../../config";
import { useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import axios from "axios";

const Product = ({
  id,
  productDescription,
  brand,
  price,
  color,
  size,
  model,
  availability,
  getProducts,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    productDescription,
    brand,
    price,
    color,
    size,
    model,
    availability,
  });

  const closeModal = () => setIsModalOpen(false);

  const editProduct = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.patch(
        `${serverUrl}/products/${id}`,
        updatedProduct
      );
      console.log(response.data);
      getProducts();
      closeModal();
    } catch (error) {
      alert(error);
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`${serverUrl}/products/${id}`);
      console.log(response.data);
      getProducts();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <tr className="bg-white-200 border border-gray-300 md:border-none block md:table-row">
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {id}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {productDescription}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {brand}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {price}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {color}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {size}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {model}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {availability}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          <div className="flex justify-around">
            <Button onClick={() => setIsModalOpen(!isModalOpen)}>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="2em"
                width="2em"
                className="text-gray-900"
              >
                <path d="M16 2.012l3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z" />
              </svg>
            </Button>
            <Button onClick={deleteProduct}>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="2em"
                width="2em"
                className="text-gray-900"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4 8h16v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8zm3-3V3a1 1 0 011-1h8a1 1 0 011 1v2h5v2H2V5h5zm2-1v1h6V4H9zm0 8v6h2v-6H9zm4 0v6h2v-6h-2z" />
              </svg>
            </Button>
          </div>
        </td>
      </tr>
      {/* Modal pentru edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 relative">
            <Button className="absolute top-2 right-2" onClick={closeModal}>
              &times; {/* X pentru închidere */}
            </Button>
            <h2 className="text-xl font-semibold">Edit client</h2>
            <form onSubmit={editProduct}>
              <Input
                type="text"
                value={updatedProduct.productDescription}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    productDescription: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
                placeholder="Product description"
              />
              <Input
                type="text"
                value={updatedProduct.brand}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    brand: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
                placeholder="Brand"
              />
              <Input
                type="text"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
                placeholder="Price"
              />
              <Input
                type="text"
                value={updatedProduct.model}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    model: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
                placeholder="Model"
              />
              <Select
                value={updatedProduct.color}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    color: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              >
                <option value="">Choose color</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="gray">Gray</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="violet">Violet</option>
              </Select>
              <Select
                value={updatedProduct.size}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    size: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              >
                <option value="">Choose size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
              </Select>

              <Select
                value={updatedProduct.availability}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    availability: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              >
                <option value="">is Available</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
              <div className="flex justify-end mt-4">
                <Button
                  className="bg-blue-500 text-white p-2 rounded"
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  className="bg-gray-300 text-black p-2 rounded ml-2"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;

Product.propTypes = {
  id: PropTypes.string,
  productDescription: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  model: PropTypes.string,
  availability: PropTypes.string,
  getProducts: PropTypes.func,
};
