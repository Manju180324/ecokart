import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ⬅️ important!

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products');
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛒 EcoKart Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: '1.5rem' }}>
              <Link 
                to={`/products/${product.id}`} 
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <strong>{product.title}</strong> - ₹{product.price}
                <br />
                {product.category} | Eco Score: {"🌿".repeat(product.eco_score)}
                <br />
                <img 
                  src={product.image_url} 
                  alt={product.title} 
                  width="150" 
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150'} 
                />
              </Link>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
