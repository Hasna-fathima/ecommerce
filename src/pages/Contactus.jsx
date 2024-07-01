import React, { useState } from 'react';
import '../index.css';
import { TfiEmail } from "react-icons/tfi";
import { FaPhoneVolume, FaFax } from "react-icons/fa";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { MdOutlineLocalShipping } from "react-icons/md";
import { CgSupport } from "react-icons/cg";
import { CiShoppingBasket } from "react-icons/ci";
import { MdAssignmentReturn } from "react-icons/md";
import Topcategories from '../pages/Topcategories';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://furniture-cart-5.onrender.com/api/user/message', formData);
      console.log('Message submitted:', response.data);

      setFormData({
        name:'',
        email:'',
        phoneNumber:'',
        message:''
      })
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='container-fluid py-4'>
      <div className="contentcontainer row">
        <div className='col-md-6 mb-4'>
          <div className='bg-white p-4 rounded'>
            <h3>Get in touch</h3>
            <p>We're here for you every step of the way. Whether you have questions, need order assistance, or want to share feedback, our friendly customer support team is ready to assist. Our team is here to help! Reach out to us via:</p>
            <ul className='connect list-unstyled'>
              <li className='d-flex align-items-center p-2 mb-2'><TfiEmail /><p className='icon ml-2 mb-0'>Mail<br />hf765729@gmail.com</p></li>
              <li className='d-flex align-items-center p-2 mb-2'><FaPhoneVolume /><p className='icon ml-2 mb-0'>Phone<br />+91 9400565047</p></li>
              <li className='d-flex align-items-center p-2 mb-2'><FaFax /><p className='icon ml-2 mb-0'>Fax</p></li>
              <li className='d-flex align-items-center p-2'><PiBuildingOfficeDuotone /><p className='icon ml-2 mb-0'>Office<br />5678 Seltice Way, Coeur D'Alene</p></li>
            </ul>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='p-4 rounded'>
            <form className='form' onSubmit={handleSubmit}>
              <h3>Send us a message</h3>
              <p>Your email address will not be published.<br />Required fields are marked</p>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' className='form-control' onChange={handleChange} value={formData.name} />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input type='email' name='email' className='form-control' onChange={handleChange} value={formData.email} />
              </div>
              <div className='form-group'>
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input type='number' name='phoneNumber' className='form-control' onChange={handleChange} value={formData.phoneNumber} />
              </div>
              <div className='form-group'>
                <label htmlFor='message'>Message</label>
                <textarea className='form-control' name='message' rows='5' onChange={handleChange} value={formData.message}></textarea>
              </div>
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>


      <section>
  <div class="container">
    <div class="additional row">
      <div class="col-md-3">
        <ul class="list-unstyled section2">
          <li class="text-center"><MdOutlineLocalShipping /><br/>Fast & free <br/>shipping</li>
        </ul>
      </div>
      <div class="col-md-3">
        <ul class="list-unstyled section2">
          <li class="text-center"><CiShoppingBasket /><br/>Easy to Shop</li>
        </ul>
      </div>
      <div class="col-md-3">
        <ul class="list-unstyled section2">
          <li class="text-center"><CgSupport /><br/>24/7 Support</li>
        </ul>
      </div>
      <div class="col-md-3">
        <ul class="list-unstyled section2">
          <li class="text-center"><MdAssignmentReturn/><br/>Hassle Free <br/> Return</li>
        </ul>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}

export default ContactUs;