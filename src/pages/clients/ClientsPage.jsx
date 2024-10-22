import { useEffect, useState } from "react";
import { NavigationLayout } from "../../layouts/NavigationLayout";
import ClientForm from "./ClientForm";
import Client from "./Client";
import { serverUrl } from "../../config";
import Table from "../../components/Table";
import axios from "axios";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    try {
      const response = await axios.get(`${serverUrl}/clients`);
      setClients(() => response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <NavigationLayout>
        <h1 className="text-3xl text-center mt-10">Clients Page</h1>
        <ClientForm getClients={getClients} />

        <Table className="table-auto mx-auto border-collapse block md:table mt-20 mb-20">
          <thead className="block md:table-header-group">
            <tr className="md:table-row">
              <th className="px-10 py-5 text-black font-bold md:border-2 md:border-black text-center bg-orange-600">
                ID
              </th>
              <th className="px-10 py-5 text-black font-bold md:border-2 md:border-black text-center bg-orange-600">
                Name
              </th>
              <th className="px-10 py-5 text-black font-bold md:border-2 md:border-black text-center bg-orange-600">
                Email
              </th>
              <th className="px-10 py-5 text-black font-bold md:border-2 md:border-black text-center bg-orange-600">
                Category
              </th>
              <th className="px-10 py-5 text-black font-bold md:border-2 md:border-black text-center bg-orange-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {clients.map((client) => (
              <Client
                id={client.id}
                key={client.id}
                clientName={client.clientName}
                emailAddress={client.emailAddress}
                clientCategory={client.clientCategory}
                getClients={getClients}
              />
            ))}
          </tbody>
        </Table>
      </NavigationLayout>
    </>
  );
};

export default ClientsPage;
