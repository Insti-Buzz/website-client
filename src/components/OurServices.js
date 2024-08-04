import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/OurServices.css";
import "../css/Cart.css";
import manufactureImg from "../assets/Our Services/manufacturing.svg";
import designImg from "../assets/Our Services/design.svg";
import salesImg from "../assets/Our Services/sales.svg";
import visibilityImg from "../assets/Our Services/visibility.svg";
import manufactureMobileImg from "../assets/Our Services/manufacture_mobile.svg";
import designMobileImg from "../assets/Our Services/design-mobile.svg";
import salesMobileImg from "../assets/Our Services/sales_mobile.svg";
import visibilityMobileImg from "../assets/Our Services/visibility_mobile.svg";
import { Helmet } from "react-helmet";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import decorativeElement from "../assets/Our Services/Decorative element - our services page.png";
import toast from "react-hot-toast";

function OurServices() {
  const navigate = useNavigate();
  const [showServicesPopup, setShowServicesPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [comment, setComment] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState([]);

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

  function handleChange(e) {
    if (e.target.checked) {
      setServiceNeeded([...serviceNeeded, e.target.value]);
    } else {
      setServiceNeeded(serviceNeeded.filter((item) => item !== e.target.value));
    }
  }

  const TicketToast = () => {
    toast.promise(
      Submit(),
      {
        loading: "Sending your request",
        success: (result) => {
          return result.message;
        },
        error: (result) => {
          return result.message;
        },
      },
      {
        id: "loginToast",
      }
    );
  };

  const Submit = async () => {
    if (!name || !email || !number) {
      throw new Error("Enter Details");
      return false;
    }

    let result = await fetch(
      `${process.env.REACT_APP_server_url}/api/v1/auth/raiseTicket`,
      {
        method: "POST",
        body: JSON.stringify({ name, email, number, comment, serviceNeeded }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    result = await result.json();
    console.log(result);
    if (result.status == 404) {
      // alert(result.error)
      throw new Error(result.error);
    } else {
      setShowServicesPopup(false);
      return result;
    }
  };

  return (
    <>
      <Helmet>
        <meta name="title" content="Our Services" />
        <meta
          name="description"
          content="At InstiBuzz, our commitment extends beyond the mere creation of the final product; we deeply value the entire journey from conceptualization to delivery, ensuring excellence in every step."
        />
        <meta
          name="keywords"
          content="InstiBuzz, instibuzz, IIT Madras, College Fashion, College Culture"
        />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="all" />

        <meta name="og:site_name" content="InstiBuzz" />
        <meta name="og:title" content="Our Services Page" />
        <meta
          name="og:description"
          content="At InstiBuzz, our commitment extends beyond the mere creation of the final product; we deeply value the entire journey from conceptualization to delivery, ensuring excellence in every step."
        />
        <meta name="og:url" content="https://www.instibuzz.com/ourServices" />
        <meta name="og:image" content="%PUBLIC_URL%/logo192.png" />
        <meta
          name="og:image:alt"
          content="Official logo of InstiBuzz Pvt Ltd."
        />
        <meta name="author" content="instibuzz" />
      </Helmet>
      <div class="services-desktop-container">
        <div className="services-title">
          <h1>Our Services</h1>
          <p>
            At InstiBuzz, our commitment extends beyond the mere creation of the
            final product; we deeply value the entire journey from
            conceptualization to delivery, ensuring excellence in every step.
          </p>
        </div>
        <div className="services-container">
          <img
            className="services-decorative-element services-decorative-element-1"
            src={decorativeElement}
            alt=""
          />
          <img
            className="services-decorative-element services-decorative-element-2"
            src={decorativeElement}
            alt=""
          />
          <div className="services-section services-manufacturing">
            <img src={manufactureImg} alt="" />
            <div className="services-section-content">
              <h4>MANUFACTURING</h4>
              <p>
                Starting with the first phase, i.e. Manufacturing, we uphold our
                unwavering dedication to quality. We meticulously source
                materials from esteemed units in Tirupur, renowned for their
                superior quality fabrics knitted with utmost care. Through
                efficient and seamless manufacturing processes, we breathe life
                into our captivating taglines and relatable contexts,
                transforming them into tangible products that resonate with our
                customers. For us, a piece of clothing is a reflection of our
                commitment to quality and customer happiness. We prioritize
                affordability every step of the way, guaranteeing prompt
                delivery of our tees. It isn't solely about our products; it's
                about the many customers who trust our production methods.
              </p>
            </div>
          </div>
          <div className="services-section services-design">
            <div className="services-section-content">
              <h4>DESIGN</h4>
              <p>
                The second aspect is Design. At InstiBuzz, our products go
                beyond mere fashion - they embody the vibrant essence of college
                life, capturing its lively emotions and memorable moments. Our
                designers carefully blend the spirit of campus life with modern
                fashion trends. Moreover, we extend our design services to
                various campus organizations such as clubs, societies, and event
                committees. By understanding their unique visions and themes, we
                tailor-make merchandise that perfectly aligns with their
                identity and purpose. By infusing stylish aesthetics with the
                essence of campus experiences, our t-shirts serve as wearable
                expressions of student life.
              </p>
            </div>
            <img src={designImg} alt="" />
          </div>
          <div className="services-section services-sales">
            <img src={salesImg} alt="" />
            <div className="services-section-content">
              <h4>SALES</h4>
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
          <div className="services-section services-design">
            <div className="services-section-content">
              <h4>VISIBILITY</h4>
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
            <img src={visibilityImg} alt="" />
          </div>
          <div className="services-btn">
            <button onClick={() => setShowServicesPopup(true)}>
              GET OUR SERVICES
            </button>
          </div>
          {showServicesPopup && (
            <div className="services-popup-background">
            <div className="services-popup">
              <div className="services-popup-close-btn">
                <IconButton onClick={() => setShowServicesPopup(false)}>
                  <CloseIcon />
                </IconButton>
              </div>
              <h3>Get Our Services</h3>
              <div className="our-services-form">
                <div class="service-input-parameter">
                  <label for="name">Name</label> <br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div class="service-input-parameter">
                  <label for="ph-number">Contact number</label> <br />
                  <input
                    type="tel"
                    id="ph-number"
                    name="ph-number"
                    placeholder="Contact Number"
                    onChange={(e) => setNumber(e.target.value)}
                    required
                  />
                </div>
                <div class="service-input-parameter">
                  <label for="email-id">Email</label> <br />
                  <input
                    type="email"
                    id="email-id"
                    name="email-id"
                    placeholder="instibuzziitm@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div class="service-checkbox">
                  <p>Services needed</p>
                  <div class="service-services-input">
                    <div>
                      <input
                        type="checkbox"
                        id="manufacturing"
                        name="service"
                        value="manufacturing"
                        onChange={handleChange}
                      />
                      <label for="service">Manufacturing</label> <br />
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="design"
                        name="service"
                        value="design"
                        onChange={handleChange}
                      />
                      <label for="service">Design</label> <br />
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="sales"
                        name="service"
                        value="sales"
                        onChange={handleChange}
                      />
                      <label for="service">Sales</label> <br />
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="visibility"
                        name="service"
                        value="visibility"
                        onChange={handleChange}
                      />
                      <label for="service">Visibility</label> <br />
                    </div>
                  </div>
                </div>
                <div class="service-input-parameter">
                  <label for="requirement">Message</label> <br />
                  <textarea
                    name="requirement"
                    id="requirement"
                    rows="3"
                    placeholder="Type your message here"
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="services-btn">
                  <button onClick={TicketToast}>SUBMIT</button>
                </div>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
      <div className="services-mobile-container">
        <div className="services-title">
          <h1>Our Services</h1>
          <p>
            At InstiBuzz, our commitment extends beyond the mere creation of the
            final product; we deeply value the entire journey from
            conceptualization to delivery, ensuring excellence in every step.
          </p>
        </div>
        <div className="services-container">
          <img
            className="services-decorative-element services-decorative-element-1"
            src={decorativeElement}
            alt=""
          />
          <img
            className="services-decorative-element services-decorative-element-2"
            src={decorativeElement}
            alt=""
          />
          <div className="services-section">
            <h4>MANUFACTURING</h4>
            <p>
              In the Manufacturing phase, we source high-quality fabrics from
              Tirupur and ensure efficient production, prioritizing
              affordability, quality, and prompt delivery to maintain customer
              trust and satisfaction.
            </p>
            <img src={manufactureMobileImg} alt="" />
          </div>
          <div className="services-section">
            <h4>DESIGN</h4>
            <p>
              At InstiBuzz, our designs capture the vibrant essence of college
              life, blending modern trends with campus spirit, and offering
              custom t-shirts for campus organizations to reflect their unique
              identities and experiences.
            </p>
            <img src={designMobileImg} alt="" />
          </div>
          <div className="services-section">
            <h4>SALES</h4>
            <p>
              Our website is a dynamic platform where college clubs and
              organizations can showcase and sell their tees year-round,
              fostering collaboration and capturing the vibrant essence of
              campus life.
            </p>
            <img src={salesMobileImg} alt="" />
          </div>
          <div className="services-section">
            <h4>VISIBILITY</h4>
            <p>
              We enhance the visibility of insti clubs and societies by
              marketing their events on our website and social media, thereby
              expanding their outreach and engagement within the campus
              community.
            </p>
            <img src={visibilityMobileImg} alt="" />
          </div>
          <div className="services-btn">
            <button onClick={() => setShowServicesPopup(true)}>
              GET OUR SERVICES
            </button>
          </div>
          {showServicesPopup && (
            <div className="services-popup-background">
              <div className="services-popup">
                <div className="services-popup-close-btn">
                  <IconButton onClick={() => setShowServicesPopup(false)}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <h3>Get Our Services</h3>
                <div className="our-services-form">
                  <div class="service-input-parameter">
                    <label for="name">Name</label> <br />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div class="service-input-parameter">
                    <label for="ph-number">Contact number</label> <br />
                    <input
                      type="tel"
                      id="ph-number"
                      name="ph-number"
                      placeholder="Contact Number"
                      onChange={(e) => setNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div class="service-input-parameter">
                    <label for="email-id">Email</label> <br />
                    <input
                      type="email"
                      id="email-id"
                      name="email-id"
                      placeholder="instibuzziitm@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div class="service-checkbox">
                    <p>Services needed</p>
                    <div class="service-services-input">
                      <div>
                        <input
                          type="checkbox"
                          id="manufacturing"
                          name="service"
                          value="manufacturing"
                          onChange={handleChange}
                        />
                        <label for="service">Manufacturing</label> <br />
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="design"
                          name="service"
                          value="design"
                          onChange={handleChange}
                        />
                        <label for="service">Design</label> <br />
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="sales"
                          name="service"
                          value="sales"
                          onChange={handleChange}
                        />
                        <label for="service">Sales</label> <br />
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="visibility"
                          name="service"
                          value="visibility"
                          onChange={handleChange}
                        />
                        <label for="service">Visibility</label> <br />
                      </div>
                    </div>
                  </div>
                  <div class="service-input-parameter">
                    <label for="requirement">Message</label> <br />
                    <textarea
                      name="requirement"
                      id="requirement"
                      rows="3"
                      placeholder="Type your message here"
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="services-btn">
                    <button onClick={TicketToast}>SUBMIT</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OurServices;
