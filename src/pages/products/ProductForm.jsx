import { useState } from "react";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import { serverUrl } from "../../config";
import Select from "../../components/Select";
import Form from "../../components/Form";
import PropTypes from "prop-types";
import axios from "axios";

const ProductForm = ({ getProducts }) => {
  const [productDescription, setProductDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [colorOption, setColorOption] = useState("");
  const [sizeOption, setSizeOption] = useState("");
  const [model, setModel] = useState("");
  const [availabilityOption, setAvailabilityOption] = useState("");

  const onSubmitProduct = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${serverUrl}/products`, {
        productDescription,
        brand,
        price,
        color: colorOption,
        size: sizeOption,
        model,
        availability: availabilityOption,
      });
      console.log(response.data);
      setProductDescription(() => "");
      setBrand(() => "");
      setPrice(() => "");
      setColorOption(() => "");
      setSizeOption(() => "");
      setModel(() => "");
      setAvailabilityOption(() => "");
      getProducts();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Form
        onSubmit={onSubmitProduct}
        className="flex flex-col justify-center items-center mx-auto mt-10 p-6 gap-3 bg-indigo-200 border border-gray-300 shadow-2xl rounded-lg w-full max-w-lg transform hover:translate-y-1 hover:scale-105 transition-all duration-300"
      >
        <Input
          name="product description"
          type="text"
          placeholder="Product description"
          value={productDescription}
          onChange={(event) => setProductDescription(event.target.value)}
        />
        <Input
          name="brand"
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        />
        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <Input
          name="model"
          type="text"
          placeholder="Model"
          value={model}
          onChange={(event) => setModel(event.target.value)}
        />
        <Select
          name="color"
          value={colorOption}
          onChange={(event) => setColorOption(event.target.value)}
          className="border-2 text-center rounded-md p-2 border-gray-700 w-full md:w-auto max-w-xs"
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
          name="size"
          value={sizeOption}
          onChange={(event) => setSizeOption(event.target.value)}
          className="border-2 text-center rounded-md p-2 border-gray-700 w-full md:w-auto max-w-xs"
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
          name="availability"
          value={availabilityOption}
          onChange={(event) => setAvailabilityOption(event.target.value)}
          className="border-2 text-center rounded-md p-2 border-gray-700 w-full md:w-auto max-w-xs"
        >
          <option value="">Is available</option>
          {/* Default option */}
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
        <SubmitButton>
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="3em"
            width="3em"
            className="text-gray-900 cursor-pointer"
          >
            <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224h-64v64a16 16 0 01-32 0v-64h-64a16 16 0 010-32h64v-64a16 16 0 0132 0v64h64a16 16 0 010 32z" />
          </svg>
        </SubmitButton>
      </Form>
    </>
  );
};

export default ProductForm;

ProductForm.propTypes = {
  getProducts: PropTypes.func,
};
