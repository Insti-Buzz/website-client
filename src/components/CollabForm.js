import React, { useEffect, useState } from "react";
import "../css/Ticket.css";
import toast from "react-hot-toast";


function CollabForm() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    // const scrollToTop = () => {
    // }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);
  const [comment, setComment] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [error, setError] = useState(false);
  const [serviceNeeded, setServiceNeeded] = React.useState([]);

  function handleChange(e) {
    if (e.target.checked) {
      setServiceNeeded([...serviceNeeded, e.target.value]);
    } else {
      setServiceNeeded(serviceNeeded.filter((item) => item !== e.target.value));
    }
  }

  const TicketToast = () => toast.promise(Submit(), {
    loading: 'Uploading',
    success: (result) => {
      alert(result.message)
        return result.message;
    },
    error: (result) => {
      alert(result.message)
        return result.message
    },
},{
    id:'loginToast'
});


  const Submit = async () => {
    // console.log(name);
    // console.log(email);
    // console.log(number);
    // console.log(serviceNeeded);
    // console.log(comment);

    if (!name || !email || !number) {
      setError(true);
      throw new Error("Enter Details");
      return false;
    }

   
    let result = await fetch(
      `${process.env.REACT_APP_server_url}/api/v1/auth/collabForm`,
      {
        method: "POST",
        body: JSON.stringify({ name, email, number, comment, serviceNeeded, cvLink }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    result = await result.json();
    if (result.status == 404) {
        // alert(result.error)
        throw new Error(result.error)
    } else {

        window.location.reload()    
        return(result)
    }
  };

  return (
    <div class="ticket-main-container">
      <div class="ticket-title">
        <h1>InstiBuzz</h1>
        <h2>
          "The All in One Campus <br /> <span>Fashion</span> Brand"
        </h2>
        <p>
          Get custom merchandise for events and competitions at the most
          affordable price. Be it designing, manufacturing or sales, we handle
          it all. Just ask and we will deliver!
        </p>
      </div>
      {/* <div class="ticket-img-container">
                <img src={img} alt="" />
            </div> */}
      <div class="ticket-form">
        <div class="ticket-input-parameter">
          <label for="name">Name</label> <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />{" "}
          <br />
        </div>
        <div class="ticket-input-parameter">
          <label for="email-id">Email address</label> <br />
          <input
            type="email"
            id="email-id"
            name="email-id"
            placeholder="example@instibuzz.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />{" "}
          <br />
        </div>
        <div class="ticket-input-parameter">
          <label for="ph-number">Mobile number</label> <br />
          <input
            type="tel"
            id="ph-number"
            name="ph-number"
            placeholder="+91 99444 87273"
            onChange={(e) => setNumber(e.target.value)}
            required
          />{" "}
          <br />
        </div>
        <div class="ticket-input-parameter">
          <label for="cv-link">Portfolio</label> <br />
          <input
            type="text"
            id="cv-link"
            name="cv-link"
            placeholder="Drive link"
            onChange={(e) => setCvLink(e.target.value)}
            required
          />{" "}
          <br />
        </div>
        <div class="ticket-checkbox">
          <p>Which Profile?</p>
          <div class="services-input">
            <div>
              <input
                type="checkbox"
                id="manufacturing"
                name="service"
                value="designer"
                onChange={handleChange}
              />
              <label for="service">Designers</label> <br />
            </div>
            <div>
              <input
                type="checkbox"
                id="design"
                name="service"
                value="manufacturer"
                onChange={handleChange}
              />
              <label for="service">Manufacturers</label> <br />
            </div>
            <div>
              <input
                type="checkbox"
                id="sales"
                name="service"
                value="videographer"
                onChange={handleChange}
              />
              <label for="service">Videographers</label> <br />
            </div>
            
          </div>
        </div>
        <div class="ticket-input-parameter">
          <label for="requirement">Why do you want to work with us?</label> <br />
          <textarea
            name="requirement"
            id="requirement"
            rows="3"
            placeholder="Motivation to apply"
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
          <br />
        </div>
        <input
          type="submit"
          value="Submit"
          class="ticket-submit-form"
          onClick={TicketToast}
        />
      </div>
    </div>
  );
}

export default CollabForm;
