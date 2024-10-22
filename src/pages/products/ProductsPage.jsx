import { useEffect, useState } from "react";
import { NavigationLayout } from "../../layouts/NavigationLayout";
import ProductForm from "./ProductForm";
import { serverUrl } from "../../config";
import Product from "./Product";
import Table from "../../components/Table";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${serverUrl}/products`);
      setProducts(() => response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {/* <div className="bg-gray-100"> */}
      <NavigationLayout>
        <ProductForm getProducts={getProducts} />

        <Table className="table-auto mx-auto border-collapse block md:table mt-20 mb-20">
          <thead className="block md:table-header-group">
            <tr className="md:table-row">
              <th className="px-10 py-5 text-white font-bold md:border-2 md:border-black text-center bg-indigo-800">
                ID
              </th>
              <th className="px-10 py-5 text-white font-bold md:border-2 md:border-black text-center bg-indigo-800">
                Description
              </th>
              <th className="px-10 py-5 text-white font-bold md:border-2 md:border-black text-center bg-indigo-800">
                Brand
              </th>
              <th className="px-10 py-5 text-white font-bold md:border-2 md:border-black text-center bg-indigo-800">
                Price
              </th>
              <th className="px-10 py-5 text-white font-bold md:border-2 md:border-black text-center bg-indigo-800">
                Color
              </th>
              <th className="px-10 py-5 text-white font-bold md:border-2 md:border-black text-center bg-indigo-800">
                Size
              </th>
              <th className="px-10 py-5 text-white font-bold md:border-2 md:border-black text-center bg-indigo-800">
                Model
              </th>
              <th className="px-10 py-5 text-white font-bold md:border-2 md:border-black text-center bg-indigo-800">
                Availability
              </th>
              <th className="px-10 py-5 text-white font-bold md:border-2 md:border-black text-center bg-indigo-800">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {products.map((product) => (
              <Product
                id={product.id}
                key={product.id}
                productDescription={product.productDescription}
                brand={product.brand}
                price={product.price}
                color={product.color}
                size={product.size}
                model={product.model}
                availability={product.availability}
                getProducts={getProducts}
              />
            ))}
          </tbody>
        </Table>
      </NavigationLayout>
      {/* </div> */}
    </>
  );
};

export default ProductsPage;
