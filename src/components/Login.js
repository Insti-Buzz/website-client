import React, { useEffect, useState } from "react";
import img from "../assets/photo1709765317.jpeg";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import img2 from "../assets/Horizontal Logo Transparent.png";

import LoadingPage from "./LoadingPage";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");
    if (email && token) {
      navigate("/");
    }
  }, []);

  const Login = async () => {
    if (!email || !password) {
      setError(true);
      throw new Error("Enter Details");
    }

    let result = await fetch(
      `${process.env.REACT_APP_server_url}/api/v1/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    if (result.status == 404) {
      throw new Error(result.error);
    } else {
      localStorage.setItem("token", result.accessToken);
      localStorage.setItem("userEmail", result.email);
      // localStorage.setItem('name', result.name);
      localStorage.setItem('name', result.userName);
      localStorage.setItem('phone', result.userPhone);
      navigate("/");
      window.location.reload();
      return result;
    }
  };

  const LoginToast = () =>
    toast.promise(
      Login(),
      {
        loading: "Signing In",
        success: (result) => {
          return result.message;
        },
        error: (result) => {
          return result.message;
        },
      },
      {
        id: "ticketToast",
      }
    );

  const toSignup = () => {
    navigate("/signup");
  };
  return (
    <div>
      {/* {loading?<LoadingPage/>: */}
      <div class="login-main-container">
        <div class="login-content">
          <div class="login-form">
            <div class="login-logo-container">
              <img src={img2} alt="InstiBuzz logo" />
            </div>
            <h1>The All-in-One Campus Fashion Brand</h1>
            <h4>Please Login to your Account</h4>
            <input
              className="login-input"
              id={error && !email && "input-error"}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div class="password-input">
              <input
                className="login-input password-login-input"
                id={error && !password && "input-error"}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <i
                class={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div class="forgot-password">
              <a href="/forgot-password">Forgot password?</a> <br />
            </div>
            <div class="login-btn-container">
              <button className="login-btn" onClick={LoginToast}>
                Login
              </button>
            </div>
            <h5>OR</h5>
            <div class="signup-btn-container">
              <button type="button" class="signup-btn" onClick={toSignup}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div class="login-img-container">
          <img src={img} alt="" />
        </div>
      </div>
      {/* } */}
    </div>
  );
}

export default Login;
