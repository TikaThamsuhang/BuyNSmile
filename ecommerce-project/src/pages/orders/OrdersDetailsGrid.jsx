import dayjs from "dayjs";
import { Link } from "react-router";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";
import { Fragment } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export function OrdersDetailsGrid({ order, loadCart }) {
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        const addToCart = async () => {
          await axios.post(`${API_BASE_URL}/api/cart-items`, {
            // Note: you can also get the productId from
            // orderProduct.productId
            productId: orderProduct.product.id,
            quantity: 1,
          });
          await loadCart();
        };
        return (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">{orderProduct.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(orderProduct.estimatedDeliveryMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src={BuyAgainIcon} />
                <span className="buy-again-message" onClick={addToCart}>
                  Add to Cart
                </span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                {/* <Link to="/tracking"> */}
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
