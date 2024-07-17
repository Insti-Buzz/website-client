import React , { useState ,useRef , useEffect} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './Navbar'
import Footer from './Footer'
import { click } from '@testing-library/user-event/dist/click'
// import '../css/MainContainer.css'

function MainContainer({profileProps}) {

    const outletRef = useRef(null);
    const navbarRef = useRef(null);
    useEffect(() => {
        const handleClickOnOutlet = (event) => {
            if (!profileProps.profileDropDownHeight.open) {
                profileProps.profileDropDownClose();
            }
            if (!profileProps.sidePanel.open) {
                // console.log(event);
                profileProps.sidePanelClose();
            }
        }
        const handleClickOnNavbar = (event) => {
            if (!profileProps.profileDropDownHeight.open && event.target.className !== 'nav-profile-button') {
                profileProps.profileDropDownClose();
            }
            if (!profileProps.sidePanel.open && event.target.className === 'nav-dropdown' ) {
                // console.log(event);
                profileProps.sidePanelClose();
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
