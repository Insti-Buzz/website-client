import React , { useState ,useRef , useEffect} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './Navbar'
import Footer from './Footer'
import { click } from '@testing-library/user-event/dist/click'

function MainContainer({profileProps}) {

    const outletRef = useRef(null);
    const navbarRef = useRef(null);
    useEffect(() => {
        const handleClickOnOutlet = () => {
            if (!profileProps.profileDropDownHeight.open) {
                profileProps.profileDropDownClose();
            }
        }
        const handleClickOnNavbar = (event) => {
            if (!profileProps.profileDropDownHeight.open && event.target.className !== 'nav-profile-button') {
                profileProps.profileDropDownClose();
            }
        }

        const mainContainerComp = outletRef.current;
        const navbarComp = navbarRef.current;
        if (mainContainerComp) {
            mainContainerComp.addEventListener('click', handleClickOnOutlet );
        }
        if (navbarComp) {
            navbarComp.addEventListener('click', handleClickOnNavbar);
        }
        return () => {
            if (mainContainerComp) {
                mainContainerComp.removeEventListener('click', handleClickOnOutlet);
            }
            if (navbarComp) {
                navbarComp.addEventListener('click', handleClickOnNavbar);
            }
        };
    }, []);

    const { pathname } = useLocation();
    const showFooter = !(pathname === '/signup' || pathname === '/login' || pathname === '/cart' || pathname === '/address' || pathname === '/ticket' || pathname === '/collabForm' ||  pathname === '/wishlist');
    return (
        <div className='all-container'>
            <Toaster />
            <Navbar profileProps={profileProps} navbarRef={navbarRef} />
            <div ref={outletRef}><Outlet/></div>
            {showFooter && <Footer />}
        </div>
    )
}

export default MainContainer
