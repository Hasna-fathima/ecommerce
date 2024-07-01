import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineLocalShipping } from "react-icons/md";
import { CgSupport } from "react-icons/cg";
import { CiShoppingBasket } from "react-icons/ci";
import { MdAssignmentReturn } from "react-icons/md";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts(); 
    }, []);

    const fetchProducts = async () => {
        try {
            const userId= localStorage.getItem('userId');
            if (userId) {
                const response = await axios.get('https://furniture-cart-5.onrender.com/api/user/products', {
                    headers: {
                        'Authorization': `Bearer ${userId}`
                    }
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching products: {error}</p>;
    }

    return (
        <div className='container'>
            <div className='grid-container'>
                {products.map((product) => (
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
                    </div>
                ))}
            </div>
            <section>
  <div class="container">
    <div class="additional row">
      <div class="col-md-3">
        <ul class="list-unstyled section2">
          <li class="text-center"><MdOutlineLocalShipping /><br/>Fast & free <br/>shipping</li>
        </ul>
      </div>
      <div class="col-md-3">
        <ul class="list-unstyled section2">
          <li class="text-center"><CiShoppingBasket /><br/>Easy to Shop</li>
        </ul>
      </div>
      <div class="col-md-3">
        <ul class="list-unstyled section2">
          <li class="text-center"><CgSupport /><br/>24/7 Support</li>
        </ul>
      </div>
      <div class="col-md-3">
        <ul class="list-unstyled section2">
          <li class="text-center"><MdAssignmentReturn/><br/>Hassle Free <br/> Return</li>
        </ul>
      </div>
    </div>
  </div>
</section>
        </div>
    );
};

export default Products;
