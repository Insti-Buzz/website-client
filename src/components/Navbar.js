import '../css/Navbar.css';
import InstiBuzzLogo from '../assets/Horizontal Logo Transparent.png';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import React, { useEffect } from 'react';

function Navbar() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = React.useState(false)

    useEffect(() => {
        const email = localStorage.getItem("userEmail")
        if (email) setIsLogin(true)
    }, [])

    const homePage = () => {
        navigate('/app/home')
    }

    const shopPage = () => {
        navigate('/app/shop')
    }

    const addProductPage = () => {
        navigate('/app/add')
    }

    const cartPage = () => {
        navigate('/app/cart')
    }

    const signupPage = () => {
        navigate("/app/signup")
    }

    const ordersPage = () => {
        navigate("/app/orders")
    }

    const loginPage = () => {
        navigate("/app/login")
    }

    const Logout = () => {
        localStorage.removeItem("userEmail")
        localStorage.removeItem("accessToken")
        navigate('/app/home')
        window.location.reload()
    }

    return (
        <>
            <div className="nav-navbar">

                <div className="nav-top-left">
                    <img src={InstiBuzzLogo} onClick={homePage} alt="InstiBuzz's official logo" className="nav-instibuzz-logo" />
                    {/* <p>LOGO HERE</p> */}
                </div>

                <div className="nav-center">
                    <div className="nav-center-content">
                        <a className='nav-home' onClick={homePage}>Home</a>
                        <a className='nav-shop' onClick={shopPage}>Shop</a>
                        <a className='nav-blog' onClick={addProductPage}>Add</a>
                        {
                            isLogin ?
                                <a className='nav-about' onClick={ordersPage}>Orders</a>
                                :
                                <a className='nav-about' onClick={signupPage}>Signup</a>
                        }
                    </div>
                </div>

                <div className="nav-top-right">
                    {
                        isLogin ?
                            <><a className="fa fa-shopping-bag" aria-hidden="true" onClick={cartPage}></a>
                                <button className="nav-contact-button" onClick={Logout}>Logout</button></>
                            :
                            <a className='nav-about' onClick={loginPage}>Login</a>
                    }

                </div>
            </div>



        </>
    )
}

export default Navbar
