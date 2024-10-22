import { useState, useEffect } from "react";
import Order from "./Order";
import OrderForm from "./OrderForm";
import { serverUrl } from "../../config";
import { NavigationLayout } from "../../layouts/NavigationLayout";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [sortByDateIcon, setSortByDateIcon] = useState(<FaSortUp />);
  const [sortByPriceIcon, setSortByPriceIcon] = useState(<FaSortUp />);

  const getOrders = async () => {
    try {
      const response = await axios.get(`${serverUrl}/orders`);
      console.log(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const sortOrdersByDate = () => {
    const sortedByDate = [...orders].sort((a, b) => {
      return isAscending
        ? new Date(a.orderDate) - new Date(b.orderDate)
        : new Date(b.orderDate) - new Date(a.orderDate);
    });
    setOrders(sortedByDate); // Actualizează starea cu array-ul sortat
    // console.log(sorted);
    setIsAscending(!isAscending);

    setSortByDateIcon(isAscending ? FaSortDown : FaSortUp); // Inversează direcția sortării pentru următorul click
  };

  const sortOrdersByPrice = () => {
    const sortedByPrice = [...orders].sort((a, b) => {
      return isAscending
        ? a.price - b.price // Sortare crescătoare
        : b.price - a.price; // Sortare descrescătoare
    });

    setOrders(sortedByPrice);
    setIsAscending(!isAscending); // Inversează direcția pentru următoarea sortare
    setSortByPriceIcon(isAscending ? FaSortDown : FaSortUp);
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <NavigationLayout>
      <h1 className="text-3xl text-center mt-10">Orders Page</h1>
      <OrderForm getOrders={getOrders} />
      <h2 className="text-2xl text-center mt-4">Sort options:</h2>
      <div className="flex justify-center mt-8 gap-3">
        <Button
          className="border-2 border-gray-900 bg-yellow-300 rounded-xl p-2"
          onClick={sortOrdersByPrice}
        >
          Sort by price{sortByPriceIcon}
        </Button>
        <Button
          onClick={sortOrdersByDate}
          className="border-2 border-gray-900 bg-yellow-300 rounded-xl p-2"
        >
          Sort by date{sortByDateIcon}
        </Button>
      </div>
      <Table className="table-auto mx-auto border-collapse block md:table mt-20 mb-20">
        <thead className="block md:table-header-group">
          <tr className="md:table-row">
            <th className="px-10 py-5 text-black font-bold md:border-2 md:border-black text-center bg-yellow-500">
              ID
            </th>
            <th className="px-10 py-5 text-black font-bold md:border-2 md:border-black text-center bg-yellow-500">
              Customer Name
            </th>
            <th className="px-10 py-5 text-black font-bold md:border-2 md:border-black text-center bg-yellow-500">
              Product
            </th>
            <th className="px-10 py-5 text-black font-bold md:border-2 md:border-black text-center bg-yellow-500">
              Price
            </th>
            <th className="px-10 py-5 text-black font-bold md:border-2 md:border-black text-center bg-yellow-500">
              Order Date
            </th>

            <th className="px-10 py-5 text-black font-bold md:border-2 md:border-black text-center bg-yellow-500">
              Status
            </th>
            <th className="px-10 py-5 text-black font-bold md:border-2 md:border-black text-center bg-yellow-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {orders.map((order) => (
            <Order
              id={order.id}
              key={order.id}
              customerName={order.clientName}
              // products={order.productDescription}
              price={order.price}
              orderDate={order.orderDate}
              status={order.status}
              getOrders={getOrders}
            />
          ))}
        </tbody>
      </Table>
    </NavigationLayout>
  );
};

export default OrdersPage;
