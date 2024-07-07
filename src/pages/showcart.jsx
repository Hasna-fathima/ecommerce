import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";
import '../index.css'


const ShowCartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`https://furniture-cart-5.onrender.com/api/user/cart/${userId}`);
        if (response.data) {
          console.log('Cart Data:', response.data);  
          response.data.cartItems.forEach(item=>{console.log(`cartItems`,item);console.log(`image publicId`,item.imagePublicId)})
          setCartItems(response.data.cartItems);
          setCartId(response.data.cartId);
        } else {
          setCartItems([]);
          setCartId(null);
        }
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        setCartItems([]);
        setCartId(null);
      }
    };

    if (userId) {
      fetchCart();
    } else {
      navigate('/login'); 
    }
  }, [userId, navigate]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`https://furniture-cart-5.onrender.com/api/user/cart`, { data: { userId, productId } });
      setCartItems(prevItems => prevItems.filter(item => item.product.toString() !== productId));
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    try {
      await axios.patch(`https://furniture-cart-5.onrender.com/api/user/cart/${cartId}`, { productId, quantity });
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.toString() === productId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  if (!userId) {
    return <div className="alert alert-warning">Please log in to view your cart.</div>;
  }

  return (
    <div className='container mt-5'>
      <p className='heading mb-4'>Shopping Cart</p>
      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is empty</div>
      ) : (
        <ul className='list-group'>
          {cartItems.map(item => {
            const imageUrl = `https://res.cloudinary.com/dvhply5kh/image/upload/${item.imagePublicId}`;
            console.log('Image URL:', imageUrl);  // Log to verify the image URL
            console.log('Cart Item:', item);  // Log to verify each item data
            return (
              <li key={item.product} className='list-group-item d-flex justify-content-between align-items-center'>
                <div className="d-flex align-items-center">
                  <img
                    className='img-thumbnail mr-3'
                    src={imageUrl}
                    alt={item.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/100'; // Fallback image
                    }}
                  />
                  <div>
                    <h5>{item.name}</h5>
                    <p>Price: &#8377;{item.price}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="input-group mr-3">
                    <input
                      type="number"
                      className="form-control"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.product, parseInt(e.target.value))
                      }
                    />
                  </div>
                  <button onClick={() => handleRemove(item.product)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ShowCartPage;