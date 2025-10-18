import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductGrid } from "./ProductGrid";
import { useSearchParams } from 'react-router';

export function HomePage({cart, loadCart}) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search') || '';

  useEffect(() => {
    const getHomeData = async () =>  {
      // const response = await axios.get('/api/products');
      const url = searchText ? `/api/products?search=${searchText}` : '/api/products';
      const response = await axios.get(url);
      setProducts(response.data);
    };

    getHomeData();
  }, [searchText]);

  return (
    <>
      <link rel="icon" href="images/home-favicon.png" />
      <title>Home</title>
      <Header cart={cart}/>

      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}
