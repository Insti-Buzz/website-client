import React from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate()
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState(false)

    const [showOtp, setShowOtp] = React.useState(false)
    const [otp, setOtp] = React.useState()

    const Signup = async () => {
        if (!name || !email || !password) {
            setError(true)
            return false
        }
        let result = await fetch('http://localhost:5000/api/v1/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        console.log(result)
        if(result.status!=200){
            alert(result.message)
            return;
        }
        localStorage.setItem('userEmail', email)
        setShowOtp(true)
    }

    const otpVerify = async () => {
        if (!otp) {
            setError(true)
            return false
        }
        let result = await fetch('http://localhost:5000/api/v1/auth/verifyOtp', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, otp }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        if(result.status==404){
            alert(result.error)
        }else{
            alert(result.message)
            localStorage.setItem("userEmail",email)
            navigate('/app/login')
        }
        console.log(result)
        
    }

    return (
        <div>
            <h1>Signup</h1>

            <p className=''>Name</p>
            <input className='' type='text' placeholder='Enter your name' value={name}
                onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <p className=''>Email</p>
            <input className='' type='text' placeholder='Enter your email' value={email}
                onChange={(e) => { setEmail(e.target.value) }} />
            {error && !email && <span className='invalid-input'>Enter valid email</span>}

            <p className=''>Password</p>
            <input className='' type='password' placeholder='Enter Password' value={password}
                onChange={(e) => { setPassword(e.target.value) }} />
            {error && !password && <span className='invalid-input'>Enter valid password</span>}

            <button onClick={Signup}>Signup</button>

            <div>
                {showOtp && (
                    <div className="cart-popup">
                        <div className='cart-popup-content'>
                            <div className='cart-popup-content-name'>
                                <p>Otp</p>
                                <input type='text' className='cart-popup-content' placeholder='Enter recieved Otp' value={otp}
                                    onChange={(e) => { setOtp(e.target.value) }} />
                                {error && !otp && <span className='invalid-input'>Enter valid otp</span>}
                            </div>
                            <button className='cart-popup-content-button' onClick={otpVerify}>Proceed</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Signup
