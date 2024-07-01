import React from 'react';
import AdminHeader from '../Components/AdminHeader';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Footer';

function AdminLayout() {
  return (
    <div className='container'>
      <AdminHeader />
      <Outlet />
       <Footer /> 
    </div>
  );
}

export default AdminLayout