import React, { useState, useEffect } from 'react';
import { MdOutlineLocalShipping, MdAssignmentReturn } from "react-icons/md";
import { CgSupport } from "react-icons/cg";
import { CiShoppingBasket } from "react-icons/ci";
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Ordercompletepage() {
  const { orderId, productId } = useParams(); // Assume orderId and productId are passed as URL parameters
  const userId = localStorage.getItem('userId');
  const [message, setMessage] = useState('');
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const reasons = [
    "Damaged product",
    "Incorrect product",
    "Quality not as expected",
    "Changed mind",
    "Other"
  ];

  const handleReturn = async () => {
    if (!reason && !customReason) {
      setMessage('Please select or write a reason.');
      return;
    }

    try {
      const response = await axios.post('https://furniture-cart-5.onrender.com/api/user/return', {
        userid: userId,
        orderid: orderId,
        productid: productId,
        description: customReason || reason,
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error requesting return:', error);
      setMessage('Failed to submit return request. Please try again later.');
    }
  };

  return (
    <div className='container'>
      <div className='contentcontainer'>
        <h3>Thank You for your purchase!</h3>
        <p>Your order has been successfully processed.</p>
        <p>Here are the details:</p>
      </div>
      <h2>Order Status</h2>
      <p>Your order is now complete and will be processed for shipment. You will receive a confirmation email shortly with tracking information once your items have been dispatched.</p>
      <p>Thank you for shopping with us! If you have any questions or concerns, please don't hesitate to contact our customer support team at:</p>
      <p>Email: mdaminur.oct@gmail.com</p>
      <p>Phone No: +8801405074838</p>
      
      <h3>Request a Return</h3>
      <div>
        <label htmlFor="reason">Select a reason:</label>
        <select id="reason" value={reason} onChange={(e) => setReason(e.target.value)}>
          <option value="">Select a reason</option>
          {reasons.map((reasonOption, index) => (
            <option key={index} value={reasonOption}>{reasonOption}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="customReason">Or write your own reason:</label>
        <input
          type="text"
          id="customReason"
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
        />
      </div>
      <button onClick={handleReturn}>Return</button>
      {message && <p>{message}</p>}
      
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
}

export default Ordercompletepage;