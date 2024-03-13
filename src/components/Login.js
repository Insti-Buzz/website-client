import React, { useEffect } from 'react'
import img from "../assets/photo1709765317.jpeg"
import { useNavigate } from 'react-router-dom'
import "../css/Login.css"
import img2 from "../assets/Horizontal Logo Transparent.png"

function Login() {
    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const [error, setError] = React.useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        const email = localStorage.getItem('userEmail')
        const token = localStorage.getItem('token')
        if (email && token) {
            navigate('/')
        }
    }, [])

    const Login = async () => {
        if (!email || !password) {
            setError(true)
            return false
        }
        let result = await fetch('http://13.49.225.235/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        console.log(result)
        if (result.status == 404) {
            alert(result.error)
        } else {
            alert(result.message)
            localStorage.setItem("token", result.accessToken)
            localStorage.setItem("userEmail", email)
            navigate('/')
            window.location.reload()
        }
    }

    const toSignup = () => {
        navigate('/signup')
    }
    return (
        <div class="login-main-container">
            <div class="login-content">
                <div class="login-form">
                    <div class="login-logo-container">
                        <img src={img2} alt="InstiBuzz logo" />
                    </div>
                    <h1>The All-in-One Campus Fashion Brand</h1>
                    <h4>Please Login to your Account</h4>
                    <input className='login-input' type='text' placeholder='Email address' value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    {error && !email && <span className='invalid-input'>Enter valid email</span>}
                    <input className='login-input' type='password' placeholder='Password' value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                    {error && !password && <span className='invalid-input'>Enter valid password</span>}
                    {/* <div class="forgot-password">
                        <a href="">Forgot password?</a> <br />
                    </div> */}
                    <div class="login-btn-container">
                        <button className='login-btn' onClick={Login}>Login</button>
                    </div>
                    <h2>OR</h2>
                    <div class="signup-btn-container">
                        <button type="button" class="signup-btn" onClick={toSignup}>Sign Up</button>
                    </div>
                </div>
            </div>
            <div class="login-img-container">
                <img src={img} alt="" />
            </div>
        </div>
    )
}

export default Login
