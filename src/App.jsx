import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const items = useSelector(state => state.cart.items);

  const cartCount = items.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  return (
    <>
      {page !== 'home' && (
        <nav className="navbar">
          <h2 onClick={() => setPage('home')}>
            Paradise Nursery
          </h2>

          <div>
            <button onClick={() => setPage('products')}>
              Plants
            </button>

            <button onClick={() => setPage('cart')}>
              🛒 Cart ({cartCount})
            </button>
          </div>
        </nav>
      )}

      {page === 'home' && (
        <>
          <div className="landing-page">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>

            <button onClick={() => setPage('products')}>
              Get Started
            </button>
          </div>

          <AboutUs />
        </>
      )}

      {page === 'products' && <ProductList />}

      {page === 'cart' && (
        <CartItem
          onContinueShopping={() => setPage('products')}
        />
      )}
    </>
  );
}

export default App;