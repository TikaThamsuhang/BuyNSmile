import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductGrid } from "./ProductGrid";
import { useSearchParams } from 'react-router';
import { API_BASE_URL } from "../../config/api";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export function HomePage({cart, loadCart}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search') || '';

  useEffect(() => {
    const getHomeData = async () =>  {
      setIsLoading(true);
      // const response = await axios.get('/api/products');
      const url = searchText ? `${API_BASE_URL}/api/products?search=${searchText}` : `${API_BASE_URL}/api/products`;
      const response = await axios.get(url);
      setProducts(response.data);
      setIsLoading(false);
    };

    getHomeData();
  }, [searchText]);

  return (
    <>
      <link rel="icon" href="images/home-favicon.png" />
      <title>Home</title>
      <Header cart={cart}/>

      <div className="home-page">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ProductGrid products={products} loadCart={loadCart}/>
        )}
      </div>
    </>
  );
}
