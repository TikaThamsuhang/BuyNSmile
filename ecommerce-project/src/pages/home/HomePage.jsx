import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductGrid } from "./ProductGrid";

export function HomePage({cart}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () =>  {
      const response = await axios.get('/api/products')
      setProducts(response.data);
    };

    getHomeData();
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
