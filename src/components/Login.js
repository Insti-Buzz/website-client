import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/ForgotPassword.css";
import "../css/Login.css";
import illustration from "../assets/Illustrations/Sign up img.png";
import toast from "react-hot-toast";
import logo from "../assets/Horizontal Logo Transparent.png";

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
    <div className="forgot-password-main-container">
      <div className="forgot-password-head">
        <img src={logo} />
        <h1>Welcome to InstiBuzz</h1>
        <h2>The All-In-One Campus Fashion Brand</h2>
      </div>
      <div className="forgot-password-container">
        <div className="forgot-password-display">
          <div className="forgot-password-img">
            <img src={illustration} />
          </div>
          <div className="forgot-password-content">
            <h3>Login</h3>
            <div className="forgot-password-form">
              <label>Enter your Mail</label>
              <input className="forgot-password-input change-password-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@instibuzz.com" required />
              <label>Enter password</label>
              <div className="login-password-input">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" onKeyDown={(event) => { if (event.key == "Enter") LoginToast() }} required />
                <i
                  class={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <a href="/forgot-password">Forgot Password?</a>
              <button className="forgot-password-btn" onClick={LoginToast}>Login</ button>
              <button className="signup-btn" onClick={() => navigate("/signup")}>Signup</ button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
