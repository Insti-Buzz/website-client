import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ForgotPassword.css";
import illustration from "../assets/Illustrations/Sign up img.png";
import toast from "react-hot-toast";
import logo from "../assets/Horizontal Logo Transparent.png";

function ForgotPassword() {
    const [email, setEmail] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        if (email && token) {
            navigate("/");
        }
    }, []);

    const sendOTP = async () => {
        if (!email) {
            throw new Error("Enter email");
        }
        let result = await fetch(
            `${process.env.REACT_APP_server_url}/api/v1/auth/forgetPassword`,
            {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-type": "application/json",
                },
            },
        );
        result = await result.json();
        console.log(result)
        if (result.status == 404) {
            throw new Error("This email is not registered")
        } else {    
            navigate("/enter-otp", { state: { email: email } });
        }
    }
    
    const sendOTPToast = () => {
        document.querySelector(".forgot-password-btn").setAttribute("disabled", "true");
        toast.promise(
            sendOTP(),
            {
                loading: "Sending OTP",
                success: (result) => {
                    return "OTP Sent";
                },
                error: (result) => {
                    return result.message;
                }
            }
        )
        document.querySelector(".forgot-password-btn").removeAttribute("disabled");
    }

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
                        <h3>Forgot Password</h3>
                        <div className="forgot-password-form">
                            <form>
                                <label>Enter your mail</label>
                                <input className="forgot-password-input" type="email" value={email} placeholder="example@instibuzz.com" onChange={(e) => setEmail(e.target.value)} required />
                            </form>
                            <button className="forgot-password-btn" onClick={sendOTPToast} >Send OTP</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
