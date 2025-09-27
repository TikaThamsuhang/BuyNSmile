import { Header } from '../../components/Header'
import { Link, useParams } from 'react-router'
import './TrackingPage.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export function TrackingPage({cart}) {
  const {orderId, productId} = useParams();  
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }

    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return null; // or a loading indicator
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs; 
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs; // amount of time passed since creating this order
  
  let deliveryPercentage = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercentage > 100) {
    deliveryPercentage = 100;
  }

  
  return (
    <>
      <title>Tracking</title>
      <link rel="icon" href="images/tracking-favicon.png" />
      <Header cart={cart}/>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}</div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={orderProduct.product.image}
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryPercentage}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}
