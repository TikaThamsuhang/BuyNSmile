import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductGrid } from "./ProductGrid";

export function HomePage({cart}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data);
      })
  }, []);

  return (
    <>
      <link rel="icon" href="images/home-favicon.png" />
      <title>Home</title>
      <Header cart={cart}/>

      <div className="home-page">
        <ProductGrid products={products}/>
      </div>
    </>
  );
}
