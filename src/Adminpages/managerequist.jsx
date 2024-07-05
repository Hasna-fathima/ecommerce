import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewReturnRequests= () => {
  const [returnRequests, setReturnRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReturnRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/admin/order/return');
        setReturnRequests(response.data);
      } catch (err) {
        setError('Failed to fetch return requests');
      } finally {
        setLoading(false);
      }
    };

    fetchReturnRequests();
  }, []);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (returnRequests.length === 0) {
    return <div className="alert alert-warning">No return requests found</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Return Requests</h2>
      <div className="list-group">
        {returnRequests.map(request => (
          <div key={request._id} className="list-group-item mb-4">
            <h3 className="h5">Return Request ID: {request._id}</h3>
            <p>Status: {request.status}</p>
            <p>Message: {request.message}</p>
            <p>Requested By: {request.userid.details.name} ({request.userid.details.email})</p>
            <p>Order ID: {request.orderid._id}</p>
            <p>Product: {request.productid.details.name}</p>
            <p>Created At: {new Date(request.createdAt).toLocaleDateString()}</p>
            <p>Updated At: {new Date(request.updatedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ViewReturnRequests