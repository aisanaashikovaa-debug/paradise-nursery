import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const plants = [
  {
    id: 1,
    name: 'Monstera',
    price: 25,
    category: 'Tropical Plants',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6'
  },
  {
    id: 2,
    name: 'Snake Plant',
    price: 20,
    category: 'Air Purifying Plants',
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7a'
  },
  {
    id: 3,
    name: 'Aloe Vera',
    price: 15,
    category: 'Medicinal Plants',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09'
  },
  {
    id: 4,
    name: 'Peace Lily',
    price: 30,
    category: 'Air Purifying Plants',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411'
  },
  {
    id: 5,
    name: 'Fiddle Leaf Fig',
    price: 40,
    category: 'Tropical Plants',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b'
  },
  {
    id: 6,
    name: 'Succulent',
    price: 12,
    category: 'Medicinal Plants',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115'
  }
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const categories = [...new Set(plants.map(p => p.category))];

  return (
    <div className="product-page">
      <h1>Our Plants</h1>
      <p>Find the perfect plant for your home!</p>

      {categories.map(category => (
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
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>${plant.price}</p>

                    <button
                      disabled={inCart}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {inCart ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;