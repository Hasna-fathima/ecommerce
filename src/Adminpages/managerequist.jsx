import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';

const ViewReturnRequests = () => {
    const [returnRequests, setReturnRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReturnRequests = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/admin/returnView', {
                    params: {
                        status: 'requested' // Adjust the status as needed
                    }
                });
                setReturnRequests(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReturnRequests();
    }, []);

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
                    <h1 className="mb-4">Return Requests</h1>
                    {Array.isArray(returnRequests) && returnRequests.length === 0 ? (
                        <p>No return requests found.</p>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(returnRequests) && returnRequests.map((returnRequest, index) => (
                                    <tr key={index}>
                                        <td>{returnRequest.userid.name}</td>
                                        <td>{returnRequest.userid.email}</td>
                                        <td>{returnRequest.productid.name}</td>
                                        <td>${returnRequest.productid.price.toFixed(2)}</td>
                                        <td>{returnRequest.status}</td>
                                        <td>{returnRequest.description}</td>
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

export default ViewReturnRequests;