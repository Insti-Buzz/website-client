import React, { useEffect } from "react";
import "../css/AboutUs.css";
import inNumbers from "../assets/in numbers.webp";
import image from "../assets/Image by Javier Allegue Barros.webp";
import anshu from "../assets/anshu.jpg";
import yashika from "../assets/yashiika.jpg";
import radha from "../assets/radha.jpg";
import dikshant from "../assets/dikshant.jpg";
import anantu from "../assets/anantu.jpg";
import aayush from "../assets/aayush.jpg";
import piyush from "../assets/piyush.jpg";
import jujhar from "../assets/jujhar.jpg";
import parth from "../assets/parth.jpg";

import cultureImg from'../assets/Culture.jpg'
import integrationImg from'../assets/Integration.jpg'
import visibilityImg from'../assets/Visibility.jpg'
import communityImg from'../assets/Community.jpg'

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
    <div class="about-main-container">
      <div class="about-title">
        <h1>About Us</h1>
      </div>
      <div class="about-intro">
        Welcome to the ‘About Us’ page. Thank you for taking out your valuable
        time and trying to learn about our journey.
      </div>
      <div class="about-our-story">
        <hr class="about-divider" />
        {/* <div class="about-our-story-title">
          <h2>Our Story</h2>
        </div>
        <div class="about-our-story-image-container">
          <img src={image} alt="" />
        </div>
        <div class="about-our-story-text">
      </div> */}
        <h3>OUR STORY</h3>
        <h2>The Beginning of Our Journey</h2>
        <div class="about-our-story-container">
          <div class="about-our-story-image-container">
            <img src={image} alt="" />
          </div>
          <div class="about-our-story-content">
            <div class="about-our-story-text">
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
      </div>
      <div class="about-creating-impact">
        <hr class="about-divider" />
        <h3>CREATING IMPACT</h3>
        <h2>Why Us?</h2>
        <div class="about-creating-impact-card-container">
          <div class="about-creating-impact-card">
            <img src={integrationImg} alt="" />
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
            <img src={communityImg} alt="" />
            <h3>Build Fashion Communities</h3>
            <p>
              Our goal is to cultivate a vibrant community that celebrates
              college cultures through fashion. Moreover, we're dedicated to
              building a network of designers who design t-shirts that capture
              and honor the essence of each college's cultural identity.
            </p>
          </div>
          <div class="about-creating-impact-card">
            <img src={cultureImg} alt="" />
            <h3>Fostering Campus Culture</h3>
            <p>
              Building an environment where every student feels a sense of
              belonging to their college and treasures the memories made during
              their collegiate experience.
            </p>
          </div>
          <div class="about-creating-impact-card">
            <img src={visibilityImg} alt="" />
            <h3>Enhancing Visiblity</h3>
            <p>
              Collaborating with various college clubs, festivals, and events,
              showcasing them on our website to boost their footfall and drive
              their sales.
            </p>
          </div>
        </div>
      </div>
      <div class="about-in-numbers">
        <hr class="about-divider-numbers about-divider" />
        <h3>US IN NUMBERS</h3>
        <h2>Still Counting...</h2>
        <div class="about-in-numbers-grid">
          <div class="founded about-in-numbers-card">
            <h3>Founded</h3>
            <h2>2024</h2>
          </div>
          <div class="team about-in-numbers-card">
            <h3>Team</h3>
            <h2>25+</h2>
          </div>
          <div class="items-shipped about-in-numbers-card">
            <h3>Items Shipped</h3>
            <h2>2500+</h2>
          </div>
          <div class="img-container">
            <img src={inNumbers} alt=""></img>
          </div>
          {/* <div class="happy-customers about-in-numbers-card">
            <h3>Happy Customers</h3>
            <h2>1000+</h2>
          </div> */}
        </div>
      </div>
      {/* <div class="about-testimonials">
        <hr class="about-divider" />
        <h3>TESTIMONIALS</h3>
        <h2>Why People Choose Us</h2>
      </div> */}
      <div class="about-our-team">
        <hr class="about-divider" />
        <h3>OUR TEAM</h3>
        <h2>Meet the Founders</h2>
        <div class="about-our-team-content">
          {/* <p>
            This is a space to share more about the business: who's behind it,
            what it does and what this site has to offer. It’s an opportunity to
            tell the story behind the business or describe a special service or
            product it offers. It’s an opportunity to tell the story behind the
            business or describe a special service or product it offers.
          </p> */}
        </div>
        <div class="about-team-grid">
          <div class="about-team-member-card">
            <img src={parth} alt="" />
            <h2>Parth Bajpai</h2>
            <h3>Chief Executive Officer</h3>
          </div>
          <div class="about-team-member-card">
            <img src={radha} alt="" />
            <h2>Radha Agrawal</h2>
            <h3>Chief Strategy Officer</h3>
          </div>
          <div class="about-team-member-card">
            <img src={piyush} alt="" />
            <h2>Piyush Dalmia</h2>
            <h3>Chief Operations Officer</h3>
          </div>
          <div class="about-team-member-card">
            <img src={anshu} alt="" />
            <h2>Anshu Patel</h2>
            <h3>Operations Head </h3>
          </div>
          <div class="about-team-member-card">
            <img src={yashika} alt="" />
            <h2>Yashika Sahu</h2>
            <h3>Design Head</h3>
          </div>
          <div class="about-team-member-card">
            <img src={dikshant} alt="" />
            <h2>Dikshant Aggarwal</h2>
            <h3>Chief Technical Officer</h3>
          </div>
          <div class="about-team-member-card">
            <img src={aayush} alt="" />
            <h2>Aayush Chodhary</h2>
            <h3>Chief Marketing Officer</h3>
          </div>
          <div class="about-team-member-card">
            <img src={anantu} alt="" />
            <h2>Anantu S Pai</h2>
            <h3>Technical Head</h3>
          </div>
          <div class="about-team-member-card">
            <img src={jujhar} alt="" />
            <h2>Jujhar Singh Channa</h2>
            <h3>Technical Head</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
