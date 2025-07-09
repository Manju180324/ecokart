import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// ✅ Accept cartItems and setCartItems as props
const ProductDetail = ({ cartItems, setCartItems }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError('Product not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/products" style={{ textDecoration: 'none', color: 'blue' }}>
        ← Back to Products
      </Link>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <img
          src={product.image_url}
          alt={product.title}
          style={{
            width: '300px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '10px'
          }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
        />

        <div>
          <h2>{product.title}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Eco Score:</strong> <span style={{ color: 'green' }}>{'🌿'.repeat(product.eco_score)}</span></p>

          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
            onClick={() => {
              const exists = cartItems.find(item => item.id === product.id);
              if (!exists) {
                setCartItems([...cartItems, { ...product, quantity: 1 }]);
                alert('✅ Added to cart!');
              } else {
                alert('🛒 Item already in cart');
              }
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
