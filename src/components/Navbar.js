import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Profile from './Profile';
import MyOrders from './MyOrders';
// import { isExpired, decodeToken } from "react-jwt";

// import toast, { Toaster } from 'react-hot-toast';
import '../css/Navbar.css';
import InstiBuzzLogo from '../assets/973300f3-c585-48d9-9e8c-601a3ae24121.png';
// import { resolveConfig } from 'vite';

function Navbar({chooseComp}) {
    const [dropDownHeight, setDropDownHeight] = useState('0');
    const [profileDropDownHeight, setProfileDropDownHeight] = useState({height:'0', display:'none', open:false});
    // const [navbarDisplay, setNavbarDisplay] = useState('inline-flex');
    const [navbarHeight, setNavbarHeight] = useState('');
    const [prevPos, setPrevPos] = useState(0);

    // useEffect(() => {
    //     const uponScroll = () => {
    //         const currentPos = window.scrollY;
    //         // console.log("currentPos: ",currentPos);
    //         // console.log("scroll Y : ", window.scrollY);
    //         setNavbarHeight(currentPos > prevPos ? '0' : '');
    //         setPrevPos(currentPos);
    //     }

    //     window.addEventListener('scroll', uponScroll);

    //     return () => window.removeEventListener('scroll', uponScroll);
    // }, [prevPos]);


    const navigate = useNavigate();
    const [isLogin, setIsLogin] = React.useState(false)
    const [usersName, setUsersName] = useState('');
    // const [isAdmin, setIsAdmin] = React.useState(false)


    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        const name = localStorage.getItem("name");
        // name = ;
        if (name) setUsersName(name.slice(0, 1));
        // const token = localStorage.getItem("token");
        if (email) setIsLogin(true)
        
        // if (token) {
        //   const myDecodedToken = decodeToken(token);
        //   const isMyTokenExpired = isExpired(token); 
            // if ( myDecodedToken.email == process.env.REACT_APP_admin_email && !isMyTokenExpired) {
            //     setIsAdmin(true);
            //     console.log("admin access granted");
            // }
        // }
    }, [isLogin])

    function dropDownOpen() {
        setDropDownHeight('fit-content');
        
    }

    function dropDownClose() {
        setDropDownHeight('0');
    }

    function profileDropDownOpen() {
        setProfileDropDownHeight({height:'350px', boxShadow: '1px 1px 12px 1px rgba(0, 0, 0, 0.482)',open:true});
    }

    function profileDropDownClose() {
        setProfileDropDownHeight({height:'0', boxShadow: '0 0 0 0 transparent',open:false});
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
        // navigate("/orders")
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
        localStorage.removeItem("name")
        localStorage.removeItem("phone")
        navigate('/')
        window.location.reload()
    }

    const wishlistPage=()=>{
        dropDownClose()
        navigate('/wishlist')
    }

    return (
        <>
            

            <div className="nav-navbar" style={{ height: navbarHeight }}>

                <a className="nav-top-left" href='/'>
                    <img src={InstiBuzzLogo} alt="InstiBuzz Logo" className="nav-instibuzz-logo"/>
                    <p className="nav-instibuzz-title">InstiBuzz</p>
                </a>

                <div className="nav-center">
                    <div className="nav-center-content">
                        <a className='nav-home' href='/' onClick={homePage}>Home</a>
                        <a className='nav-shop' href='/shop' onClick={shopPage}>Shop</a>
                        
                        {/* do not uncomment this part without enabling check for authentication function */}
                        {/* {isAdmin ?
                            <a className='nav-blog' onClick={addProductPage}>Add</a> :
                            <></>
                        } */}
                        {/* {
                            isLogin ?
                                <a className='nav-orders' href='/orders' onClick={ordersPage}>Orders</a>
                                :
                                <></>

                        } */}
                        <a className='nav-ourServices' href='/ourServices' onClick={ourServicesPage}>Our Services</a>
                        <a className='nav-aboutUs' href='/about' onClick={aboutPage}>About Us</a>
                    </div>
                </div>

                <div className="nav-top-right">
                    {
                        isLogin ?
                            (isLogin && <>
                                {/* <button onClick={wishlistPage} class="fa fa-heart-o nav-wish-logo"></button> */}
                                <button className="fa fa-shopping-bag " aria-hidden="true" onClick={cartPage}></button>
                                <button className="fa fa-bars nav-cart-logo" aria-hidden="true" onClick={dropDownOpen}></button>
                                <div className="nav-profile-button" onClick={profileDropDownHeight.open ? profileDropDownClose : profileDropDownOpen}>{ usersName }</div>
                            </>)
                            :
                            <>

                                <a href='/login' className='nav-contact-button' onClick={loginPage}>Login/Signup</a>
                                <button className="fa fa-bars" aria-hidden="true" onClick={dropDownOpen}></button>
                            </>
                    }
                </div>

                <div className='nav-profile-dropdown' style={{ height: profileDropDownHeight.height , boxShadow: profileDropDownHeight.boxShadow }}>
                    <div onClick={() => {
                        chooseComp(Profile, "Profile");
                        profileDropDownClose();
                        navigate('/settings');
                    }}>Profile</div>
                    <div onClick={() => {
                        chooseComp(MyOrders, "My Orders");
                        profileDropDownClose()
                        navigate('/settings');
                    }}>My Orders</div>
                    <div onClick={() => {
                        profileDropDownClose()
                        wishlistPage();
                    }} >Wishlist</div>
                    <div onClick={Logout}>Logout</div>
                    {/* <div>hyufegwu</div> */}
                    {/* <div>hyufegwu</div> */}
                    {/* <div>hyufegwu</div> */}
                    {/* <div>hyufegwu</div> */}
                </div>    
                <div className="nav-dropdown" style={{ height: dropDownHeight }}>
                    <button className="fa fa-times" aria-hidden="true" onClick={dropDownClose}></button>
                    <div className="nav-center-content">
                        <a href='/' className='nav-home' onClick={homePage}>Home</a>
                        <a href='/shop' className='nav-shop' onClick={shopPage}>Shop</a>
                        {/* <a className='nav-blog' onClick={addProductPage}>Add</a> */}
                        {
                            isLogin ?
                                <a href='/orders' className='nav-about' onClick={ordersPage}>Orders</a>
                                : <></>
                        }
                        <a href='/ourServices' className='nav-ourServices' onClick={ourServicesPage}>Our Services</a>
                        <a href='/about' className='nav-aboutUs' onClick={aboutPage}>About Us</a>

                        {
                            isLogin ?
                                <button className='nav-contact-button' onClick={Logout}>Logout</button>

                                :
                                <a href='/login' className='nav-contact-button' onClick={loginPage}>Login/Signup</a>
                        }
                        {/* <button className="nav-contact-button">Login/Signup</button> */}
                    </div>
                </div>
           

            </div>



        </>
    )
}

export default Navbar
