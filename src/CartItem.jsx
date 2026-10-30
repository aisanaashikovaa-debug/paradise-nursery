import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  removeItem,
  updateQuantity
} from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const totalCost = items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <h2>Total Plants: {totalItems}</h2>
      <h2>Total Cost: ${totalCost.toFixed(2)}</h2>

      {items.length === 0 && <p>Your cart is empty.</p>}

      {items.map(item => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />

          <div>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>

            <p>
              Subtotal: ${(item.price * item.quantity).toFixed(2)}
            </p>

            <div className="quantity-controls">
              <button
                onClick={() => {
                  if (item.quantity === 1) {
                    dispatch(removeItem(item.id));
                  } else {
                    dispatch(updateQuantity({
                      id: item.id,
                      quantity: item.quantity - 1
                    }));
                  }
                }}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => dispatch(addItem(item))}
              >
                +
              </button>
            </div>

            <button
              onClick={() => dispatch(removeItem(item.id))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <button onClick={onContinueShopping}>
        Continue Shopping
      </button>

      <button onClick={() => alert('Coming Soon!')}>
        Checkout
      </button>
    </div>
  );
}

export default CartItem;