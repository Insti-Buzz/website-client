import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './Navbar'
import Footer from './Footer'

function MainContainer() {
    const auth = localStorage.getItem('userEmail')
    const token = localStorage.getItem('token')
    const { pathname } = useLocation();
    const showFooter = !(pathname === '/signup' || pathname === '/login' || pathname === '/cart' || pathname === '/address' || pathname === '/ticket' || pathname === '/collabForm' || pathname === '/orders' || pathname === '/wishlist');
    return (
        <div className='all-container'>
            <Toaster />
            {<Navbar />}
            <Outlet />
            {showFooter && <Footer />}
        </div>
    )
}

export default MainContainer
