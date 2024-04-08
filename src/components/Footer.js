import '../css/Footer.css'
import logo from '../assets/973300f3-c585-48d9-9e8c-601a3ae24121.png'
// import React from 'react'

function Footer() {
    return (
        <>
          <div className="footer">
            <div className="footer-content">
              <div className="footer-logo">
                <img src={logo} alt="InstiBuzz Logo"></img>
              </div>
              <div className="footer-useful-links">
                <ul className="footer-list">
                  <h3>Useful Links</h3>
                  <li>
                    <a href="/">Home</a>
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
              <div className="footer-contact">
                <h3>Contact</h3>
                <div className="footer-address">
                  <i className="fa fa-location-dot"></i>
                  <p>IIT Madras, Chennai-600036.</p>
                </div>
                <hr></hr>
                <div className="footer-phone">
                  +91 99444 87273
                </div>
                <div className="footersocial">
                  <a href="https://www.instagram.com/insti_buzz/"><i className="fa fa-instagram"></i></a>
                  <a href="https://in.linkedin.com/company/insti-buzz"><i className="fa fa-linkedin"></i></a>
                  <a href="https://www.instibuzz.com/#"><i className="fa fa-google"></i></a>
                </div>
              </div>
            </div>
            <p className="footer-copyright">InstiBuzz @ 2024</p>
          </div>
        </>
      );
    
}

export default Footer