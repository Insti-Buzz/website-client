import React from 'react'
import "../css/Ticket.css"
import img from "../assets/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.avif"

function Ticket() {
    return (
        <div class="ticket-main-container">
            <div class="ticket-title">
                <h1>InstiBuzz</h1>
                <h2>"The All in One Campus <br /> <span>Fashion</span> Brand"</h2>
                <p>Get custom merchandise for events and competitions at the most affordable price. Be it designing,
                    manufacturing or sales, we handle it all. Just ask and we will deliver!</p>
            </div>
            <div class="ticket-img-container">
                <img src={img} alt="" />
            </div>
            <div class="ticket-form">
                <p>Please fill out the following form to reach out to us. We'll get back to you as soon as possible.</p>

                <div class="ticket-input-parameter">
                    <label for="name">Name</label> <br />
                    <input type="text" id="name" name="name" placeholder="Full Name" required /> <br />
                </div>
                <div class="ticket-input-parameter">
                    <label for="email-id">Email address</label> <br />
                    <input type="email" id="email-id" name="email-id" placeholder="example@instibuzz.com" required /> <br />
                </div>
                <div class="ticket-input-parameter">
                    <label for="ph-number">Mobile number</label> <br />
                    <input type="tel" id="ph-number" name="ph-number" placeholder="+91 99444 87273" required /> <br />
                </div>
                <div class="ticket-input-parameter">
                    <label for="requirement">Requirement</label> <br />
                    <textarea name="requirement" id="requirement" rows="3"
                        placeholder="Tell us your wildest t-shirt dreams and the quantity to make them a reality!"
                        required></textarea>
                    <br />
                </div>
                <input type="submit" value="Reach out to us" class="ticket-submit-form" />

            </div>
        </div>

    )
}

export default Ticket
