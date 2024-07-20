import React, { useEffect } from "react";
import "../css/AboutUs.css";
import ourStory from "../assets/About us/ourStory.svg";
import anshu from "../assets/anshu.jpg";
import yashika from "../assets/yashiika.jpg";
import radha from "../assets/radha.jpg";
import dikshant from "../assets/dikshant.jpg";
import anantu from "../assets/anantu.jpg";
import aayush from "../assets/aayush.jpg";
import piyush from "../assets/piyush.jpg";
import jujhar from "../assets/jujhar.jpg";
import parth from "../assets/parth.jpg";
import cultureImg from '../assets/About us/Culture.png';
import integrationImg from '../assets/About us/Integration.png';
import visibilityImg from '../assets/About us/Visibility.png';
import communityImg from '../assets/About us/Community.png';
import team from "../assets/About us/Team.png";
import founded from "../assets/About us/Founded.png";
import shipment from "../assets/About us/shipment.png";

import { Helmet } from "react-helmet";

function AboutUs() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    // const scrollToTop = () => {
    // }
  }, []);

  return (
    <>
      <Helmet>
        <meta name="title" content="About Us" />
        <meta name="description" content="Welcome to the About Us page. Thank you for taking out your valuable time and trying to learn about our journey." />
        <meta name="keywords" content="InstiBuzz, instibuzz, IIT Madras, College Fashion, College Culture" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="all" />

        <meta name="og:site_name" content="InstiBuzz" />
        <meta name="og:title" content="About Us" />
        <meta name="og:description" content="Welcome to the About Us page. Thank you for taking out your valuable time and trying to learn about our journey." />
        <meta name="og:url" content="https://www.instibuzz.com/about" />
        <meta name="og:image" content="%PUBLIC_URL%/logo192.png" />
        <meta name="og:image:alt" content="Official logo of InstiBuzz Pvt Ltd." />
        <meta name="author" content="instibuzz" />
      </Helmet>
      <div class="about-main-container">
        <div class="about-title">
          <h1>About Us</h1>
          <p>
            Welcome to the ‘About Us’ page. Thank you for taking out your valuable
            time and trying to learn about our journey.
          </p>
        </div>
        <div class="about-our-story about-section">
          {/* <hr class="about-divider" /> */}
          {/* <div class="about-our-story-title">
          <h2>Our Story</h2>
          </div>
        <div class="about-our-story-image-container">
        <img src={image} alt="" />
        </div>
        <div class="about-our-story-text">
      </div> */}
          <div class="about-our-story-container">
            <div class="about-our-story-content">
              <div className="about-section-title">
                <div className="about-section-title-design"></div>
                <p>OUR STORY</p>
                <div className="about-section-title-design"></div>
              </div>
              <div class="about-our-story-text">
                <h2>The Beginning of Our Journey</h2>
                <div className="about-our-story-text-desktop">
                  <p>
                    The idea of InstiBuzz was born on 16th January 2024 in the minds
                    of a bunch of people who vibe and love to live their college
                    life. As explorers, we started with the thought of coalescing
                    their campus stories with fashion. Soon we shaped this entire
                    idea in the form of InstiBuzz and started infusing campus
                    essence, hostel slang, and college memories, in the form of
                    trendy and captivating styles for their college. A set of
                    designs bound to resonate with the college vibes.
                    <br />
                    <br />
                    We set out to get the ideal tees for college fests, inter-hostel
                    events, college clubs, and personalized clothing that represents
                    the culture of each college. Our journey began with a simple
                    question: "Why not?”.
                    <br />
                    <br />
                    We aim to build InstiBuzz not just like any other brand, but a
                    vibrant community of creative minds dedicated to bringing your
                    fashion dreams to life. From conceptualization to production and
                    sales, InstiBuzz is your all-in-one campus-based fashion hub.
                  </p>
                </div>
              </div>
            </div>
            <div class="about-our-story-image-container">
              <img src={ourStory} alt="Silhouette of multiple people during sunset" />
            </div>
            <div class="about-our-story-text about-our-story-text-mobile">
              <p>
                The idea of InstiBuzz was born on 16th January 2024 in the minds
                of a bunch of people who vibe and love to live their college
                life. As explorers, we started with the thought of coalescing
                their campus stories with fashion. Soon we shaped this entire
                idea in the form of InstiBuzz and started infusing campus
                essence, hostel slang, and college memories, in the form of
                trendy and captivating styles for their college. A set of
                designs bound to resonate with the college vibes.
                <br />
                <br />
                We set out to get the ideal tees for college fests, inter-hostel
                events, college clubs, and personalized clothing that represents
                the culture of each college. Our journey began with a simple
                question: "Why not?”.
                <br />
                <br />
                We aim to build InstiBuzz not just like any other brand, but a
                vibrant community of creative minds dedicated to bringing your
                fashion dreams to life. From conceptualization to production and
                sales, InstiBuzz is your all-in-one campus-based fashion hub.
              </p>
            </div>
          </div>
        </div>
        <div class="about-creating-impact about-section">
          <div className="about-section-title">
            <div className="about-section-title-design"></div>
            <p>CREATING IMPACT</p>
            <div className="about-section-title-design"></div>
          </div>
          <h2>Why Us?</h2>
          <div class="about-creating-impact-card-container">
            <div class="about-creating-impact-card">
              <img src={integrationImg} alt="ClipArt for integration" />
              <h3>
                Integrated <br /> Solution
              </h3>
              <p>
                We're developing a one-stop online platform where we oversee the
                entire process, from product design and manufacturing to sales and
                distribution, offering a seamless experience for our customers.
              </p>
            </div>
            <div class="about-creating-impact-card">
              <img src={cultureImg} alt="clipart for unity and education" />
              <h3>Fostering Campus <br /> Culture</h3>
              <p>
                Building an environment where every student feels a sense of
                belonging to their college and treasures the memories made during
                their collegiate experience.
              </p>
            </div>
            <div class="about-creating-impact-card">
              <img src={communityImg} alt="ClipArt for connecting people" />
              <h3>Build Fashion <br /> Communities</h3>
              <p>
                Our goal is to cultivate a vibrant community that celebrates
                college cultures through fashion. Moreover, we're dedicated to
                building a network of designers who design t-shirts that capture
                and honor the essence of each college's cultural identity.
              </p>
            </div>
            <div class="about-creating-impact-card">
              <img src={visibilityImg} alt="clipart for e-advertising " />
              <h3>Enhancing <br /> Visiblity</h3>
              <p>
                Collaborating with various college clubs, festivals, and events,
                showcasing them on our website to boost their footfall and drive
                their sales.
              </p>
            </div>
          </div>
        </div>
        <div class="about-in-numbers">
          <div className="about-in-numbers-content">
            <img src={team} />
            <h4>Team</h4>
            <p>25+</p>
          </div>
          <div className="about-in-numbers-content about-in-numbers-founded">
            <img src={founded} />
            <h4>Founded</h4>
            <p>2024</p>
          </div>
          <div className="about-in-numbers-content">
            <img src={shipment} />
            <h4>Items Shipped</h4>
            <p>2500+</p>
          </div>
        </div>
        {/* <div class="about-testimonials">
        <hr class="about-divider" />
        <h3>TESTIMONIALS</h3>
        <h2>Why People Choose Us</h2>
      </div> */}
        <div class="about-our-team about-section">
          <div className="about-section-title">
            <div className="about-section-title-design"></div>
            <p>OUR TEAM</p>
            <div className="about-section-title-design"></div>
          </div>
          <h2>Meet the Founders</h2>
          <div class="about-team-grid">
            <div class="about-team-member-card">
              <img src={parth} alt="Parth Bajpai: Chief Executive Officer" />
              <h2>Parth Bajpai</h2>
              <h3>Chief Executive Officer</h3>
            </div>
            <div class="about-team-member-card">
              <img src={radha} alt="Radha Agrawal: Chief Strategy Officer" />
              <h2>Radha Agrawal</h2>
              <h3>Chief Strategy Officer</h3>
            </div>
            <div class="about-team-member-card">
              <img src={piyush} alt="Piyush Dalmia: Chief Operations Officer" />
              <h2>Piyush Dalmia</h2>
              <h3>Chief Operations Officer</h3>
            </div>
            <div class="about-team-member-card">
              <img src={anshu} alt="Anshu Patel: Operations Head" />
              <h2>Anshu Patel</h2>
              <h3>Operations Head </h3>
            </div>
            <div class="about-team-member-card">
              <img src={yashika} alt="Yashika Sahu: Design Head" />
              <h2>Yashika Sahu</h2>
              <h3>Design Head</h3>
            </div>
            <div class="about-team-member-card">
              <img src={dikshant} alt="Dikshant Aggarwal: Chief Technical Officer" />
              <h2>Dikshant Aggarwal</h2>
              <h3>Chief Technical Officer</h3>
            </div>
            <div class="about-team-member-card">
              <img src={aayush} alt="Aayush Chodhary: Chief Marketing Officer" />
              <h2>Aayush Chodhary</h2>
              <h3>Chief Marketing Officer</h3>
            </div>
            <div class="about-team-member-card">
              <img src={anantu} alt="Anantu S Pai: Technical Head" />
              <h2>Anantu S Pai</h2>
              <h3>Technical Head</h3>
            </div>
            <div class="about-team-member-card">
              <img src={jujhar} alt="Jujhar Singh Channa: Technical Head" />
              <h2>Jujhar Singh Channa</h2>
              <h3>Technical Head</h3>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default AboutUs;
