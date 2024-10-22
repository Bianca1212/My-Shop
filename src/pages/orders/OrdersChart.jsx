import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrdersChart = ({ orders }) => {
  // Calculează câte comenzi sunt în fiecare status
  const statusCount = orders.reduce(
    (acc, order) => {
      if (order.status === "Pending") acc.pending++;
      else if (order.status === "Delivered") acc.delivered++;
      else if (order.status === "Canceled") acc.canceled++;
      return acc;
    },
    { pending: 0, shipped: 0, delivered: 0, canceled: 0 }
  );

  const data = {
    labels: ["Pending", "Delivered", "Canceled"],
    datasets: [
      {
        label: "Orders Status",
        data: [
          statusCount.pending,
          statusCount.delivered,
          statusCount.canceled,
        ],
        backgroundColor: ["#FFCE56", "#4BC0C0", "#FF6384"],
        hoverBackgroundColor: ["#FFCE56", "#4BC0C0", "#FF6384"],
      },
    ],
  };

  return (
    <>
      <h1 className="text-4xl text-center mt-10 text-gray-800">
        Orders status
      </h1>
      <div
        className="mt-20 max-w-xs mx-auto p-4 bg-gray-200 
    rounded-lg shadow-lg transform 
    transition-transform duration-300 ease-in-out hover:scale-105"
      >
        <Pie data={data} />
      </div>
    </>
  );
};

export default OrdersChart;

OrdersChart.propTypes = {
  orders: PropTypes.array,
};
