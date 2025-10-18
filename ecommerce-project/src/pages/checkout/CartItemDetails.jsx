import { formatMoney } from "../../utils/money";
import { useState } from "react";
import axios from "axios";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantity = () => {
    // Toggle the isUpdatingQuantity state
    if (isUpdatingQuantity) {
      setIsUpdatingQuantity(false);
    }
    else {
      setIsUpdatingQuantity(true);
    }
  };

  const updateQuantityInput = () => {
    setQuantity(event.target.value);
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
            Quantity: {isUpdatingQuantity ? (
              <input className="quantity-box" type="text" value={quantity} onChange={updateQuantityInput}/>
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span className="update-quantity-link link-primary"
          onClick={updateQuantity}>Update</span>
          <span className="delete-quantity-link link-primary"
          onClick={deleteCartItem}>Delete</span>
        </div>
      </div>
    </>
  );
}
