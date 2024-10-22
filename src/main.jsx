import { StrictMode } from "react";
import App from "./App.jsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientsPage from "./pages/clients/ClientsPage.jsx";
import ProductsPage from "./pages/products/ProductsPage.jsx";
import OrdersPage from "./pages/orders/OrdersPage.jsx";
import TestPage from "./pages/test/TestPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/clients", element: <ClientsPage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/orders", element: <OrdersPage /> },
  { path: "/test", element: <TestPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
