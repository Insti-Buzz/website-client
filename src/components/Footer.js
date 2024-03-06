// import React from 'react'
import '../css/Footer.css';

function Footer() {
  return (
    <>
      <div className="footer">

        <div className="footer-divider-container">
            <div className="footer-divider"></div>
        </div>

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
                <a href='https://www.instagram.com/insti_buzz?igsh=MW5uN3R6ZzE3cHhwbQ==' className="fa fa-instagram" aria-hidden="true"></a>
                <a href='https://www.linkedin.com/company/101586554/admin/feed/posts/' className="fa fa-linkedin" aria-hidden="true"></a>
                <a href='instibuzziitm@gmail.com' className="fa fa-google" aria-hidden="true"></a>
              </div>
            </div>
          
          </div>
          
          {/* <div className="information-right">

            <div className="contact">
              <p className="contact-title">We`d Love to Hear From You !</p>
                <form action="" className="form">
                  
                  <div className="name-email-container">
                    <div className="name-container">
                      <label htmlFor="" className="name">Name *</label><br/>
                      <input type="text" className="input-name" required />
                    </div>
                    
                    <div className="email-container">
                      <label htmlFor="" className="email">Email Address *</label><br/>
                      <input type="text" className="input-email" required />
                    </div>
                  </div>
                  
                  <div className="msg-container">
                    <label htmlFor="" className="msg">Send us a Message </label><br/>
                    <textarea type="text" className="input-msg" rows={5} cols={45} maxLength={225}/>
                  </div>
                  
                  <button type='submit' className='submit-button'>Submit</button>
                </form>
              
            </div>
          </div> */}
            
        </div>
      
      </div>
    </>
  )
}

export default Footer