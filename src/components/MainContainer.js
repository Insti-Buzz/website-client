import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function MainContainer() {
    return (
        <div className='all-container'>
            {/* <h2>hj</h2> */}
            {/* <Shop /> */}
            {/* <Product/> */}
            {<Navbar />}
            <Outlet />
            {<Footer />}
        </div>
    )
}

export default MainContainer
