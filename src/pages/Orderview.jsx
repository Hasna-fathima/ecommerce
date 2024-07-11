import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Container, Modal, Button, Form } from 'react-bootstrap';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [returnMessage, setReturnMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        setError('User ID not found in local storage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://furniture-cart-5.onrender.com/api/user/order/${userId}`, {
          headers: {
            'Authorization': `Bearer ${userId}`
          }
        });
        setOrders(response.data);
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
      await axios.post(`https://furniture-cart-5.onrender.com/api/user/return`, {
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

  const handleSubmitReview = async () => {
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
      await axios.post(`https://furniture-cart-5.onrender.com/api/user/review`, {
        userId: userId,
        productId: selectedItem.productId._id,
        rating: rating,
        comment: comment,
      });

      setReviewMessage('Review submitted successfully');
      setRating(0);
      setComment('');
      setSelectedItem(null);
    } catch (err) {
      console.error('Failed to submit review:', err);
      setReviewMessage('Failed to submit review');
    }
  };

  if (loading) return (
    <Container className="text-center my-5">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );

  if (error) return (
    <Container className="text-center my-5">
      <Alert variant="danger">Error: {error}</Alert>
    </Container>
  );

  return (
    <div className="container my-5">
      <div className="list-group">
        {orders.map(order => (
          <div key={order._id} className="list-group-item mb-4">
            <p>Order ID: {order._id}</p>
            <p>Total Amount: &#8377;{order.totalAmount}</p>
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
                          <button onClick={() => setSelectedItem({ orderid: order, productId: item.productId })}>
                            Add Review
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
        <Modal show={selectedItem !== null} onHide={() => setSelectedItem(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formComment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedItem(null)}>
              Close
            </Button>
            <Button variant="secondary" onClick={handleSubmitReview}>
              Submit Review
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {reviewMessage && (
        <Modal show={reviewMessage !== ''} onHide={() => setReviewMessage('')}>
          <Modal.Header closeButton>
            <Modal.Title>Review Submission</Modal.Title>
          </Modal.Header>
          <Modal.Body>{reviewMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"  onClick={() => setReviewMessage('')}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

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
                <button type="button" onClick={handleReturnSubmit}>Submit Return Request</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;