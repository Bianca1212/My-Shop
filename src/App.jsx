import { useEffect, useState } from "react";
import OrdersChart from "./pages/orders/OrdersChart"; // Asigură-te că calea e corectă
import { serverUrl } from "./config"; // Importă URL-ul serverului
import { NavigationLayout } from "./layouts/NavigationLayout";

function App() {
  const [orders, setOrders] = useState([]);

  // Funcția care preia comenzile de la server
  const getOrders = () => {
    fetch(`${serverUrl}/orders`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  // Preia comenzile atunci când componenta este montată
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <NavigationLayout>
        <div className="App">
          <header className="App-header"></header>
          <div className="chart-container">
            {/* Afișează graficul pe baza comenzilor */}
            <OrdersChart orders={orders} />
          </div>
        </div>
      </NavigationLayout>
    </div>
  );
}

export default App;
