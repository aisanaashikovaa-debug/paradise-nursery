
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const images = [
  'photo-1485955900006-10f4d324d411',
  'photo-1416879595882-3373a0480b5b',
  'photo-1501004318641-b39e6451bec6',
  'photo-1459156212016-c812468e2115',
  'photo-1509423350716-97f9360b4e09',
  'photo-1497250681960-ef046c08a56e'
];

const plantGroups = {
  'Air Purifying Plants': [
    ['Snake Plant', 20],
    ['Peace Lily', 30],
    ['Spider Plant', 15],
    ['Boston Fern', 22],
    ['Areca Palm', 35],
    ['English Ivy', 18]
  ],
  'Tropical Plants': [
    ['Monstera', 25],
    ['Fiddle Leaf Fig', 40],
    ['Bird of Paradise', 45],
    ['Rubber Plant', 28],
    ['Philodendron', 24],
    ['Calathea', 32]
  ],
  'Medicinal Plants': [
    ['Aloe Vera', 15],
    ['Lavender', 18],
    ['Mint', 12],
    ['Rosemary', 16],
    ['Chamomile', 14],
    ['Holy Basil', 17]
  ]
};

const plants = Object.entries(plantGroups).flatMap(
  ([category, group], groupIndex) =>
    group.map(([name, price], index) => ({
      id: groupIndex * 6 + index + 1,
      name,
      price,
      category,
      image: `https://images.unsplash.com/${
        images[(groupIndex * 2 + index) % images.length]
      }?w=400&auto=format&fit=crop`
    }))
);

function ProductList({ onHome }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  );

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handlePlants = () => setShowCart(false);
  const handleCart = () => setShowCart(true);

  return (
    <>
      <nav className="navbar">
        <h2 className="brand" onClick={onHome}>
          Paradise Nursery
        </h2>

        <div className="nav-links">
          <button onClick={onHome}>Home</button>
          <button onClick={handlePlants}>Plants</button>

          <button
            className="cart-icon"
            onClick={handleCart}
            aria-label={`Shopping cart with ${cartQuantity} plants`}
          >
            🛒 Cart
            <span className="cart-badge">{cartQuantity}</span>
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={handlePlants} />
      ) : (
        <div className="product-page">
          <h1>Our Plants</h1>
          <p>Find the perfect plant for your home!</p>

          {Object.keys(plantGroups).map(category => (
            <section key={category}>
              <h2>{category}</h2>

              <div className="product-grid">
                {plants
                  .filter(plant => plant.category === category)
                  .map(plant => {
                    const inCart = cartItems.some(
                      item => item.id === plant.id
                    );

                    return (
                      <div className="product-card" key={plant.id}>
                        <img
                          src={plant.image}
                          alt={plant.name}
                        />
                        <h3>{plant.name}</h3>
                        <p>${plant.price.toFixed(2)}</p>

                        <button
                          disabled={inCart}
                          onClick={() => handleAddToCart(plant)}
                        >
                          {inCart
                            ? 'Added to Cart'
                            : 'Add to Cart'}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

export default ProductList;
