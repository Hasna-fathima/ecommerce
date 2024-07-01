import React from 'react';
import '../index.css'; 
import { Link } from 'react-router-dom'; 
import furniture1 from '../../images/furniture1.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate=useNavigate()


  const handletoken=()=>{
    localStorage.removeItem('_id');
    localStorage.removeItem('token')
    navigate('/admin/home')
  }

  return (
    <header>
    <img className="logo" src={furniture1} alt="logo" />
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
          <Link className="navbar-brand nav-link text-warning-emphasis fs-8" to="/">Admin Dashboard</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
              <Link className="nav-link text-warning-emphasis fs-8" to="/admin/home">Home</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-warning-emphasis fs-8"to="/admin/manageusers">Users</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-warning-emphasis fs-8" to="/admin/manageproducts">Products</Link>
              </li>
              <li className="nav-item">
                 <Link className="nav-link text-warning-emphasis fs-8" to="/admin/orders">Orders</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-warning-emphasis fs-8" to="/admin/returnview">Returns</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-warning-emphasis fs-8" to="/admin/messages">CustomerSupport</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-warning-emphasis fs-8" onClick={handletoken} to="/admin/home">Logout</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AdminHeader