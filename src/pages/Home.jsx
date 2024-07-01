import '../index.css'
import homeimage from '../../images/homeimage.jpg';
import { MdOutlineLocalShipping } from "react-icons/md";
import { CgSupport } from "react-icons/cg";
import { CiShoppingBasket } from "react-icons/ci";
import { MdAssignmentReturn } from "react-icons/md";
import Topcategories from '../pages/Topcategories';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
     
    <div className='container3'>
      <div className="home"> 
        <div className='contentcontainer'>
          <h2>Modern Interior Design Studio</h2>
          <p>The Distinct Style Focus On Simple Form And Function, <br/>Which Are Available As Equals Under This Style</p>
         <Link to="/products"><button >Shop Now</button></Link> 
        </div>
        <div className='imagecontainer'>
          <img src={homeimage} alt="Home" />
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
   <Topcategories/>
   </div>
  );
}

export default Home;