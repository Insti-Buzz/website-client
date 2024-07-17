import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Profile from './Profile';
import MyOrders from './MyOrders';
import MyAddresses from './MyAddresses';

// import { isExpired, decodeToken } from "react-jwt";

// import toast, { Toaster } from 'react-hot-toast';
import '../css/Navbar.css';
import InstiBuzzLogo from '../assets/973300f3-c585-48d9-9e8c-601a3ae24121.png';
import logoutSvg from '../assets/vectors/Logout.svg'
// import { resolveConfig } from 'vite';

function Navbar({profileProps,navbarRef }) {

    // const [profileDropDownHeight, setProfileDropDownHeight] = useState({height:'0', display:'none', open:false});
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
    const location = useLocation();
    // console.log(location)
    const [isLogin, setIsLogin] = React.useState(false);
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

        
    }, [isLogin]);



    // function profileDropDownOpen() {
    //     setProfileDropDownHeight({height:'fit-content', boxShadow: '1px 1px 12px 1px rgba(0, 0, 0, 0.482)',open:true});
    // }

    // function profileDropDownClose() {
    //     setProfileDropDownHeight({height:'0', boxShadow: '0 0 0 0 transparent',open:false});
    // }


    const homePage = () => {
        profileProps.sidePanelClose()
        navigate('/')
    }

    const shopPage = () => {
        profileProps.sidePanelClose()
        navigate('/shop')
    }

    const addProductPage = () => {
        profileProps.sidePanelClose()
        navigate('/add')
    }

    const cartPage = () => {
        profileProps.sidePanelClose()
        navigate('/cart')
    }

    const signupPage = () => {
        profileProps.sidePanelClose()
        navigate("/signup")
    }

    const ordersPage = () => {
        profileProps.sidePanelClose()
        // navigate("/orders")
    }

    const loginPage = () => {
        profileProps.sidePanelClose()
        navigate("/login")
    }

    const ourServicesPage=()=>{
        profileProps.sidePanelClose()
        navigate("/ourServices")
    }

    const aboutPage = () => {
        profileProps.sidePanelClose();
        navigate("/about");
    }

    const Logout = () => {
        setIsLogin(false);
        localStorage.clear()
        // localStorage.removeItem("userEmail")
        // localStorage.removeItem("token")
        // localStorage.removeItem("name")
        // localStorage.removeItem("phone")
        navigate('/')
        // window.location.reload()
    }

    const wishlistPage=()=>{
        profileProps.sidePanelClose()
        navigate('/wishlist')
    }

    return (
        <>
            

            <div className="nav-navbar" style={{ height: navbarHeight }} ref={navbarRef}> 
                <div className="nav-top-left-bars" onClick={profileProps.sidePanel.open ? profileProps.sidePanelClose : profileProps.sidePanelOpen}>
                    {/* <button className="fa fa-bars nav-sidebar-logo" aria-hidden="true" ></button>    */}
                    <div className="side-panel-button-container">
                        <div className={profileProps.sidePanel.open? "btn-line-close":"btn-line"}></div>
                        <div className={profileProps.sidePanel.open? "btn-line-close":"btn-line"}></div>
                        <div className={profileProps.sidePanel.open? "btn-line-close":"btn-line"}></div>
                    </div>
                </div>
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

                <div className="nav-top-right" >
                    {
                        isLogin ?
                            (isLogin && <>
                                <button onClick={wishlistPage} class="fa fa-heart nav-wish-logo" style={{color:'black'}}></button>
                                <button className="fa fa-shopping-bag " aria-hidden="true" onClick={cartPage}></button>
                                {/* <button className="fa fa-bars nav-cart-logo" aria-hidden="true" onClick={sidePanelOpen}></button> */}
                                <div className="nav-profile-button" onClick={()=> profileProps.profileDropDownHeight.open ? profileProps.profileDropDownClose() : profileProps.profileDropDownOpen()}>{ usersName }</div>
                            </>)
                            :
                            <>

                                <a href='/login' className='nav-contact-button' onClick={loginPage}>Login/Signup</a>
                                {/* <button className="fa fa-bars" aria-hidden="true" onClick={sidePanelOpen}></button> */}
                            </>
                    }
                </div>

                <div className='nav-profile-dropdown' style={{ height: profileProps.profileDropDownHeight.height , boxShadow: profileProps.profileDropDownHeight.boxShadow}}>
                    <div style={{color:'#FF7F50', fontSize:'22px', marginBottom:'10px'}}>
                        Hello! {localStorage.getItem('name')}
                    </div>
                    
                    <div onClick={() => {
                        // chooseComp(MyOrders, "MyOrders");
                        profileProps.profileDropDownClose()
                        navigate('/profile/my-orders');
                    }}>My Orders</div>
                   
                    <div onClick={() => {
                        profileProps.profileDropDownClose()
                        wishlistPage();
                    }} >Wishlist</div>
                   
                    
                    
                    <div onClick={() => {
                        // chooseComp(Profile, "Profile");
                        profileProps.profileDropDownClose();
                        navigate('/collabForm');
                    }}>Collaboration</div>
                    
                    <div onClick={() => {
                        // chooseComp(Profile, "Profile");
                        profileProps.profileDropDownClose();
                        navigate('/ticket');
                    }} style={{borderBottom: '1px solid black'}}>Contact us</div>
                   {/* <hr></hr> */}
                    <div onClick={() => {
                        // chooseComp(MyAddresses, "MyAddresses");
                        profileProps.profileDropDownClose()
                        navigate('/profile/my-addresses');
                    }}>Saved Addresses</div>

                    <div onClick={() => {
                        // chooseComp(Profile, "Profile");
                        profileProps.profileDropDownClose();
                        navigate('/profile');
                    }}>Profile</div>
                   
                    <div onClick={Logout}>Logout</div>

                </div>    
               
                <div className="nav-dropdown" style={{ width: profileProps.sidePanel.width }}>
                    <div className='nav-dropdown-contents'>
                        <div className="nav-intro-container">
                            
                            <div style={{ color: '#FF7F50', fontSize: '18px', marginBottom: '5px', fontWeight: 'bold' , textWrap:'nowrap' }}>
                                WELCOME {isLogin ? localStorage.getItem('name').split(" ")[0].toUpperCase()   : "GUEST"}
                            </div>
                            {isLogin ? <span>{localStorage.getItem('phone')}</span> : <a href='/login' className='nav-intro-login-button' onClick={loginPage}>Login/Signup</a>}

                        </div>
                        <div className="nav-instibuzz-container">
                            <div className="nav-instibuzz-container-1">INSTIBUZZ</div>
                            <a href='/' className="nav-instibuzz-container-2" style={ location.pathname==='/' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Home</a>
                            <a href='/shop' className="nav-instibuzz-container-2" style={ location.pathname==='/shop' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Shop</a>
                            <a href='/ourServices' className="nav-instibuzz-container-3" style={ location.pathname==='/ourServices' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Our Services</a>
                            <a href='/about' className="nav-instibuzz-container-4" style={ location.pathname==='/about' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Our Story</a>
                        </div>
                        <div className="nav-profile-container">
                            <div className="nav-profile-container-heading">PROFILE</div>
                            <a href="/profile/my-orders" style={ location.pathname==='/profile/my-orders' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>My Orders</a>
                            <a href="/wishlist" style={ location.pathname==='/wishlist' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Wishlist</a>
                            <a href="/cart" style={ location.pathname==='/cart' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Cart</a>
                            <a href="/profile" style={ location.pathname==='/profile' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Edit Profile</a>
                            <a href="/profile/my-addresses" style={ location.pathname==='/profile/my-addresses' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Saved Addresses</a>
                        </div>
                        <div className="nav-contact-us-container">
                            <div className="nav-contact-us-container-heading">CONTACT US</div>
                            <a href="/collabForm" style={ location.pathname==='/collabForm' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Work with us</a>
                            <a href="/faqs" style={ location.pathname==='/faqs' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>FAQs</a>
                        </div>
                        <div className="nav-legal-container">
                            <div className="nav-legal-container-heading">LEGAL</div>
                            <a href="/terms-conditions" style={ location.pathname==='/terms-conditions' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Terms & Conditions</a>
                            <a href="/shipping" style={ location.pathname==='/shipping' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Shipping Policy</a>
                            <a href="/exchange" style={ location.pathname==='/exchange' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Exchange Policy</a>
                            <a href="/privacy" style={ location.pathname==='/privacy' ? {backgroundColor:'#FF7F50' ,color:'white'}:{}}>Privacy Policy</a>
                        </div>
                        {isLogin &&
                        <div className="nav-logout-container" onClick={Logout}>
                            <img src={logoutSvg} alt="" />
                            <div className='nav-logout-btn'>Logout</div>
                        </div>}
                    </div>

                </div>
                
               

            </div>



        </>
    )
}

export default Navbar
