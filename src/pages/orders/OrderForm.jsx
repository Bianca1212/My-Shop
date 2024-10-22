import { useEffect, useState } from "react";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import { serverUrl } from "../../config";
import PropTypes from "prop-types";
import Select from "../../components/Select";
import Form from "../../components/Form";

const OrderForm = ({ getOrders }) => {
  const [orderDate, setOrderDate] = useState("");
  const [status, setStatus] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]); // Produse selectate
  const [selectedClient, setSelectedClient] = useState("");
  const [availableProducts, setAvailableProducts] = useState([]); // Produse disponibile
  const [selectedClients, setSelectedClients] = useState([]); // Clienți disponibili

  // Funcție pentru a obține produsele disponibile
  const getProducts = () => {
    fetch(`${serverUrl}/products`)
      .then((response) => response.json())
      .then((data) => setAvailableProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  // Funcție pentru a obține clienții disponibili
  const getClients = () => {
    fetch(`${serverUrl}/clients`)
      .then((response) => response.json())
      .then((data) => setSelectedClients(data))
      .catch((error) => console.error("Error fetching clients:", error));
  };

  // Obține produsele și clienții la montarea componentei
  useEffect(() => {
    getProducts();
    getClients();
  }, []);

  // Funcția pentru trimiterea comenzii
  const onSubmitOrder = (event) => {
    event.preventDefault();

    // Caută clientul selectat după ID
    const selectedClientDetails = selectedClients.find(
      (client) => client.id === selectedClient
    );

    // Asigură-te că există date pentru client
    if (!selectedClientDetails) {
      alert("Please select a valid client.");
      return;
    }

    // Extrage detalii pentru produsele selectate
    const selectedProductDetails = selectedProducts.map((selectedId) =>
      availableProducts.find((product) => product.id === selectedId)
    );

    fetch(`${serverUrl}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: selectedClient,
        clientName: selectedClientDetails.clientName,
        orderDate,
        status,
        products: selectedProductDetails.map((product) => ({
          id: product.id,
          description: product.productDescription,
          price: product.price,
        })),
      }),
    })
      .then((response) => response.json())
      .then(() => {
        // Resetează câmpurile formularului
        setSelectedClient("");
        setOrderDate("");
        setStatus("");
        setSelectedProducts([]); // Resetează produsele selectate
        getOrders(); // Reîncarcă comenzile
      })
      .catch((error) => alert(error));
  };

  // Funcția pentru a gestiona schimbările din select
  const handleSelectChange = (e) => {
    // const selectedOptions = Array.from(
    //   e.target.selectedOptions,
    //   (option) => option.id
    // );
    setSelectedProducts((prev) => [...prev, e.target.value]); // Setează array-ul de ID-uri de produse selectate
  };

  return (
    <Form
      onSubmit={onSubmitOrder}
      className="flex flex-col justify-center items-center mx-auto mt-10 p-6 gap-3 bg-yellow-200 border border-gray-300 shadow-2xl rounded-lg w-full max-w-lg transform hover:translate-y-1 hover:scale-105 transition-all duration-300"
    >
      <Select
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
        className="border-2 text-center rounded-md p-2 border-gray-700 w-full md:w-auto max-w-xs"
      >
        <option value="">Select a client</option>
        {selectedClients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.clientName}
          </option>
        ))}
      </Select>

      <Select
        multiple
        value={selectedProducts}
        onChange={handleSelectChange}
        className="border-2 text-center rounded-md p-2 border-gray-700 w-full md:w-auto max-w-xs"
      >
        <option value="">Select a product</option>
        {availableProducts.map((product) => (
          <option key={product.id} value={product.id}>
            {product.productDescription} - {product.brand}
          </option>
        ))}
      </Select>

      <Input
        name="orderDate"
        type="date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
      />

      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border-2 text-center rounded-md p-2 border-gray-700 w-full md:w-auto max-w-xs"
      >
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
        <option value="Canceled">Canceled</option>
      </Select>

      {selectedProducts.length > 0 && (
        <ul>
          {selectedProducts.map((selectedId) => {
            const product = availableProducts.find(
              (product) => product.id === selectedId
            );
            return (
              <li key={product.id}>
                Product: {product.productDescription} - Brand: {product.brand} -
                Price: {product.price}
              </li>
            );
          })}
        </ul>
      )}

      <SubmitButton>
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="3em"
          width="3em"
          className="text-gray-900 cursor-pointer"
        >
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
        </svg>
      </SubmitButton>
    </Form>
  );
};

export default OrderForm;

OrderForm.propTypes = {
  getOrders: PropTypes.func,
};
