import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './Navbar'
import Home2 from './Homes'
import Footer from './Footer'

function MainContainer() {
    return (
        <div className='all-container'>
            <Toaster/>
            {/* <h2>hj</h2> */}
            {/* <Shop /> */}
            {/* <Product/> */}
            {<Navbar />}
            {/* <Home2/>     */}
            <Outlet />
            {<Footer />}
        </div>
    )
}

export default MainContainer
