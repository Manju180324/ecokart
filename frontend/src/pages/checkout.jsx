// src/pages/Checkout.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems }) => {
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/checkout', {
        ...form,
        items: cartItems,
      });

      setMessage(res.data.message);
      localStorage.removeItem('cart'); // ✅ clear cart
      setTimeout(() => {
        navigate('/products');
      }, 2000);

    } catch (err) {
      console.error('Checkout failed', err);
      setMessage('Failed to place order');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧾 Checkout</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required style={{ display: 'block', margin: '1rem 0' }} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ display: 'block', margin: '1rem 0' }} />
        <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} required style={{ display: 'block', margin: '1rem 0' }} />

        <h4>🛒 Order Summary:</h4>
        {cartItems.map(item => (
          <p key={item.id}>{item.title} × {item.quantity} = ₹{item.price * item.quantity}</p>
        ))}
        <hr />
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'green', color: 'white' }}>
          Confirm Order
        </button>
      </form>

      {message && <p style={{ marginTop: '1rem', color: 'blue' }}>{message}</p>}
    </div>
  );
};

export default Checkout;
