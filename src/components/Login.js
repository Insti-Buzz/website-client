import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = React.useState()
  const [password, setPassword] = React.useState()
  const [error, setError] = React.useState(false)
  const navigate=useNavigate()

  const Login = async () => {
    if (!email || !password) {
      setError(true)
      return false
    }
    let result = await fetch('http://localhost:5000/api/v1/auth/login', {
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
      navigate('/app/home')
      window.location.reload()
    }
  }


  return (
    <div>
      <h1>Login</h1>
      <p className=''>Email</p>
      <input className='' type='text' placeholder='Enter your email' value={email}
        onChange={(e) => { setEmail(e.target.value) }} />
      {error && !email && <span className='invalid-input'>Enter valid email</span>}

      <p className=''>Password</p>
      <input className='' type='password' placeholder='Enter Password' value={password}
        onChange={(e) => { setPassword(e.target.value) }} />
      {error && !password && <span className='invalid-input'>Enter valid password</span>}

      <button onClick={Login}>Login</button>
    </div>
  )
}

export default Login
