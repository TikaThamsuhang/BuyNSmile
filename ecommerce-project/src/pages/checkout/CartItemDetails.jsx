import { formatMoney } from "../../utils/money";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`${API_BASE_URL}/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantity = async () => {
    // Toggle the isUpdatingQuantity state
    if (isUpdatingQuantity) {
      await axios.put(`${API_BASE_URL}/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
  };

  const updateQuantityInput = (event) => {
    setQuantity(event.target.value);
  };

  const handleQuantityKeyDown = (event) => {
    if (event.key === "Enter") {
      updateQuantity();
    }
    else if (event.key === "Escape") {
      setQuantity(cartItem.quantity); // Reset to original quantity
      setIsUpdatingQuantity(false); // Exit edit mode without saving
    }
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdatingQuantity ? (
              <input
                className="quantity-box"
                type="text"
                value={quantity}
                onChange={updateQuantityInput}
                onKeyDown={handleQuantityKeyDown}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
