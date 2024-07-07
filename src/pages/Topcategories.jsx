import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Topcategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userId= localStorage.getItem('userId');
        if (userId) {
        const response = await axios.get('https://furniture-cart-5.onrender.com/api/user/category',{
          headers: {
            'Authorization': `Bearer ${userId}`
        }
    });
        setCategories(response.data);
  }else {
                navigate('/login');
            }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container">
      <section className="my-4">
        <h3 className="text-center mb-4">Our Top Furniture Categories</h3>
        <div className="row justify-content-around">
          {categories.map(category => (
            <div key={category.id} className="col-md-4 mb-4">
              <div className="card" style={{ height: '100%' }}>
                <Link to={`/products/${category._id}`}> 
                  <img src={category.image} className="card-img-top img-fluid" style={{ height: '250px', objectFit: 'cover' }} alt={category.slug} />
                </Link>
                <div className="card-body">
                  <h5 className="card-title text-center">{category.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Topcategories;
