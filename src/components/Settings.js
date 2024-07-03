import React, { useState, useEffect, useRef } from 'react'
import '../css/Settings.css';
import { useNavigate } from 'react-router-dom';

import MyOrders from './MyOrders.js';
import Profile from './Profile.js';
import Address from './Address.js';
// import SavedAddress from './MyOrders.js';

import { isExpired, decodeToken } from "react-jwt";


function Settings({ reqComp }) {

    const [activeComponent, setActiveComponent] = useState({ component: reqComp.comp, title: reqComp.compName });
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
    });
    // const[email,setEmail]=useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const token = localStorage.getItem('token');
        if (!email && !token) {
            navigate('/');
        } else {
            setActiveComponent({ component: reqComp.comp, title: reqComp.compName });
            getUserDetails(email,token);
        }
    }, [reqComp]);
    
    const checkAuth = async (email, token) => {
        const myDecodedToken = decodeToken(token);
        if (myDecodedToken && myDecodedToken.email === email) {
            return myDecodedToken.email;
        }else {
            await susActivity(myDecodedToken.email);
            return null;
        }
      };
    
      const susActivity = async (susEmailId) => {
        try {
            let result = await fetch(
                `${process.env.REACT_APP_server_url}/api/v1/auth/safetyProtocol`,
                {
                    method: "POST",
                    body: JSON.stringify({ susEmailId: `${susEmailId}` , component: 'Settings.js' }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            result = await result.json();
    
            if (result.status === 404) {
                console.log("Error");
            } else {
                console.log("Action may result in Account Ban");
            }
        } catch (error) {
            console.error("Error during suspicious activity notification", error);
        }
      };

    const getUserDetails = async (email,token) => {
        console.log("getUserDetails Called in Settings.js");
        const trueEmail = await checkAuth(email, token);
        var result;
        if (trueEmail) {
            setUserDetails(prevDetails => ({ ...prevDetails, email: trueEmail }));
            result = await fetch(
                `${process.env.REACT_APP_server_url}/api/v1/auth/get-user-details`,
                 {
                     method: "POST",
                     body: JSON.stringify({  email: email }),
                     headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${token}`,
                       },
                 },
             );
             result = await result.json();
        } else {
            localStorage.clear();
            result = { status: 404 }; 
        }

        if (result.status === 404) {
            localStorage.clear();
            navigate('/');
            window.location.reload();
        } else {
            setUserDetails(prevDetails => ({
                ...prevDetails,
                name: result.name,
                email: result.email,
                phone: result.phoneNumber,
                gender: result.gender,
                address: result.address,
                city: result.city,
                state: result.state,
                pinCode: result.pinCode,
            }));

        }
    }


    const settingsNavigation = (toComponent, componentTitle) => {
        setActiveComponent({ component: toComponent, title: componentTitle });
    }

    const Logout = () => {
        localStorage.removeItem("userEmail")
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("phone")
        navigate('/')
        window.location.reload()
    }

    const outDiv1Ref = useRef(null);
    const outDiv2Ref = useRef(null);
    const outDiv3Ref = useRef(null);
    const rightDivRef = useRef(null);

    useEffect(() => {

        const handleScrollOutside = (e) => {
            const rightDiv = rightDivRef.current;
            // console.log("Outside");
            if (e.deltaY > 0) {
                if (rightDiv.scrollTop < rightDiv.scrollHeight - rightDiv.clientHeight) {
                    rightDiv.scrollTop += e.deltaY;
                    e.preventDefault();
                } else { }

            } else if (e.deltaY < 0) {
                if (window.scrollY > 0) {


                } else {
                    rightDiv.scrollTop = rightDiv.scrollTop + e.deltaY;
                    e.preventDefault();
                }
            }
        };

        const handleScrollInside = (e) => {
            const rightDiv = rightDivRef.current;
            // console.log("Inside");
            // console.log(e.deltaY);
            if (e.deltaY < 0) {
                if (window.scrollY > 0) {
                    // console.log("if")
                    window.scrollBy({
                        top: e.deltaY,
                        behavior: 'smooth',
                    })
                    e.preventDefault()
                } else {
                    // console.log("else")
                    rightDiv.scrollTop = rightDiv.scrollTop + e.deltaY;
                    e.preventDefault();
                }
            }
        }

        const rightDiv = rightDivRef.current;
        const outDiv1 = outDiv1Ref.current;
        const outDiv2 = outDiv2Ref.current;
        const outDiv3 = outDiv3Ref.current;
        if (outDiv1) {
            outDiv1.addEventListener('wheel', handleScrollOutside);
        }
        if (outDiv2) {
            outDiv2.addEventListener('wheel', handleScrollOutside);
        }
        if (outDiv3) {
            outDiv3.addEventListener('wheel', handleScrollOutside);
        }
        if (rightDiv) {
            rightDiv.addEventListener('wheel', handleScrollInside);
        }


        return () => {
            if (outDiv1) {
                outDiv1.removeEventListener('wheel', handleScrollOutside);
            }
            if (outDiv2) {
                outDiv2.removeEventListener('wheel', handleScrollOutside);
            }
            if (outDiv3) {
                outDiv3.removeEventListener('wheel', handleScrollOutside);
            }
            if (rightDiv) {
                rightDiv.removeEventListener('wheel', handleScrollInside);
            }
        };
    }, []);

    return (
        <>
            <div className="settings">

                <div className="settings-navigation-container" ref={outDiv1Ref}>
                    <div className="wrapper" >

                        <div className="user-info-container">
                            <span className='user-name'>{userDetails.name}</span>
                            <span className="user-email">{userDetails.email}</span>
                            <span className="user-number">{userDetails.phone}</span>
                        </div>
                        <div className="profile-button"
                            style={activeComponent.title === "Profile" ?
                                { backgroundColor: "#FFE281" } : {}}
                            onClick={() => settingsNavigation(Profile, "Profile")}
                        >My Profile</div>
                        <div className="my-orders-button"
                            style={activeComponent.title === "My Orders" ?
                                { backgroundColor: "#FFE281" } : {}}
                            onClick={() => settingsNavigation(MyOrders, "My Orders")}
                        >My Orders</div>

                        <div className="logout-button" onClick={Logout}>Logout</div>

                    </div>


                </div>


                <div className="settings-body">
                    <div className="setting-body-title" ref={outDiv2Ref}>{activeComponent.title}</div>
                    <div className="setting-body-content" ref={rightDivRef}>{<activeComponent.component userDetails={userDetails} />}</div>
                </div>
            </div>
        </>
    )
}

export default Settings
