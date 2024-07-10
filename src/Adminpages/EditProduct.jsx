import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProductForm() {
  const { Id } = useParams();
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    slug: '',
    price: '',
    category: '',
    review: '',
    description: '',
    quantity: '',
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://furniture-cart-5.onrender.com/api/user/product/${Id}`);
        if (response.status === 200) {
          setProduct(response.data);
          setUpdatedProduct({
            ...response.data,
            image: null, 
          });
        } else {
          setError('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [Id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      image: e.target.files[0],
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const _id = localStorage.getItem('_id');
    if (!_id) {
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('slug', updatedProduct.slug);
    formData.append('price', updatedProduct.price);
    formData.append('category', updatedProduct.category);
    formData.append('review', updatedProduct.review);
    formData.append('description', updatedProduct.description);
    formData.append('quantity', updatedProduct.quantity);
    if (updatedProduct.image) {
      formData.append('image', updatedProduct.image);
    }

    try {
      const response = await axios.put(`https://furniture-cart-5.onrender.com/api/user/admin/product/${Id}`, formData, {
        headers: {
          'Authorization': `Bearer ${_id}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.status === 200) {
        navigate('/admin/manageproducts');
      } else {
        setError('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container'>
      <h2>Edit Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleUpdateProduct}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={updatedProduct.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='slug'>Slug</label>
          <input
            type='text'
            className='form-control'
            id='slug'
            name='slug'
            value={updatedProduct.slug}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            className='form-control'
            id='price'
            name='price'
            value={updatedProduct.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <input
            type='text'
            className='form-control'
            id='category'
            name='category'
            value={updatedProduct.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='review'>Review</label>
          <input
            type='text'
            className='form-control'
            id='review'
            name='review'
            value={updatedProduct.review}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            className='form-control'
            id='description'
            name='description'
            value={updatedProduct.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='quantity'>Quantity</label>
          <input
            type='number'
            className='form-control'
            id='quantity'
            name='quantity'
            value={updatedProduct.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='image'>Image</label>
          <input
            type='file'
            className='form-control'
            id='image'
            name='image'
            onChange={handleFileChange}
          />
        </div>
        <button type='submit'>Update Product</button>
      </form>
    </div>
  );
}

export default EditProductForm;