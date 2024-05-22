// import React from 'react'
import "../css/Footer.css";
import logo from "../assets/973300f3-c585-48d9-9e8c-601a3ae24121.png";
import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  const toAbout = () => {
    navigate("/about");
  };

  return (
    <>
      <div className="footer">
        <div class="footer-content">
          <div class="footer-logo">
            <img src={logo} alt="InstiBuzz Logo"></img>
          </div>
          <div class="footer-policies">
            <ul class="footer-list">
              <h3>Useful Links</h3>
              <li>
                <a href="/faqs">FAQs</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/ticket">Contact Us</a>
              </li>
              <li>
                <a href="/collabForm">Collab with us</a>
              </li>
            </ul>
          </div>
          <div class="footr-useful-links">
            <ul class="footer-list">
              <h3>Policies</h3>
              <li>
                <a href="/terms-conditions">Terms & Conditions</a>
              </li>
              <li>
                <a href="/exchange">Exchange Policy</a>
              </li>
              <li>
                <a href="/shipping">Shipping Policy</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div class="footer-contact">
            <h3>Contact</h3>
            <div class="footer-address">
              <i class="fa fa-map-marker"></i>
              <p style={{ display: "inline-block", marginLeft: "7px" }}>
                IIT Madras, Chennai-600036.
              </p>
            </div>
            <hr className="horizontal-rule" ></hr>
            <div class="footer-phone">
              <i class="fa fa-phone"></i>
              <p style={{ display: "inline-block", marginLeft: "7px" }}>
                +91 99444 87273
              </p>
            </div>
            <div class="footer-social">
              <a rel="noreferrer" href="https://wa.me/9944487273" target="_blank">
                <i className="fa fa-whatsapp" aria-hidden="true"  style={{color:"green"}}></i>
              </a>
              <a rel="noreferrer" href="https://www.instagram.com/insti_buzz/" target="_blank">
                <i className="fa fa-instagram"></i>
              </a>
              <a
                rel="noreferrer"
                href="https://www.linkedin.com/company/insti-buzz/"
                target="_blank"
                // style={{backgroundColor:"skyblue"}}
              >
                <i className="fa fa-linkedin" style={{color:"#0676a8"}}></i>
              </a>
              <a href="mailto:instibuzziitm@gmail.com">
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <p class="footer-copyright">InstiBuzz Private Limited @ 2024</p>
      </div>
    </>
  );
}

export default Footer;
