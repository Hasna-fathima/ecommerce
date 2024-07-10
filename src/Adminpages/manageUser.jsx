import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css'
import { FaRegCircleUser } from "react-icons/fa6";

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('https://furniture-cart-5.onrender.com/api/user/admin/getalluser', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

    
      setUsers(response.data || []); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
      setLoading(false);
    }
  };

  const handleBlock = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.post(`https://furniture-cart-5.onrender.com/api/user/admin/blockuser/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      
      setUsers(users.map(user => user._id === id ? { ...user, isBlocked: true } : user));
    } catch (error) {
      console.error('Error blocking user:', error);
      setError('Failed to block user');
    }
  };

  const handleUnblock = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.post(`https://furniture-cart-5.onrender.com/api/user/admin/unblockusers/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });


      setUsers(users.map(user => user._id === id ? { ...user, isBlocked: false } : user));
    } catch (error) {
      console.error('Error unblocking user:', error);
      setError('Failed to unblock user');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='container'>
      <h2 className='heading'>Manage Users</h2>
      <div className='grid-container'>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className='card'>
              <div className='card-flag-container'>
                <div className='card-info'>
                <h3 className='user'><FaRegCircleUser/></h3>
                  <h2>{user.firstname}</h2>
                  <p>{user.lastname}</p>
                  <p>{user.email}</p>
                  <p>{user.phoneNumber}</p>
                </div>
            
                {user.isBlocked ? (
                  <button onClick={() => handleUnblock(user._id)}>Unblock</button>
                ) : (
                  <button onClick={() => handleBlock(user._id)}>Block</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  );
}

export default ManageUser;

