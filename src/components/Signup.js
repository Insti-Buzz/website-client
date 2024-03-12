import React, { useEffect } from "react";
import "../css/Signup.css";
import img from "../assets/973300f3-c585-48d9-9e8c-601a3ae24121.png";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [error, setError] = React.useState(false);

  const [showOtp, setShowOtp] = React.useState(false);
  const [otp, setOtp] = React.useState();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");
    if (email && token) {
      navigate("/");
    }
  }, []);

  const Signup = async () => {
    if (!name || !email || !password || !phoneNumber) {
      setError(true);
      return false;
    }
    let result = await fetch(
      "https://mollusk-thankful-externally.ngrok-free.app/api/v1/auth/register",
      {
        method: "POST",
        body: JSON.stringify({ name, email, password, phoneNumber }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log(result);
    if (result.status != 200) {
      alert(result.message);
      return;
    }
    // localStorage.setItem('userEmail', email)
    setShowOtp(true);
  };

  const otpVerify = async () => {
    if (!otp) {
      setError(true);
      return false;
    }
    let result = await fetch(
      "https://mollusk-thankful-externally.ngrok-free.app/api/v1/auth/verifyOtp",
      {
        method: "POST",
        body: JSON.stringify({ name, email, password, phoneNumber, otp }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    if (result.status == 404) {
      alert(result.error);
    } else {
      alert(result.message);
      // localStorage.setItem("userEmail", email)
      navigate("/login");
    }
    console.log(result);
  };

  const toLogin = () => {
    navigate("/login");
  };
  return (
    <div className="signup-main-container">
      <div class="signup-img-container">
        <img src={img} alt="" />
      </div>
      <div class="signup-content">
        <div class="signup-form">
          <h1>Welcome to InstiBuzz!</h1>
          <h3>Signup to continue</h3>
          <input
            className="signup-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {error && !name && (
            <span className="invalid-input">Enter valid name</span>
          )}
          <br />
          <input
            className="signup-input"
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {error && !email && (
            <span className="invalid-input">Enter valid email</span>
          )}
          <br />
          <input
            type="text"
            placeholder="Mobile number"
            className="signup-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {error && !phoneNumber && (
            <span className="invalid-input">Enter valid Phone Number</span>
          )}
          <br />
          <input
            className="signup-input"
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {error && !password && (
            <span className="invalid-input">Enter valid password</span>
          )}
          <br />

          {/* <input type="password" placeholder="Confirm password" class="signup-input" />
                    <br /> */}

          <div class="signup-already-have-an-acc">
            Already have an account?{" "}
            <a class="login-link" onClick={toLogin}>
              Login
            </a>{" "}
            <br />
          </div>

          <div class="signup-btn-container">
            <button onClick={Signup} value="Sign Up" class="signup-btn">
              Signup
            </button>
          </div>
          <div>
            {showOtp && (
              <div className="signup-popup">
                <div className="signup-popup-content">
                  <div className="signup-popup-content-name">
                    <p>Enter Otp sent on your email</p>
                    <input
                      type="text"
                      className="signup-popup-content"
                      placeholder="Enter recieved Otp"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                    />
                    {error && !otp && (
                      <span className="invalid-input">Enter valid otp</span>
                    )}
                  </div>
                  <button
                    className="signup-popup-content-button"
                    onClick={otpVerify}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
