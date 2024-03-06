import '../css/Navbar.css';
import InstiBuzzLogo from '../assets/Horizontal Logo Transparent.png';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import React, { useEffect, useState } from 'react';

function Navbar() {
    const [dropDownHeight, setDropDownHeight] = useState('0');
    function dropDownOpen() {
        setDropDownHeight('480px');
    }
    function dropDownClose() {
        setDropDownHeight('0');
    }

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
                                <button className="nav-contact-button" onClick={Logout}>Logout</button>
                                <a className="fa fa-bars" aria-hidden="true" onClick={dropDownOpen}></a></>
                            :
                            <>
                            
                            <a className='nav-about' onClick={loginPage}>Login</a>
                            <a className="fa fa-bars" aria-hidden="true" onClick={dropDownOpen}></a></>
                            
                    }


                </div>

                <div className="nav-dropdown" style={{ height: dropDownHeight }}>
                    <a className="fa fa-times" aria-hidden="true" onClick={dropDownClose}></a>
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
                        <button className="nav-contact-button">Login/Signup</button>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Navbar
