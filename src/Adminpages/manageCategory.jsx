import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3000/api/user/admin/addCate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setCategory(response.data);
      console.log('Category created:', response.data);
    } catch (err) {
      console.error('Error creating category:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Create Category</button>
      </form>
      {category && (
        <div>
          <h2>Category Created</h2>
          <p>Name: {category.name}</p>
          {category.image && <img src={category.image} alt={category.name} />}
        </div>
      )}
    </div>
  );
};


export default ManageCategory;