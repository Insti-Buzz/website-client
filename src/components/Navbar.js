
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import toast, { Toaster } from 'react-hot-toast';
import '../css/Navbar.css';
import InstiBuzzLogo from '../assets/973300f3-c585-48d9-9e8c-601a3ae24121.png';
// import { resolveConfig } from 'vite';

function Navbar() {
    const [dropDownHeight, setDropDownHeight] = useState('0');
    // const [navbarDisplay, setNavbarDisplay] = useState('inline-flex');
    const [navbarHeight, setNavbarHeight] = useState('');
    const [prevPos, setPrevPos] = useState(0);

    useEffect(() => {
        const uponScroll = () => {
            const currentPos = window.scrollY;
            setNavbarHeight(currentPos > prevPos ? '0' : '');
            setPrevPos(currentPos);
        }

        window.addEventListener('scroll', uponScroll);

        return () => window.removeEventListener('scroll', uponScroll);
    }, [prevPos]);


    const navigate = useNavigate();
    const [isLogin, setIsLogin] = React.useState(false)
    const [isAdmin, setIsAdmin] = React.useState(false)

    useEffect(() => {
        const email = localStorage.getItem("userEmail")
        if (email) setIsLogin(true)
        if (email == 'instibuzziitm@gmail.com') {
            setIsAdmin(true)
        }
    }, [])

    function dropDownOpen() {
        setDropDownHeight('480px');
    }

    function dropDownClose() {
        setDropDownHeight('0');
    }


    const homePage = () => {
        dropDownClose()
        navigate('/')
    }

    const shopPage = () => {
        dropDownClose()
        navigate('/shop')
    }

    const addProductPage = () => {
        dropDownClose()
        navigate('/add')
    }

    const cartPage = () => {
        dropDownClose()
        navigate('/cart')
    }

    const signupPage = () => {
        dropDownClose()
        navigate("/signup")
    }

    const ordersPage = () => {
        dropDownClose()
        navigate("/orders")
    }

    const loginPage = () => {
        dropDownClose()
        navigate("/login")
    }

    const ourServicesPage=()=>{
        dropDownClose()
        navigate("/ourServices")
    }

    const aboutPage = () => {
        dropDownClose();
        navigate("/about");
    }

    const Logout = () => {
        localStorage.removeItem("userEmail")
        localStorage.removeItem("token")
        navigate('/')
        window.location.reload()
    }

    return (
        <>
            <div className="nav-navbar" style={{ height: navbarHeight }}>

                <div className="nav-top-left" onClick={() => navigate('/')}>
                    <img src={InstiBuzzLogo} alt="" className="nav-instibuzz-logo"/>
                    <p className="nav-instibuzz-title">InstiBuzz</p>
                </div>

                <div className="nav-center">
                    <div className="nav-center-content">
                        <a className='nav-home' onClick={homePage}>Home</a>
                        <a className='nav-shop' onClick={shopPage}>Shop</a>
                        {/* {isAdmin ?
                            <a className='nav-blog' onClick={addProductPage}>Add</a> :
                            <></>
                        } */}
                        {
                            isLogin ?
                                <a className='nav-orders' onClick={ordersPage}>Orders</a>
                                :
                                <></>

                        }
                        <a className='nav-ourServices' onClick={ourServicesPage}>Our Services</a>
                        <a className='nav-aboutUs' onClick={aboutPage}>About Us</a>
                    </div>
                </div>

                <div className="nav-top-right">
                    {
                        isLogin ?
                            <><a className="fa fa-shopping-bag" aria-hidden="true" onClick={cartPage}></a>
                                <button className="nav-contact-button" onClick={Logout}>Logout</button>
                                <a className="fa fa-bars nav-cart-logo" aria-hidden="true" onClick={dropDownOpen}></a></>
                            :
                            <>

                                <a className='nav-contact-button' onClick={loginPage}>Login/Signup</a>
                                <a className="fa fa-bars" aria-hidden="true" onClick={dropDownOpen}></a></>
                    }
                </div>


                <div className="nav-dropdown" style={{ height: dropDownHeight }}>
                    <a className="fa fa-times" aria-hidden="true" onClick={dropDownClose}></a>
                    <div className="nav-center-content">
                        <a className='nav-home' onClick={homePage}>Home</a>
                        <a className='nav-shop' onClick={shopPage}>Shop</a>
                        {/* <a className='nav-blog' onClick={addProductPage}>Add</a> */}
                        {
                            isLogin ?
                                <a className='nav-about' onClick={ordersPage}>Orders</a>
                                : <></>
                        }
                        <a className='nav-ourServices' onClick={ourServicesPage}>Our Services</a>
                        <a className='nav-aboutUs' onClick={aboutPage}>About Us</a>

                        {
                            isLogin ?
                                <a className='nav-contact-button' onClick={Logout}>Logout</a>

                                :
                                <a className='nav-contact-button' onClick={loginPage}>Login/Signup</a>
                        }
                        {/* <button className="nav-contact-button">Login/Signup</button> */}
                    </div>
                </div>
           

            </div>



        </>
    )
}

export default Navbar
