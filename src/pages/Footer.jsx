import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; 
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";


function Footer() {
    return (
        <footer className='foot py-5'>
            <div className='contentcontainer'>
                <div className='row'>
                    <div className='col-md-3'>
                    
                    </div>
                    <div className='col-md-3'>
                        <h5>Help</h5>
                        <ul className='list-unstyled'>
                            <li>helpLine No: +91 7902258902</li>
                            <li>email: hf765729@gmail.com</li>
                            <li><Link to="/home" className='link'>Home</Link></li>
                        </ul>
                    </div>
                    <div className='col-md-3'>
                        <h5>Services</h5>
                        <ul className='list-unstyled'>
                            <li>Fast & free shipping</li>
                            <li>24/7 support</li>
                            <li>Easy shop</li>
                            <li>Payment options</li>
                            <li>Free Return</li>
                        </ul>
                    </div>
                    <div className='col-md-3'>
                        <h5>Support</h5>
                        <ul className='list-unstyled'>
                            <li><Link to="/contact" className='link'>Contact Us</Link></li>
                            <li><a href="https://www.instagram.com/hasna__mnkdn?igsh=NHZpY3lhbGNqNG1s" className='link'><FaInstagram /> Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer