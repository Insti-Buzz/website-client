// import React from 'react'
import '../css/Footer.css';

function Footer() {
  return (
    <>
      <div className="footer">

        {/* <div className="footer-divider-container">
            <div className="footer-divider"></div>
        </div> */}

        <div className="footer-logo-container">
          <h1 className="footer-logo">InstiBuzz</h1>
        </div>
        
        <div className="footer-information">
          <div className="footer-information-left">

            <div className="footer-address">
              <p className="footer-address-title">Location</p>
              <p className="footer-location">IIT Madras, Chennai <br/> <br/> 
                  Pin 600036 <br/> <br/>
                  instibuzziitm@gmail.com </p>
            </div>

            {/* <div className="footer-menu">
              <p className="footer-menu-title">Menu</p>
              <div className="footer-menu-links">
                <a href="" className="footer-home">Home</a>
                <a href="" className="footer-shop">Shop</a>
                <a href="" className="footer-blog">Blog</a>
                <a href="" className="footer-about">About</a>
              </div>
            </div> */}
            
            <div className="footer-policies">
              <p className="footer-policies-title">Policies</p>
              <div className="footer-policies-links">
                <a href="" className="footer-faq">FAQ</a>
                <a href="" className="footer-terms-condition">Terms & Conditions</a>
                <a href="" className="footer-privacy-policy">Privacy Policy</a>
                <a href="" className="footer-shipping">Shipping Policy</a> 
              </div>
            </div>
            
            <div className="footer-social">
              <p className="footer-social-title">Social</p>
              <div className="footer-social-links">
                <a href='https://www.instagram.com/insti_buzz?igsh=MW5uN3R6ZzE3cHhwbQ==' className="fa fa-instagram" aria-hidden="true"></a>
                <a href='https://www.linkedin.com/company/101586554/admin/feed/posts/' className="fa fa-linkedin" aria-hidden="true"></a>
                <a href='instibuzziitm@gmail.com' className="fa fa-google" aria-hidden="true"></a>
                <div className="nothing"></div>
                <div className="nothing"></div>
              </div>
            </div>
          
          </div>

          {/* <div className="footer-information-right">
            <h2 className="footer-information-right-title">Get A Demo</h2>
            <div className="form-container">
              <form action="" className="form">
                
                <div className="email">
                  <label htmlFor="" className="email-label">Email Address*</label>
                  <input type="text" className="email-input" />
                </div>
                
                <div className="name">
                  <label htmlFor="" className="name-label">Name*</label>
                  <input type="text" className="name-input" />
                </div>

                <button className="submit-form">Submit</button>
              </form>
            </div>
          </div> */}
          
            
        </div>
      
      </div>
    </>
  )
}

export default Footer
