import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProductsByCategory() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://furniture-cart-5.onrender.com/api/user/products?category=${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="container">
      <h4>Products</h4>
      <div className="row">
        {products.map(product => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card">
            <Link to={`/singleproduct/${product._id}`}>
            
            <img className='card-flag'src={`https://res.cloudinary.com/dvhply5kh/image/upload/${product.imagePublicId}`} alt={product.name} />
            </Link>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsByCategory;