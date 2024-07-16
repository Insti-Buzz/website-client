import React , { useState ,useRef , useEffect} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './Navbar'
import Footer from './Footer'

function MainContainer({profileProps}) {

    const outletRef = useRef(null);
    useEffect(() => {
        const handleClickOnOutlet = () => {
            // console.log("clickkkk")
            if (!profileProps.profileDropDownHeight.open) {
                profileProps.profileDropDownClose();
            }
        }

        const mainContainerComp = outletRef.current;
        if (mainContainerComp) {
            mainContainerComp.addEventListener('click', handleClickOnOutlet );
        }
        return () => {
            if (mainContainerComp) {
                mainContainerComp.removeEventListener('click', handleClickOnOutlet);
            }
        };
    }, []);

    const { pathname } = useLocation();
    const showFooter = !(pathname === '/signup' || pathname === '/login' || pathname === '/cart' || pathname === '/address' || pathname === '/ticket' || pathname === '/collabForm' ||  pathname === '/wishlist');
    return (
        <div className='all-container'>
            <Toaster />
            {<Navbar profileProps={profileProps} />}
            <div ref={outletRef}>
            <Outlet/>
            </div>
            {showFooter && <Footer />}
        </div>
    )
}

export default MainContainer
