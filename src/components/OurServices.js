import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/OurServices.css";
import manufactureImg from '../assets/Manufacturer.jpg'
import designImg from '../assets/Desigining.jpg'
import salesImg from '../assets/Sales.jpg'
import visibilityImg from '../assets/Visibility.jpg'
import { Helmet } from 'react-helmet';

function OurServices() {
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
    <>
      <Helmet>
        <meta name="title" content="Our Services"/>
        <meta name="description" content="At InstiBuzz, our commitment extends beyond the mere creation of the final product; we deeply value the entire journey from conceptualization to delivery, ensuring excellence in every step." />
        <meta name="keywords" content="InstiBuzz, instibuzz, IIT Madras, College Fashion, College Culture" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="all"/>
        
        <meta name="og:site_name" content="InstiBuzz"/>
        <meta name="og:title" content="Our Services Page"/>
        <meta name="og:description" content="At InstiBuzz, our commitment extends beyond the mere creation of the final product; we deeply value the entire journey from conceptualization to delivery, ensuring excellence in every step."/>
        <meta name="og:url" content="https://www.instibuzz.com/ourServices" />
        <meta name="og:image" content="%PUBLIC_URL%/logo192.png"/>
        <meta name="og:image:alt" content="Official logo of InstiBuzz Pvt Ltd."/>
        <meta name="author" content="instibuzz" />        
      </Helmet>
    <div class="services-main-container">
      <div class="services-title">
        <h1>Our Services</h1>
      </div>
      <div class="services-intro">
        At InstiBuzz, our commitment extends beyond the mere creation of the
        final product; we deeply value the entire journey from conceptualization
        to delivery, ensuring excellence in every step.
      </div>
      <div class="services-our-service service-manufacturing">
        <hr class="services-divider" />
        {/* <h3>MANUFACTURING</h3> */}
        <h2 id="services-manufacturing">Manufacturing</h2>
        <div class="services-our-service-container">
          <div class="services-our-service-image-container">
            <img src={manufactureImg} alt="Picture of a stitching machine" />
          </div>
          <div class="services-our-service-content">
            <div class="services-our-service-text">
              <p>
                Starting with the first phase, i.e. Manufacturing, we uphold our
                unwavering dedication to quality. We meticulously source
                materials from esteemed units in Tirupur, renowned for their
                superior quality fabrics knitted with utmost care. Through
                efficient and seamless manufacturing processes, we breathe life
                into our captivating taglines and relatable contexts,
                transforming them into tangible products that resonate with our
                customers. For us, a piece of clothing is more than just fabric;
                it's a reflection of our commitment to quality and customer
                happiness. We prioritize affordability every step of the way,
                guaranteeing prompt delivery of our tees. It isn't solely about
                our products; it's about the many customers who trust our
                production methods.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="services-our-service service-design">
        <hr class="services-divider" />
        {/* <h3>DESIGN</h3> */}
        <h2 id="services-design">Design</h2>
        <div class="services-our-service-container">
          <div class="services-our-service-image-container">
            <img src={designImg} alt="Picture depicting the creation of design " />
          </div>
          <div class="services-our-service-content">
            <div class="services-our-service-text">
              <p>
                The second aspect is Design. At InstiBuzz, our products go
                beyond mere fashion - they embody the vibrant essence of college
                life, capturing its lively emotions and memorable moments. Our
                designers carefully blend the spirit of campus life with modern
                fashion trends. Moreover, we extend our design services to
                various campus organizations such as clubs, societies, and event
                committees. By understanding their unique visions and themes, we
                tailor-make t-shirts that perfectly align with their identity
                and purpose. By infusing stylish aesthetics with the essence of
                campus experiences, our t-shirts serve as wearable expressions
                of student life.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="services-our-service service-sales">
        <hr class="services-divider" />
        {/* <h3>SALES</h3> */}
        <h2 id="services-sales">Sales</h2>
        <div class="services-our-service-container">
          <div class="services-our-service-image-container">
            <img src={salesImg} alt="Clipart depicting progress and growth" />
          </div>
          <div class="services-our-service-content">
            <div class="services-our-service-text">
              <p>
                Next is the Sales. Our website is a dynamic platform that
                captures the essence of college life. By seamlessly integrating
                different clubs and organizations of the college that enrich the
                campus experience, we provide a space for them to showcase and
                sell their tees to the entire Insti audience. Our commitment
                goes beyond occasional events or programs; sales are open
                year-round and accessible through our website. This fosters
                collaboration among various campus clubs and acts as a hub for a
                wide range of ideas and designs. Every click brings together a
                multitude of voices, each contributing to the rich and colorful
                fabric of campus life.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="services-our-service service-visibility">
        <hr class="services-divider" />
        {/* <h3>DESIGN</h3> */}
        <h2 id="services-visibility">Visibility</h2>
        <div class="services-our-service-container">
          <div class="services-our-service-image-container">
            <img src={visibilityImg} alt="Clipart depicting the use of social media to reach out to a large number of audience" />
          </div>
          <div class="services-our-service-content">
            <div class="services-our-service-text">
              <p>
                Lastly comes Visibility. We actively support Insti clubs and
                societies by helping them market their events. This involves
                leveraging our website and social media platforms to boost
                visibility and engagement. By highlighting these events and our
                partnerships with them to our broad audience within the
                institution, we amplify the exposure of their events, thus
                expanding their outreach within our communities.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="services-contact-btn-container">
        <button className="contact-btn" onClick={() => {navigate('/ticket')}}>Contact Us</button>
      </div>
    </div>
  </>
  );
}

export default OurServices;
