import PropTypes from "prop-types";
import { serverUrl } from "../../config";
import { useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import axios from "axios";

const Order = ({
  id,
  customerName,
  products,
  price,
  orderDate,
  status,
  getOrders,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState({
    customerName,
    products,
    price,
    orderDate,
    status,
  });

  const closeModal = () => setIsModalOpen(false);

  const editOrder = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.patch(
        `${serverUrl}/orders/${id}`,
        updatedOrder
      );
      console.log(response.data);
      getOrders();
      closeModal();
    } catch (error) {
      alert(error);
    }
  };

  const deleteOrder = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.delete(`${serverUrl}/orders/${id}`);
      console.log(response.data);
      getOrders();
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
          {customerName}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {products}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {price}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {orderDate}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {status}
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
            <Button onClick={deleteOrder}>
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
      {/* Modal pentru editare */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 relative">
            <Button className="absolute top-2 right-2" onClick={closeModal}>
              &times;
            </Button>
            <h2 className="text-xl font-semibold">Edit Order</h2>
            <form onSubmit={editOrder}>
              {/* <Select
                value={updatedOrder.customerName}
                placeholder="Select a customer"
                onChange={(e) =>
                  setUpdatedOrder({
                    ...updatedOrder,
                    customerName: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              ></Select>
              <Select
                value={updatedOrder.products}
                placeholder="Select a product"
                onChange={(e) =>
                  setUpdatedOrder({
                    ...updatedOrder,
                    products: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              ></Select> */}

              <Input
                type="number"
                value={updatedOrder.price}
                onChange={(e) =>
                  setUpdatedOrder({
                    ...updatedOrder,
                    price: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
                placeholder="Price"
              />
              <Input
                type="date"
                value={updatedOrder.orderDate}
                onChange={(e) =>
                  setUpdatedOrder({
                    ...updatedOrder,
                    orderDate: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
                placeholder="Order Date"
                required
              />
              <Select
                value={updatedOrder.status}
                onChange={(e) =>
                  setUpdatedOrder({
                    ...updatedOrder,
                    status: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              >
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Canceled</option>
              </Select>
              <div className="flex justify-end mt-4">
                <Button
                  className="bg-blue-500 text-white p-2 rounded"
                  type="submit"
                >
                  Save
                </Button>
                <button
                  className="bg-gray-300 text-black p-2 rounded ml-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;

Order.propTypes = {
  id: PropTypes.string,
  customerName: PropTypes.string,
  products: PropTypes.string,
  price: PropTypes.string,
  orderDate: PropTypes.string,
  status: PropTypes.string,
  getOrders: PropTypes.func,
};
