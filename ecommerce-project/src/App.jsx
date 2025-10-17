import { Route, Routes } from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/tracking/TrackingPage'
import './App.css'
import { PageNotFound } from './pages/PageNotFound'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [cart, setCart] = useState([]); // New state for cart items

  const loadCart = async () => {
      const response = await axios.get('/api/cart-items?expand=product') // Query parameter to expand product details
      setCart(response.data);
    };

  useEffect(() => {
    

    loadCart();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
        <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>}/>
        <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart}/>}/>
        <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart}/>}/> //:orderId and :productId are the params (parameters).
        <Route path="*" element={<PageNotFound cart={cart}/>} />
      </Routes>
    </>
  )
}

export default App
