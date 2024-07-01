import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css'

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://furniture-cart-5.onrender.com/api/user/admin/messages');
        console.log('API response:', response.data);
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          setError('Unexpected data format');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p  className="text-center">Loading messages...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="message text-center mb-4 ">Messages</h1>
      <div className="row">
        {messages.map((msg, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="newrow card-body">
                <h5 className="newtext card-text">{msg.name}</h5>
                <p className="newtext  card-text"><strong>Email:</strong> {msg.email}</p>
                <p className="newtext  card-text"><strong>Phone Number:</strong> {msg.phoneNumber}</p>
                <p className="newtext card-text"><strong>Message:</strong> {msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
