// import React from 'react'
import "../css/Footer.css";
import logo from "../assets/973300f3-c585-48d9-9e8c-601a3ae24121.png";
import { useNavigate } from "react-router";

function Footer() {
  const navigate=useNavigate()

  const toHome=()=>{
    navigate('/')
  }

  const toAbout=()=>{
    navigate('/about')
  }

  return (
    <>
      <div className="footer">
        <div class="footer-content">
          <div class="footer-logo">
            <img src={logo} alt="InstiBuzz Logo"></img>
          </div>
          <div class="footr-useful-links">
            <ul class="footer-list">
              <h3>Useful Links</h3>
              <li>
                <a href='/'>Home</a>
              </li>
              {/* <li>
                <a href='/about'>About Us</a>
              </li> */}
              <li>
                <a href='/exchange'>Exchange Policy</a>
              </li>
              <li>
                <a href="/terms-conditions">Terms & Conditions</a>
              </li>
              <li>
                <a href="/shipping">Shipping Policy</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/ticket">Contact Us</a>
              </li>
            </ul>
          </div>
          <div class="footer-contact">
            <h3>Contact</h3>
            <div class="footer-address">
              <i class="fa fa-location-dot"></i>
              <p>IIT Madras, Chennai-600036.</p>
            </div>
            <hr></hr>
            <div class="footer-phone">
              +91 99444 87273
            </div>
            <div class="footer-social">
              <a href="https://www.instagram.com/insti_buzz/" target="_blank"><i class="fa fa-instagram"></i></a>
              <a href="https://www.linkedin.com/company/insti-buzz/" target="_blank"><i class="fa fa-linkedin"></i></a>
              <a href="mailto:instibuzziitm@gmail.com"><i class="fa fa-google"></i></a>
            </div>
            
          </div>
        </div>
        <p class="footer-copyright">InstiBuzz @ 2024</p>
      </div>
    </>
  );
}

export default Footer;