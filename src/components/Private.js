import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { isExpired, decodeToken } from "react-jwt";

function Private() {
    // const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');
    var auth = false;
    
    if (token) {
        const myDecodedToken = decodeToken(token);
        const isMyTokenExpired = isExpired(token); 
          if ( myDecodedToken.id == process.env.REACT_APP_admin_email && !isMyTokenExpired) {
              auth=true;
              console.log("admin access granted");
          } else {
              console.log("Not an actual admin");
          }
      }

    return auth?<Outlet/>:<Navigate to='/'/>
}

export default Private
