import { Header } from "../../components/Header";
import "./OrdersPage.css";
import { useState, useEffect} from "react";
import axios from "axios";
import { OrdersGrid } from "./OrdersGrid";
import { API_BASE_URL } from "../../config/api";
import { LoadingSpinner } from "../../components/LoadingSpinner";

window.axios = axios; // For debugging purposes

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersData = async () => {
      setIsLoading(true);
      // Fetch orders from the API
      const response = await axios.get(`${API_BASE_URL}/api/orders?expand=products`);
      setOrders(response.data);
      setIsLoading(false);
    }
    fetchOrdersData();
  }, []);
  return (
    <>
      <link rel="icon" href="images/orders-favicon.png" />
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <OrdersGrid orders={orders} loadCart={loadCart}/>
        )}        
      </div>
    </>
  );
}
