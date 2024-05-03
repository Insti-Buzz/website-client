
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/OurServices.css";
// import image from "../assets/Image by Javier Allegue Barros.webp";
import designImg from "../assets/Desigining.jpg"
import manufactureImg from "../assets/Manufacturer.jpg"
import videoImg from "../assets/Videographers.jpg"

function Collab() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    // const scrollToTop = () => {
    // }
  }, []);

  // const contact = () => {
      //   navi
      // }
      
      const navigate = useNavigate();
      
      return (
          <div class="services-main-container">
      <div class="services-title">
        <h1>Collaborations</h1>
      </div>
      <div class="services-intro">
      We are a diverse group with varied perspectives who love to express the campus stories and we believe the best way to do that is by fashion!

We are always looking for people to join us in this fun and creative journey of elevating campus fashion. If you think you will fit just right in, apply right away!
      </div>
      <div class="services-our-service service-manufacturing">
        <hr class="services-divider" />
        {/* <h3>MANUFACTURING</h3> */}
        <h2 id="services-manufacturing">Designers</h2>
        <div class="services-our-service-container">
          <div class="services-our-service-image-container">
            <img src={designImg} alt="" />
          </div>
          <div class="services-our-service-content">
            <div class="services-our-service-text">
              <p>
              Our designs capture the essence of campus life,
               reflecting the vibrancy and spirit of our college community. 
               By becoming part of our designer squad, you'll have the
                opportunity to immerse yourself in college festivals, social 
                events, and more, you will have a hands-on along the way. Join our
                 dynamic design team where you'll not only create but also learn extensively about graphic designing.
              </p>
              <br />
              <a href="https://docs.google.com/document/d/1FilRgIDrcUUzhhuODHppcbd4peQBouQvtIr8E1MFgHQ/edit" target="_blank">View JD</a>
            </div>
          </div>
        </div>
      </div>
      <div class="services-our-service service-design">
        <hr class="services-divider" />
        {/* <h3>DESIGN</h3> */}
        <h2 id="services-design">Manufacturers</h2>
        <div class="services-our-service-container">
          <div class="services-our-service-image-container">
            <img src={manufactureImg} alt="" />
          </div>
          <div class="services-our-service-content">
            <div class="services-our-service-text">
              <p>
              At InstiBuzz, we place great importance on 
              the quality of our tees as it reflects our 
              promise to customers. We actively seek partnerships 
              with manufacturers who can deliver cost-effective solutions, 
              timely production, and superior materials for our designs. 
              This ensures that our customers receive nothing but the best when they choose Instibuzz products.
              </p>
        <br />
              <a href="https://docs.google.com/document/d/1IAJsP1q5BydXkbTgSDKjnPaim7orpbK_bY1gmqEtfMY/edit" target="_blank">View JD</a>
            </div>
          </div>
        </div>
      </div>
      <div class="services-our-service service-sales">
        <hr class="services-divider" />
        {/* <h3>SALES</h3> */}
        <h2 id="services-sales">Videographers</h2>
        <div class="services-our-service-container">
          <div class="services-our-service-image-container">
            <img src={videoImg} alt="" />
          </div>
          <div class="services-our-service-content">
            <div class="services-our-service-text">
              <p>
              As part of Instibuzz's videography team, 
              you'll dive into the world of shooting and editing
               engaging videos and photos. Your role extends beyond creativity
                as you join our Social Media Marketing Team, actively enhancing our presence 
                and engagement across diverse social media channels.
              </p>
        <br />
              <a href="https://docs.google.com/document/d/1LIicLL3SwY5OxUY-HUBOYAYpdeeALGb__oiNbOpc6wg/edit" target="_blank">View JD</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="services-contact-btn-container">
        <h2>Interested?</h2>
        <button className="contact-btn" onClick={() => {navigate('/collabForm')}}>Apply Now</button>
      </div>
    </div>
  );
}

export default Collab;
