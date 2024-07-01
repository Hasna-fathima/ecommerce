import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

function AddProductForm() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    slug: '',
    price: '',
    category: '',
    review: '',
    description: '',
    quantity: '',
    image: null,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setNewProduct({
      ...newProduct,
      image: e.target.files[0],
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    if (!token) {
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('slug', newProduct.slug);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    formData.append('review', newProduct.review);
    formData.append('description', newProduct.description);
    formData.append('quantity', newProduct.quantity);
    formData.append('image', newProduct.image);

    try {
      await axios.post('https://furniture-cart-5.onrender.com/api/user/admin/create-product', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admin/manageproducts');
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product');
    }
  };

  return (
    <div className='container'>
      <h2>Add Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAddProduct}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={newProduct.name}
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
            value={newProduct.slug}
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
            value={newProduct.price}
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
            value={newProduct.category}
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
            value={newProduct.review}
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
            value={newProduct.description}
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
            value={newProduct.quantity}
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
            required
          />
        </div>
        <button type='submit'>Add Product</button>
      </form>
    </div>
  );
}

export default AddProductForm;