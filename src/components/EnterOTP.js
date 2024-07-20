import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/ForgotPassword.css";
import "../css/EnterOTP.css";
import illustration from "../assets/Illustrations/Sign up img.png";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";

function EnterOTP() {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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

    const submitOTP = async () => {
        const email = location.state.email;
        setIsLoading(true);
        document.querySelector(".forgot-password-btn").setAttribute("disabled", "true");
        // console.log('called')
        if (otp.length == 4) {
            let result = await fetch(
                `${process.env.REACT_APP_server_url}/api/v1/auth/isChangePassword`,
                {
                    method: "POST",
                    body: JSON.stringify({ email, otp }),
                    headers: {
                        "Content-type": "application/json",
                    },
                },
            );
            result = await result.json();
            console.log(result)
            if (result.status == 200) {
                navigate("/change-password", { state: { email: email } });
            } else {
                setOtp('');
                throw new Error(result.error);
            }
        } else {
            throw new Error("Fill in OTP");
        }
        document.querySelector(".forgot-password-btn").removeAttribute("disabled");
        setIsLoading(false);
    }

    const resendOTP = async () => {
        const email = location.state.email;
        setIsLoading(true);
        let result = await fetch(
            `${process.env.REACT_APP_server_url}/api/v1/auth/resendVerifyOtp`,
            {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-type": "application/json",
                },
            },
        );
        result = await result.json();
        console.log(result);
        if (result.status == 404) {
            throw new Error(result.message);
        }
        setIsLoading(false);
    }

    const resendOTPToast = () => {
        toast.promise(
            resendOTP(),
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
    }

    const submitOTPToast = () => {
        toast.promise(
            submitOTP(),
            {
                loading: "Verifying OTP",
                success: (result) => {
                    return "Verified";
                },
                error: (result) => {
                    return result.message;
                }
            }
        )
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
                        <h3>OTP sent to your mail</h3>
                        <div className="enter-otp-form">
                            <label>Enter OTP</label>
                            <div className="enter-otp-input">
                                <OtpInput
                                    value={otp}
                                    shouldAutoFocus={true}
                                    onChange={setOtp}
                                    numInputs={4}
                                    renderSeparator={<span></span>}
                                    inputType="tel"
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>
                            <div className="forgot-password-otp">
                                <a onClick={ isLoading ? () => {} : resendOTPToast}>Resend OTP</a>
                            </div>
                            <button className="forgot-password-btn" onClick={submitOTPToast}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EnterOTP;
