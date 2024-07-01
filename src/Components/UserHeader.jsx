import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; 
import { Link } from 'react-router-dom';
import furniture1 from '../../images/furniture1.jpg'
import ProductsByCategory from '../pages/productbycategoris';

function UserHeader() {

  const tokenrelease=()=>{
    localStorage.removeItem(`token`)
  }
  return (
    <div className='container'>
      <header>
        <img className="logo" src={furniture1} alt="logo" />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link text-warning-emphasis fs-8" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning-emphasis fs-8" to='/products'>Products</Link>
                </li>
            
                <li className="nav-item">
                  <Link className="nav-link text-warning-emphasis fs-8" to="/aboutus">About Us</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link text-warning-emphasis  fs-8" to="/contact">Contact Us</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning-emphasis  fs-8" to='/login'>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning-emphasis fs-8" to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-warning-emphasis fs-8" onClick={tokenrelease}>SignOut</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='icon'>
                <Link to="/showcart" ><svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="rgba(116, 69, 32, 0.63)" className="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg></Link>

</div>
      </header>
    </div>
  );
}

export default UserHeader;

