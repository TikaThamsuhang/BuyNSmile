import { Header } from "../../components/Header";
import "./OrdersPage.css";
import { useState, useEffect} from "react";
import axios from "axios";
import { OrdersGrid } from "./OrdersGrid";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      // Fetch orders from the API
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
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

        <OrdersGrid orders={orders}/>        
      </div>
    </>
  );
}
