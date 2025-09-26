import dayjs from "dayjs";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryOption } from "./DeliveryOption";

export function OrderSummary({deliveryOptions, cart}) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            }
          );

          return (
            <div Key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                ) || "Select a delivery option"}
              </div>

              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} />
                <DeliveryOption deliveryOptions={deliveryOptions} cartItem={cartItem}/>
              </div>
            </div>
          );
        })}
    </div>
  );
}
