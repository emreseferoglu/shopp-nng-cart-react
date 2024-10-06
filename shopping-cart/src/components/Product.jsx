import axios from "axios";
import { useEffect, useState } from "react";

function Product({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchTerm) {
      const getAxiosProduct = async () => {
        const response = await axios.get(
          `https://api.mercadolibre.com/sites/MLA/search?q=${searchTerm}`
        );
        console.log(response);
      };

      getAxiosProduct();
    }
  }, [searchTerm]);

  return <div></div>;
}

export default Product;
