// import React from 'react'
import "../css/Footer.css";
import logo from "../assets/973300f3-c585-48d9-9e8c-601a3ae24121.png";

function Footer() {
  return (
    <>
      <div className="footer">
        <div class="footer-content">
          <div class="logo">
            <img src={logo} alt="InstiBuzz Logo"></img>
          </div>
          <div class="useful-links">
            <ul class="list">
              <h3>Useful Links</h3>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>
          <div class="contact">
            <h3>Contact</h3>
            <div class="address">
              <i class="fa fa-location-dot"></i>
              <p>IIT Madras, Chennai-600036.</p>
            </div>
            <hr></hr>
            <div class="phone">
              +91 99444 87273 / +91 62966 71347
            </div>
            <div class="social">
              <a href="#"><i class="fa fa-instagram"></i></a>
              <a href="#"><i class="fa fa-linkedin"></i></a>
              <a href="#"><i class="fa fa-google"></i></a>
            </div>
          </div>
        </div>
        <p class="copyright">InstiBuzz @ 2024</p>
      </div>
    </>
  );
}

export default Footer;
