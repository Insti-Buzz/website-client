import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/ForgotPassword.css";
import "../css/ChangePassword.css";
import illustration from "../assets/Illustrations/Login.svg";
import toast from "react-hot-toast";

function ChangePassword() {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location.state) {
            navigate("/");
        }
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        if (email && token) {
            navigate("/");
        }
    }, []);

    const changePassword = async () => {
        const email = location.state.email;

        if (password.length < 7) {
            setError("Password must be at least 7 characters long")
        } else {
            if (password !== confirmPassword) {
                setError("Password does not match");
            } else {
                let result = await fetch(
                    `${process.env.REACT_APP_server_url}/api/v1/auth/resetPassword`,
                    {
                        method: "POST",
                        body: JSON.stringify({ email, password }),
                        headers: {
                            "Content-type": "application/json",
                        },
                    },
                );
                result = await result.json();
                console.log(result);
                navigate("/login");
            }
        }
    }

    return (
        <div className="forgot-password-main-container">
            <div className="forgot-password-head">
                <h1>Welcome to InstiBuzz</h1>
                <h2>The All-In-One Campus Fashion Brand</h2>
            </div>
            <div className="forgot-password-container">
                <div className="forgot-password-display">
                    <div className="forgot-password-img">
                        <img src={illustration} />
                    </div>
                    <div className="forgot-password-content">
                        <h3>Create New Password</h3>
                        <div className="forgot-password-form">
                            <label>Enter your password</label>
                            <input className="forgot-password-input change-password-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                            <label>Confirm your password</label>
                            <input className="forgot-password-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Password" required />
                            <p>{error}</p>
                            <button className="forgot-password-btn" onClick={changePassword}>Set Password</ button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
