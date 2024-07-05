import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [returnMessage, setReturnMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId'); 

      if (!userId) {
        setError('User ID not found in local storage');
        setLoading(false);
        return;
      }

      try {
        const userId= localStorage.getItem('userId');
        if (userId) {
        const response = await axios.get(`http://localhost:3000/api/user/order/${userId}`,{
          headers: {
            'Authorization': `Bearer ${userId}`
        }
    });
    setOrders(response.data);
} else {
    navigate('/login');
}
       
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleReturnClick = (item) => {
    setSelectedItem(item);
  };

  const handleReturnSubmit = async () => {
    const userId = localStorage.getItem('userId'); 

    if (!userId) {
      alert('User ID not found in local storage');
      return;
    }

    if (!selectedItem || !selectedItem.orderid || !selectedItem.productId) {
      alert('Order ID or Product ID not found in selected item');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/user/return`, {
        userid: userId,
        orderid: selectedItem.orderid._id,
        productid: selectedItem.productId._id,
        message: returnMessage,
      });

      alert('Return request submitted successfully');
      setReturnMessage('');
      setSelectedItem(null);
    } catch (err) {
      console.error('Failed to submit return request:', err);
      alert('Failed to submit return request');
    }
  };

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (orders.length === 0) {
    return <div className="alert alert-warning">No orders found for this user</div>;
  }

  return (
    <div className="container my-5">
      <div className="list-group">
        {orders.map(order => (
          <div key={order._id} className="list-group-item mb-4">
            <h3 className="h5">Order ID: {order._id}</h3>
            <p>Total Amount: ${order.totalAmount}</p>
            <p>Order Status:</p>
            <ul className="list-unstyled">
              {order.orderStatus.map((status, index) => (
                <li key={index}>
                  {status.type} - {status.isCompleted ? 'Completed' : 'Pending'} on {new Date(status.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
            {order.items.length === 0 ? (
              <p className="alert alert-info">You have not ordered anything yet</p>
            ) : (
              <>
                <p>Items:</p>
                <ul className="list-unstyled">
                  {order.items.map(item => (
                    <li key={item.productId._id} className="mb-2">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{item.productId.name}</h5>
                          <img 
                            src={`https://res.cloudinary.com/dvhply5kh/image/upload/${item.productId.imagePublicId}`} 
                            alt={item.productId.name} 
                            className="img-fluid mb-3" 
                          />
                          <p className="card-text">Description: {item.productId.description}</p>
                          <p className="card-text">Price: ${item.productId.price}</p>
                          <p className="card-text">Quantity: {item.purchasedQty}</p>
                          <p className="card-text">Payable Price: ${item.payablePrice}</p>
                          <button 
                            onClick={() => handleReturnClick({ orderid: order, productId: item.productId })}
                            data-bs-toggle="modal" 
                            data-bs-target="#returnModal"
                          >
                            Return Item
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal fade" id="returnModal" tabIndex="-1" aria-labelledby="returnModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="returnModalLabel">Return Request</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="returnMessage" className="form-label">Reason to return</label>
                  <textarea 
                    className="form-control" 
                    id="returnMessage" 
                    rows="3" 
                    value={returnMessage} 
                    onChange={(e) => setReturnMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button"  data-bs-dismiss="modal">Close</button>
                <button type="button"onClick={handleReturnSubmit}>Submit Return Request</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
