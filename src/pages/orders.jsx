import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function OrderPage() {
  const location = useLocation();
  const product = location.state.product;
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');
  const [orderSummary, setOrderSummary] = useState(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsPaymentProcessing(true);

      const orderData = {
        userId: 'USER_ID', 
        addressId: 'ADDRESS_ID', 
        products: [{ productId: product.id, quantity }],
      };

    
      const response = await axios.post('https://furniture-cart-5.onrender.com/api/user/admin/order', orderData);
      const { razorpayOrderID, amount, currency } = response.data;

      
      setOrderSummary({
        product,
        quantity,
        address,
        paymentMethod,
        total: amount,
      });

    
      if (paymentMethod === 'Razorpay') {
        const options = {
          key: process.env.RAZORPAY_KEY_ID,
          amount: amount * 100, 
          currency,
          name: 'Furniture Store',
          description: 'Purchase of furniture',
          order_id: razorpayOrderID,
          handler: async (response) => {
            const paymentResult = await axios.post('https://furniture-cart-5.onrender.com/api/user/verify', {
              orderCreationId: razorpayOrderID,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (paymentResult.data.status === 'success') {
              alert('Payment Successful');
              setOrderSummary({
                ...orderSummary,
                paymentMethod,
                total: amount,
              });
            } else {
              alert('Payment failed');
            }
            setIsPaymentProcessing(false);
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '7902258902',
          },
          notes: {
            address,
          },
          theme: {
            color: '#3399cc',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setIsPaymentProcessing(false);
    }
  };

  return (
    <div>
      <h2>Order {product.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={handleAddressChange} required />
        </label>
        <label>
          Payment Method:
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="Razorpay">Razorpay</option>
            <option value="cashondelivery">cashondelivery</option>
          </select>
        </label>
        <button type="submit" disabled={isPaymentProcessing}>
          {isPaymentProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </form>
      {orderSummary && (
        <div>
          <h3>Order Summary</h3>
          <p>Product: {orderSummary.product.name}</p>
          <p>Quantity: {orderSummary.quantity}</p>
          <p>Address: {orderSummary.address}</p>
          <p>Payment Method: {orderSummary.paymentMethod}</p>
          <p>Total: ${orderSummary.total}</p>
        </div>
      )}
    </div>
  );
}

export default OrderPage;