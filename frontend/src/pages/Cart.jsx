import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, setCartItems }) => {
  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  if (cartItems.length === 0) {
    return <h3 style={{ padding: '2rem' }}>🛒 Your cart is empty.</h3>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛒 Your Cart</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map(item => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <img
              src={item.image_url}
              alt={item.title}
              width="100"
              height="100"
              style={{ objectFit: 'cover', borderRadius: '6px', marginRight: '1rem' }}
              onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
            />
            <div style={{ flex: 1 }}>
              <strong>{item.title}</strong><br />
              ₹{item.price} x {item.quantity || 1} = ₹{item.price * (item.quantity || 1)}
            </div>
            <button
              onClick={() => removeItem(item.id)}
              style={{
                backgroundColor: '#ff4d4d',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              ❌ Remove
            </button>
          </li>
        ))}
      </ul>

      <h3>Total: ₹{totalPrice}</h3>

      <Link to="/checkout">
        <button
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Proceed to Checkout →
        </button>
      </Link>
    </div>
  );
};

export default Cart;
