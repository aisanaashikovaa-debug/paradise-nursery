
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const totalCost = items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      id: item.id,
      quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({
        id: item.id,
        quantity: item.quantity - 1
      }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  return (
    <div className="cart-page cart-container">
      <h1>Shopping Cart</h1>
      <h2>Total Plants: {totalItems}</h2>
      <h2>Total Cart Amount: ${totalCost.toFixed(2)}</h2>

      {items.length === 0 && <p>Your cart is empty.</p>}

      {items.map(item => (
        <div className="cart-item" key={item.id}>
          <img
            className="cart-item-image"
            src={item.image}
            alt={item.name}
          />

          <div className="cart-item-details">
            <h3 className="cart-item-name">{item.name}</h3>
            <p className="cart-item-cost">
              Price: ${item.price.toFixed(2)}
            </p>
            <p className="cart-item-total">
              Total: ${(item.price * item.quantity).toFixed(2)}
            </p>

            <div className="quantity-controls">
              <button onClick={() => handleDecrement(item)}>
                -
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => handleIncrement(item)}>
                +
              </button>
            </div>

            <button
              className="cart-item-delete"
              onClick={() => handleRemove(item)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <button
        className="get-started-button"
        onClick={onContinueShopping}
      >
        Continue Shopping
      </button>

      <button
        className="get-started-button1"
        onClick={() => alert('Coming Soon!')}
      >
        Checkout
      </button>
    </div>
  );
}

export default CartItem;
