import { useEffect, useState } from "react";
import { NavigationLayout } from "../../layouts/NavigationLayout";
import { TestProduct } from "./TestProduct";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import axios from "axios";
const TestPage = () => {
  const [products, setProducts] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [sortByPriceIcon, setSortByPriceIcon] = useState(<FaSortUp />);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);

    if (category === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => category === product.category
      );
      setFilteredProducts(filtered);
    }
  };

  const sortProductsByPrice = () => {
    const sortedByPrice = [...filteredProducts].sort((a, b) => {
      return isAscending ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sortedByPrice);
    setIsAscending(!isAscending);
    setSortByPriceIcon(isAscending ? FaSortDown : FaSortUp);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="h-screen">
        <NavigationLayout>
          <div className="flex gap-5 align-center justify-center mt-7">
            <select
              value={selectedCategory}
              onChange={(event) => filterProductsByCategory(event.target.value)}
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewlery</option>
              <option value="men's clothing">Men clothing</option>
              <option value="women's clothing">Women clothing</option>
            </select>
            <button onClick={sortProductsByPrice} className="flex gap-2">
              Sort by price{sortByPriceIcon}
            </button>
          </div>
          <div className="flex flex-wrap my-20 mx-10 gap-10">
            {filteredProducts.map((product) => (
              <TestProduct
                id={product.id}
                key={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
                image={product.image}
              />
            ))}
          </div>
        </NavigationLayout>
      </div>
    </>
  );
};

export default TestPage;
