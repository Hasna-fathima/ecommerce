import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css"; 
import AdminLayout from './Layout/AdminLayout.jsx';
import UserLayout from './Layout/UserLayout.jsx'
import UserSignup from './Components/UserSignup.jsx';
import AdminSignup from './Components/AdminSignup.jsx';
import LoginForm from './Components/AdminLogin.jsx';
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx';
import Products from './pages/products.jsx'
import Topcategories from "./pages/Topcategories.jsx";
import AboutUs from "./pages/Aboutus.jsx";
import ContactUs from "./pages/Contactus.jsx";
import ProductsByCategory from "./pages/productbycategoris.jsx";
import OrderPage from "./pages/Orderview.jsx";
import OrderCompletePage from "./pages/ordercompletepage.jsx";
import ShowCartPage from "./pages/showcart.jsx";
import Manageproduct from "./Adminpages/manageproduct.jsx";
import AddProductForm from "./Adminpages/AddProduct.jsx";
import EditProductForm from './Adminpages/EditProduct.jsx'
import SingleProduct from './pages/SingleProduct.jsx'
import ManageUser from "./Adminpages/manageUser.jsx";
import Messages from "./Adminpages/customerService.jsx";
import OrderManagement from "./Adminpages/manageOrder.jsx";
import ViewReturnRequests from './Adminpages/managerequist.jsx';
import OrderView from './pages/Orderview.jsx';
import ManageCategory from './Adminpages/manageCategory.jsx'





const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout/>,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path:'login',
        element: <LoginForm />
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path: "signup",
        element: <UserSignup />
      },
      {
        path:'products',
        element:<Products/>
      },
      {
        path:'singleproduct/:Id',
        element:<SingleProduct/>
      },
      {
        path:'category',
        element:<Topcategories/>
      },
      {
        path:'aboutus',
        element:<AboutUs/>
      },
      {
        path:"contact",
        element:<ContactUs/>
      },
      {
        path:'products/:category',
        element:<ProductsByCategory/>
      },
      {
        path:'order',
        element:<OrderPage/>
      },
      {
        path:'ordercomplete',
        element:<OrderCompletePage/>
      },
      {
        path:'showcart',
        element:<ShowCartPage/>
      },
      {
        path:'products',
        element:<Products/>
      },
      {
        path:'orders/:userId',
        element:<OrderView/>
      }
    
    
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <LoginForm />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "signup",
        element: <AdminSignup />
      },
      {
        path:"manageproducts",
        element:<Manageproduct/>
      },
     {
      path:'addproduct',
      element:<AddProductForm/>
     },
     {
      path:'editproduct/:Id',
      element:<EditProductForm/>
     },
     {
      path:'manageusers',
      element:<ManageUser/>
     },
     {
      path:'messages',
      element:<Messages/>
     },
     {
      path:'orders',
      element:<OrderManagement/>
  
     },
     {
      path:'managecategory',
      element:<ManageCategory/>
     },
     {
      path:'returnview',
      element:<ViewReturnRequests/>
     },

   
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
