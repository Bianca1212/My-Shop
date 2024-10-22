import PropTypes from "prop-types";
import { serverUrl } from "../../config";
import { useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import axios from "axios";

const Client = ({
  id,
  clientName,
  emailAddress,
  clientCategory,
  getClients,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedClient, setUpdatedClient] = useState({
    clientName,
    emailAddress,
    clientCategory,
  });

  const closeModal = () => setIsModalOpen(false);

  const updateClient = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${serverUrl}/clients/${id}`,
        updatedClient
      );
      // Răspunsul de la server
      console.log(response.data);
      // Reîncarcă lista de clienți după update
      getClients(); //
      // Închide modalul după ce update-ul este complet
      closeModal();
    } catch (error) {
      alert(`Error updating client: ${error.message}`);
    }
  };

  const deleteClient = async () => {
    try {
      const response = await axios.delete(`${serverUrl}/clients/${id}`);
      console.log(response.data);
      getClients();
    } catch (error) {
      alert(error);
    }

    getClients();
  };

  return (
    <>
      <tr className="bg-white-200 border border-gray-300 md:border-none block md:table-row">
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {id}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {clientName}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {emailAddress}
        </td>
        <td className="p-2 md:border md:border-black text-center block md:table-cell font-serif">
          {clientCategory}
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
            <Button onClick={deleteClient}>
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
            <form onSubmit={updateClient}>
              <Input
                type="text"
                value={updatedClient.clientName}
                onChange={(e) =>
                  setUpdatedClient({
                    ...updatedClient,
                    clientName: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
                placeholder="Client name"
              />
              <Input
                type="text"
                value={updatedClient.emailAddress}
                onChange={(e) =>
                  setUpdatedClient({
                    ...updatedClient,
                    emailAddress: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
                placeholder="Email address"
              />
              <Select
                value={updatedClient.clientCategory}
                onChange={(e) =>
                  setUpdatedClient({
                    ...updatedClient,
                    clientCategory: e.target.value,
                  })
                }
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              >
                <option value="">Select client category</option>
                <option value="private">Self-employed</option>
                <option value="corporate">Company</option>
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

Client.propTypes = {
  id: PropTypes.string,
  clientName: PropTypes.string,
  emailAddress: PropTypes.string,
  clientCategory: PropTypes.string,
  getClients: PropTypes.func,
};

export default Client;
