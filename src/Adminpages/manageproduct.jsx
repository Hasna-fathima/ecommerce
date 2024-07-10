import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { RiAddLargeFill } from 'react-icons/ri';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const userId = localStorage.getItem('_id');
      if (userId) {
        const response = await axios.get('https://furniture-cart-5.onrender.com/api/user/admin/products', {
          headers: {
            'Authorization': `Bearer ${userId}`,
          },
        });
        setProducts(response.data);
        setLoading(false);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/editproduct/${id}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.delete(`https://furniture-cart-5.onrender.com/api/user/admin/productdelete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error}</p>;
  }

  return (
    <div className='container'>
      <div>
        <RiAddLargeFill onClick={() => navigate('/admin/addproduct')} style={{ cursor: 'pointer' }} />
      </div>
      <div className='grid-container'>
        {products.length > 0 ? products.map((product) => (
          <div key={product._id} className='card'>
            <div className='card-flag-container'>
              <Link to={`/singleproduct/${product._id}`}>
                <img
                  className='card-flag'
                  src={`https://res.cloudinary.com/dvhply5kh/image/upload/${product.imagePublicId}`}
                  alt={product.name}
                />
              </Link>
            </div>
            <div className='card-info'>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>&#8377;{product.price}</p>
            </div>
            <button onClick={() => handleEdit(product._id)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        )) : <p>No products available.</p>}
      </div>
    </div>
  );
}

export default ManageProduct;
