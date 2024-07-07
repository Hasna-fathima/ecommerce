import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'

const ReturnRequests = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await axios.get('https://furniture-cart-5.onrender.com/api/user/admin/order/return'); 
          if (Array.isArray(response.data.returns)) {
          setReturns(response.data.returns);
        } else {
          setError('Invalid response format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  if (loading) {
    return <div className="d-flex justify-content-center my-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">Error: {error}</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="heading mb-4">Return Requests</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="thead">
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Return Date</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            {returns.map(returnRequest => (
              <tr key={returnRequest._id}>
                <td>{returnRequest.userid?._id}</td>
                <td>{returnRequest.userid?.name}</td>
                <td>{returnRequest.userid?.email}</td>
                <td>{returnRequest.orderid}</td>
                <td>{returnRequest.productid?._id}</td>
                <td>{returnRequest.productid?.name}</td>
                <td>{returnRequest.productid?.price}</td>
                <td>{returnRequest.reason}</td>
                <td>{returnRequest.status}</td>
                <td>{new Date(returnRequest.returnDate).toLocaleDateString()}</td>
                <td>{new Date(returnRequest.createdAt).toLocaleDateString()}</td>
                <td>{new Date(returnRequest.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnRequests;