import { OrdersDetailsGrid } from "./OrdersDetailsGrid";
import { OrdersHeader } from "./OrdersHeader";

export function OrdersGrid({orders, loadCart}) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrdersHeader order={order} />

            <OrdersDetailsGrid order={order} loadCart={loadCart}/>
          </div>
        );
      })}
    </div>
  );
}
