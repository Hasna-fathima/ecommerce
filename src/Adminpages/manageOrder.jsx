import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import UpdateOrderStatus from './updates'; 
import '../index.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://furniture-cart-5.onrender.com/api/user/admin/orders'); 
        console.log('API Response:', response.data); 
        setOrders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`https://furniture-cart-5.onrender.com/api/user/admin/updateOrderStatus/${orderId}`, { status: newStatus });
      const updatedOrder = response.data;

      const updatedOrders = orders.map(order => {
        if (order.orderId === updatedOrder._id) {
          return {
            ...order,
            orderStatus: updatedOrder.orderStatus
          };
        }
        return order;
      });

      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating order status:', error.message);
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
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="heading mb-4">Orders</h1>
          {Array.isArray(orders) && orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Products</th>
                  <th>Total Amount</th>
                  <th>Payment Status</th>
                  <th>Payment Type</th>
                  <th>Created At</th>
                  <th>Order Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orders) && orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.user?.name}</td>
                    <td>{order.user?.email}</td>
                    <td>{order.user?.phoneNumber}</td>
                    <td>
                      {order.address?.address}, {order.address?.cityDistrictTown}, {order.address?.state}, {order.address?.pinCode}
                    </td>
                    <td>
                      <Table striped bordered hover size="sm" responsive>
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((product) => (
                            <tr key={product.productId}>
                              <td>{product.name}</td>
                              <td>{product.description}</td>
                              <td>{product.price}</td>
                              <td>{product.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </td>
                    <td>{order.totalAmount}</td>
                    <td>{order.paymentStatus}</td>
                    <td>{order.paymentType}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      {Array.isArray(order.orderStatus) ? (
                        order.orderStatus.map((status, index) => (
                          <div key={index}>
                            {status.type}: {status.isCompleted ? 'Completed' : 'Pending'} on {status.date ? new Date(status.date).toLocaleString() : 'N/A'}
                          </div>
                        ))
                      ) : (
                        <div>N/A</div>
                      )}
                    </td>
                    <td>
                      <UpdateOrderStatus orderId={order.orderId} onStatusUpdate={handleStatusUpdate} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default OrderManagement;