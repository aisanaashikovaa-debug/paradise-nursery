
import React, { useState } from 'react';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [page, setPage] = useState('home');

  return (
    <>
      {page === 'home' ? (
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
      ) : (
        <ProductList onHome={() => setPage('home')} />
      )}
    </>
  );
}

export default App;
