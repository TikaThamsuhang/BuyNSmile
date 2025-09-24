import { Route, Routes } from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'
import { PageNotFound } from './pages/PageNotFound'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [cart, setCart] = useState([]); // New state for cart items

  useEffect(() => {
    axios.get('/api/cart-items?expand=product') // Query parameter to expand product details
      .then((response) => {
        setCart(response.data);
      })
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart}/>} />
        <Route path="checkout" element={<CheckoutPage cart={cart}/>}/>
        <Route path="orders" element={<OrdersPage cart={cart}/>}/>
        <Route path="tracking" element={<TrackingPage />}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
