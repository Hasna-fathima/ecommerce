import React, { useState } from 'react';
import axios from 'axios';

const UpdateOrderStatus = ({ orderId, onStatusUpdate }) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.put(`https://furniture-cart-5.onrender.com/api/user/admin/updateOrderStatus/${orderId}`, { status });
      console.log('Response from update API:', response.data); 

      setStatus('');
      onStatusUpdate(orderId, status);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Select Status</option>
            <option value="ordered">Ordered</option>
            <option value="packed">Packed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="returned">Returned</option>
            <option value="returnRequested">Return Requested</option>
            <option value="requestAccepted">Request Accepted</option>
            <option value="requestRejected">Request Rejected</option>
          </select>
        </div>
        <button type="submit">Update Status</button>
      </form>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default UpdateOrderStatus;