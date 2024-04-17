import React, { useEffect } from 'react';
import '../css/AboutUs.css';
import HappyCustomer from '../assets/happy customer.png';
import image from '../assets/Image by Javier Allegue Barros.webp';
import shipment from '../assets/shipment.png';
import team from '../assets/team.webp';
import member1 from '../assets/photo1712847883.jpeg';

function AboutUs() {
    return (
        <div class="about-main-container">
            <div class="about-title">
                <h1>About</h1>
            </div>
            <div class="about-our-story">
                <div class="about-our-story-image-container">
                    <img src={image} alt="" />
                </div>
                <div class="about-our-story-text">
                    <div class="about-our-story-title">
                        <h2>Our Story</h2>
                    </div>
                    <div class="about-our-story-content">
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer. It’s an opportunity
                            to tell the story behind the business or describe a special
                            service or product it offers. You can use this section to share
                            the company history or highlight a particular feature that sets it
                            apart from competitors. <br />
                            <br />
                            Let the writing speak for itself. Keep a consistent tone and voice
                            throughout the website to stay true to the brand image and give
                            visitors a taste of the company’s values and personality.
                        </p>
                    </div>
                </div>
            </div>
            <div class="about-creating-impact">
                <h2>Creating Impact</h2>
                <hr />
                <div class="about-creating-impact-card-container">
                    <div class="about-creating-impact-card">
                        <img src="" alt="" />
                        <h3>Add a title</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer. It’s an opportunity
                            to tell the story behind the business or describe a special
                            service or product it offers.
                        </p>
                    </div>
                    <div class="about-creating-impact-card">
                        <img src="" alt="" />
                        <h3>Add a title</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer. It’s an opportunity
                            to tell the story behind the business or describe a special
                            service or product it offers.
                        </p>
                    </div>
                    <div class="about-creating-impact-card">
                        <img src="" alt="" />
                        <h3>Add a title</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer. It’s an opportunity
                            to tell the story behind the business or describe a special
                            service or product it offers.
                        </p>
                    </div>
                    <div class="about-creating-impact-card">
                        <img src="" alt="" />
                        <h3>Add a title</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer. It’s an opportunity
                            to tell the story behind the business or describe a special
                            service or product it offers.
                        </p>
                    </div>
                </div>
            </div>
            <div class="about-separator"></div>
            <div class="about-in-numbers">
                <h2><u>InstiBuzz in numbers</u></h2>
                <div class="about-in-numbers-grid">
                    <div class="about-blank-div-1"></div>
                    <div class="about-in-numbers-card happy-customer-card">
                        <img src={HappyCustomer} alt="Happy customer" />
                        <h3>0000</h3>
                        <p>Happy Customers</p>
                    </div>
                    <div class="about-blank-div-2"></div>
                    <div class="about-in-numbers-card items-shipped-card">
                        <img src={shipment} alt="Items shipped" />
                        <h3>0000</h3>
                        <p>Items shipped</p>
                    </div>
                    <div class="about-blank-div-3"></div>
                    <div class="about-in-numbers-card team-card">
                        <img src={team} alt="Team" />
                        <h3>0000</h3>
                        <p>Team</p>
                    </div>
                </div>
            </div>
            <div class="about-testimonials">
                <h2>Testimonials</h2>
            </div>
            <div class="about-our-team">
                <div class="about-our-team-title">
                    <h2>Our Team</h2>
                </div>
                <div class="about-our-team-content">
                    <p>
                        This is a space to share more about the business: who's behind it,
                        what it does and what this site has to offer. It’s an opportunity to
                        tell the story behind the business or describe a special service or
                        product it offers. It’s an opportunity to tell the story behind the
                        business or describe a special service or product it offers.
                    </p>
                </div>
                <div class="about-team-grid">
                    <div class="about-team-member-card">
                        <h2>Name</h2>
                        <h3>Designation</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer.
                        </p>
                        <img src={member1} alt="" />
                    </div>
                    <div class="about-team-member-card">
                        <h2>Name</h2>
                        <h3>Designation</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer.
                        </p>
                        <img src={member1} alt="" />
                    </div>
                    <div class="about-team-member-card">
                        <h2>Name</h2>
                        <h3>Designation</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer.
                        </p>
                        <img src={member1} alt="" />
                    </div>
                    <div class="about-team-member-card">
                        <h2>Name</h2>
                        <h3>Designation</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer.
                        </p>
                        <img src={member1} alt="" />
                    </div>
                    <div class="about-team-member-card">
                        <h2>Name</h2>
                        <h3>Designation</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer.
                        </p>
                        <img src={member1} alt="" />
                    </div>
                    <div class="about-team-member-card">
                        <h2>Name</h2>
                        <h3>Designation</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer.
                        </p>
                        <img src={member1} alt="" />
                    </div>
                    <div class="about-team-member-card">
                        <h2>Name</h2>
                        <h3>Designation</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer.
                        </p>
                        <img src={member1} alt="" />
                    </div>
                    <div class="about-team-member-card">
                        <h2>Name</h2>
                        <h3>Designation</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer.
                        </p>
                        <img src={member1} alt="" />
                    </div>
                    <div class="about-team-member-card">
                        <h2>Name</h2>
                        <h3>Designation</h3>
                        <p>
                            This is a space to share more about the business: who's behind it,
                            what it does and what this site has to offer.
                        </p>
                        <img src={member1} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs