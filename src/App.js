import React, { useState, useEffect } from "react";
import Product from "./Components/Product";
import { ThemeProvider } from "react-bootstrap";
import axios from "axios";
import { Container } from "react-bootstrap";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "./helpers/localstorage";
import Header from "./Components/Header";

// --header 'Content-Type: application/json' \
// --cookie connect.sid=s%253AC9UlQ9M1W1aslddIqBNrrk68Yx4GleaF.OyLqPkC%252FpbJKf070EG6KIJoS70bHaP5GOYxBXBV6hG8 \
// --data '{
// "limit":100,
// "page":0,
// "search":""
// }'

const App = () => {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://3.7.252.58:4001/product/getAllProduct",
        {
          limit: 100,
          page: 0,
          search: "",
        },
        {
          "Content-Type": "application/json",
          Cookie:
            "connect.sid=s%253AC9UlQ9M1W1aslddIqBNrrk68Yx4GleaF.OyLqPkC%252FpbJKf070EG6KIJoS70bHaP5GOYxBXBV6hG8",
        }
      );
      setLoading(false);
      setProducts(data);
    } catch (error) {
      setLoading(false);
      console.error("erroe", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    setBasket(getItemFromLocalStorage("basket") || []);
  }, []);

  useEffect(() => {
    setItemInLocalStorage("basket", basket);
  }, [basket]);

  const addTobasket = (product) => {
    const existingProduct = basket.find((item) => item._id === product._id);
    if (existingProduct) {
      const updatedbasket = basket.map((item) => {
        if (item._id === product._id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      setBasket([...updatedbasket]);
    } else {
      setBasket([...basket, { ...product, count: 1 }]);
    }
  };

  const removeFrombasket = (productId) => {
    setBasket(basket.filter((product) => product._id !== productId));
  };

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Header basket={basket} removeFrombasket={removeFrombasket} />
      <Container
        style={{ padding: "1rem" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h1>Products</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {loading && <h3>loading...</h3>}
          {products.map((product) => (
            <Product product={product} addTobasket={addTobasket} />
          ))}
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default App;
