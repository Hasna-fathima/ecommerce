import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import about1 from '../../images/about1.jpg';
import about2 from '../../images/about2.jpg';
import misssion from '../../images/misssion.jpg';
import { MdOutlineLocalShipping } from "react-icons/md";
import { CgSupport } from "react-icons/cg";
import { CiShoppingBasket } from "react-icons/ci";
import { MdAssignmentReturn } from "react-icons/md";

const AboutUs = () => {
    return (
        <div className="container">
            <div className="contentcontainer">
                <h3>Discover FurnitureCart -<br />Where Innovation Meets Design</h3>
                <img className="img-fluid mb-4" src={about1} alt="About FurniFlex" />
                <p>FurnitureCart Challenging</p>

                <h3>The Furniture Journey Story</h3>
                <p className="paragraph">
                    The FurnitureCart journey: Transforming spaces with innovative design. Explore our story of craftsmanship<br />
                    and style, creating furniture that inspires and enhances modern living.
                </p>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <img className="img-fluid" src={about2} alt="Our Journey" />
                    </div>
                    <div className="col-md-6">
                        <h3>From Humble Beginnings</h3>
                        <p>
                            Our story began in 2010 in a small workshop, driven by a passion for creating beautiful and comfortable furniture.
                            What started as a modest operation has grown into a beloved brand known for its quality and designs.
                        </p>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <img className="img-fluid" src={misssion} alt="Our Mission" />
                    </div>
                    <div className="col-md-6">
                        <h3>Our Mission</h3>
                        <p>
                            Our mission is to help you create a home that you'll love. We believe that furniture is more than just a collection of objects;
                            it's a way to express your personal style and make a statement about who you are.
                        </p>
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

export default AboutUs;