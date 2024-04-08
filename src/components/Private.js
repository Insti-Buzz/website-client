import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function Private() {
    const email=localStorage.getItem('userEmail')
    var auth=false;
    if(email=="instibuzziitm@gmail.com"){
        auth=true;
    }
    return auth?<Outlet/>:<Navigate to='/'/>
}

export default Private
