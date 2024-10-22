import { useState } from "react";
import SubmitButton from "../../components/SubmitButton";
import { serverUrl } from "../../config";
import PropTypes from "prop-types";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Form from "../../components/Form";
import axios from "axios";

const ClientForm = ({ getClients }) => {
  const [clientName, setClientName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [option, setOption] = useState("");
  const [errorName, setErrorName] = useState("");

  const handleNameChange = (event) => {
    const nameValue = event.target.value;

    // Verificăm dacă toate caracterele sunt litere folosind regex
    if (/^[A-Za-z]*$/.test(nameValue)) {
      setClientName(nameValue);
      setErrorName(""); // Resetăm eroarea dacă inputul este valid
    } else {
      setErrorName("Name must not contain numbers or special characters!");
    }
  };

  const onSubmitClient = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${serverUrl}/clients`, {
        clientName,
        emailAddress,
        clientCategory: option,
      });
      console.log(response.data);
      setClientName(() => "");
      setEmailAddress(() => "");
      setOption(() => "");
      getClients();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Form
        onSubmit={onSubmitClient}
        className="flex flex-col justify-center items-center mx-auto mt-10 p-6 gap-3 bg-orange-200 border border-gray-300 shadow-2xl rounded-lg w-full max-w-lg transform hover:translate-y-1 hover:scale-105 transition-all duration-300"
      >
        <div>
          <Input
            name="client name"
            type="text"
            placeholder="Client name"
            value={clientName}
            onChange={handleNameChange}
          />
          {errorName && <p style={{ color: "red" }}>{errorName}</p>}
        </div>
        <Input
          name="client email"
          type="text"
          placeholder="Email address"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
          className="border-2 text-center rounded-md p-2 border-gray-700 w-full md:w-auto max-w-xs"
        />
        <Select
          name="client category"
          value={option}
          onChange={(event) => setOption(event.target.value)}
          className="border-2 text-center rounded-md p-2 border-gray-700 w-full md:w-auto max-w-xs"
        >
          <option value="">Select client category</option>
          {/* Default option */}
          <option value="Self-employed">Self-employed</option>
          <option value="Company">Company</option>
        </Select>
        <SubmitButton>
          <svg
            baseProfile="tiny"
            viewBox="0 0 24 24"
            fill="currentColor"
            height="3em"
            width="3em"
            className="text-gray-900 cursor-pointer"
          >
            <path d="M9 14c1.381 0 2.631-.56 3.536-1.465C13.44 11.631 14 10.381 14 9s-.56-2.631-1.464-3.535C11.631 4.56 10.381 4 9 4s-2.631.56-3.536 1.465C4.56 6.369 4 7.619 4 9s.56 2.631 1.464 3.535A4.985 4.985 0 009 14zm0 7c3.518 0 6-1 6-2 0-2-2.354-4-6-4-3.75 0-6 2-6 4 0 1 2.25 2 6 2zm12-9h-2v-2a1 1 0 10-2 0v2h-2a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2z" />
          </svg>
        </SubmitButton>
      </Form>
    </>
  );
};

export default ClientForm;

ClientForm.propTypes = {
  getClients: PropTypes.func,
};
