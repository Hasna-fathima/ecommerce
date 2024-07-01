import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdOutlineLocalShipping, MdAssignmentReturn } from "react-icons/md";
import { CgSupport } from "react-icons/cg";
import { CiShoppingBasket } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import   CartService from './Addcard'
import razorpay from 'razorpay'

const SingleProduct = () => {
       const navigate=useNavigate()
    const { Id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [address, setAddress] = useState({
        name: "",
        mobileNumber: "",
        pinCode: "",
        locality: "",
        address: "",
        cityDistrictTown: "",
        state: "",
        landmark: "",
        alternatePhone: "",
        addressType: "home",
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (!Id) {
                console.error('Product ID is undefined');
                setError('Invalid product ID');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`https://furniture-cart-5.onrender.com/api/user/product/${Id}`);
                if (response.status === 200) {
                    setProduct(response.data);
                } else {
                    setError("Failed to fetch product details");
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to fetch product details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [Id]);
    

    const handleOrder = () => {
        setShowAddressForm(true);
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User ID not found in localStorage.');
                return;
            }

            const addressUrl = "https://furniture-cart-5.onrender.com/api/user/address";
            const addressResponse = await axios.post(addressUrl, {
                userId: userId,
                address: address
            });

            console.log('Address saved:', addressResponse.data);

            if (addressResponse.status === 201) {
                const orderUrl = "https://furniture-cart-5.onrender.com/api/user/order";
                const orderData = {
                    userId: userId,
                    addressId: addressResponse.data.address._id,
                    products: [
                        {
                            productId: product._id,
                            quantity: 1, 
                        }
                    ],
                };

                const orderResponse = await axios.post(orderUrl, orderData);
                console.log('Order data:', orderResponse.data);

                if (orderResponse.status === 201) {
                    const paymentData = orderResponse.data;
                    initPayment(paymentData);
                }
            }
        } catch (error) {
            console.error('Error saving address or creating order:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            }
        }
    };

    const initPayment = (data) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
            amount: data.amount * 100, 
            currency: data.currency,
            name: product.name,
            description: "Test Transaction",
            image: `https://res.cloudinary.com/dvhply5kh/image/upload/${product.imagePublicId}`,
            order_id: data.razorpayOrderID,
            handler: async (response) => {
                try {
                    const verifyUrl = "https://furniture-cart-5.onrender.com/api/razorpay/verify";
                    const { data } = await axios.post(verifyUrl, response);
                    console.log('Payment verification data:', data);
                    navigate('/order-complete');
                    
                } catch (error) {
                    console.error('Error verifying payment:', error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };


    const handleAddToCart = async () => {
        try {
            const userId = CartService.getUserId();
            const response = await CartService.addToCart(userId, product._id, 1);
            console.log('Product added to cart:', response);
        } catch (error) {
            console.error('Failed to add product to cart:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!product) {
        return <p>No product found</p>;
    }

    return (
        <div className="container">
            <div className="single-product">
                <div className="grid-container">
                    <div className="product-image">
                        <img
                            src={`https://res.cloudinary.com/dvhply5kh/image/upload/${product.imagePublicId}`}
                            alt={product.name}
                        />
                    </div>
                    <div className="product-info">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>&#8377;{product.price}</p>
                        <p>{product.category.name}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>{product.review}</p>
                        <button onClick={handleOrder}>Buy Now</button>
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>

            {showAddressForm && (
                <div className="address-form">
                    <h3>Enter Your Address</h3>
                    <form onSubmit={handleAddressSubmit}>
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                value={address.name}
                                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Mobile Number</label>
                            <input
                                type="text"
                                value={address.mobileNumber}
                                onChange={(e) => setAddress({ ...address, mobileNumber: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Pin Code</label>
                            <input
                                type="text"
                                value={address.pinCode}
                                onChange={(e) => setAddress({ ...address, pinCode: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Locality</label>
                            <input
                                type="text"
                                value={address.locality}
                                onChange={(e) => setAddress({ ...address, locality: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Address</label>
                            <input
                                type="text"
                                value={address.address}
                                onChange={(e) => setAddress({ ...address, address: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>City/District/Town</label>
                            <input
                                type="text"
                                value={address.cityDistrictTown}
                                onChange={(e) => setAddress({ ...address, cityDistrictTown: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>State</label>
                            <input
                                type="text"
                                value={address.state}
                                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Landmark</label>
                            <input
                                type="text"
                                value={address.landmark}
                                onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Alternate Phone</label>
                            <input
                                type="text"
                                value={address.alternatePhone}
                                onChange={(e) => setAddress({ ...address, alternatePhone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Address Type</label>
                            <select
                                value={address.addressType}
                                onChange={(e) => setAddress({ ...address, addressType: e.target.value })}
                                required
                            >
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                            </select>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
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
    )
};

export default SingleProduct

