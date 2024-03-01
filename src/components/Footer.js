// import React from 'react'
import '../css/Footer.css';

function Footer() {
  return (
    <>
      <div className="footer-footer">

        <div className="footer-divider-container">
            <div className="footer-divider"></div>
        </div>

        <div className="footer-logo-container">
          <h1 className="footer-logo">InstiBuzz</h1>
        </div>
        
        <div className="footer-information">
            <div className="footer-address">
              <p className="footer-address-title">Location</p>
              <p className="footer-location">IIT Madras, Chennai <br/> 
                  Pin 600036 <br/> <br/>
                  instibuzziitm@gmail.com </p>
            </div>

            <div className="footer-menu">
              <p className="footer-menu-title">Menu</p>
              <div className="footer-menu-links">
                <a href="" className="footer-home">Home</a>
                <a href="" className="footer-shop">Shop</a>
                <a href="" className="footer-blog">Blog</a>
                <a href="" className="footer-about">About</a>
              </div>
            </div>
            
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
                <a href="" className="footer-instagram">Instagram</a>
                <a href="" className="footer-linkedin">LinkedIn</a>
                <a href="" className="footer-mail">E-mail</a>
              </div>
            </div>
            
            <div className="footer-contact">
              <p className="footer-form-title">We`d Love to Hear From You !</p>
              <div className="footer-form-container">
                <form action="" className="footer-form">
                  
                  <div className="footer-name-email-container">
                    <div className="footer-name-container">
                      <label htmlFor="" className="footer-name">Name *</label><br/>
                      <input type="text" className="footer-input-name" required />
                    </div>
                    
                    <div className="footer-email-container">
                      <label htmlFor="" className="footer-email">Email Address *</label><br/>
                      <input type="text" className="footer-input-email" required />
                    </div>
                  </div>
                  
                  <div className="footer-msg-container">
                    <label htmlFor="" className="footer-msg">Send us a Message </label><br/>
                    <textarea type="text" className="footer-input-msg" rows={5} cols={45} maxLength={225}/>
                  </div>
                  
                  <button type='submit' className='footer-submit-button'>Submit</button>
                </form>
              </div>
              
            </div>
        </div>
      
      </div>
    </>
  )
}

export default Footer
