import React, { useState, useEffect, useRef } from 'react'
import '../css/Settings.css';
import { useNavigate } from 'react-router-dom';

import MyOrders from './MyOrders.js';
import Profile from './Profile.js';
// import SavedAddress from './MyOrders.js';


function Settings({ reqComp }) {

    // console.log("Name : ", reqComp.compName);

    // console.log("userDetails : ",userDetails);
    const [activeComponent, setActiveComponent] = useState({ component: reqComp.comp, title: reqComp.compName });
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        const phone = localStorage.getItem('phone');

        if (!email && !token) {
            // alert('Please Login');
            navigate('/');
        } else {
            setActiveComponent({ component: reqComp.comp, title: reqComp.compName });
            setUserDetails({
                name: name,
                email: email,
                phone: phone,
            });
        }

    }, [reqComp]);


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
                    <div className="setting-body-content" ref={rightDivRef}>{<activeComponent.component />}</div>
                </div>
            </div>
        </>
    )
}

export default Settings
