import React, {useState , useEffect} from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { isExpired, decodeToken } from "react-jwt";

function Private() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (token && email) {
                const myDecodedToken = decodeToken(token);
                const isMyTokenExpired = isExpired(token);

                if (myDecodedToken.email === process.env.REACT_APP_admin_email && !isMyTokenExpired && myDecodedToken.email === email) {
                    setAuth(true);
                    console.log("Admin access granted");
                } else if(myDecodedToken.email !== email) {
                    console.log("Not an actual admin");
                    await susActivity(myDecodedToken.email);
                    localStorage.removeItem('token');
                    localStorage.removeItem('userEmail');
                    Navigate('/');
                }
            }
        };

        checkAuth();
    }, []);
    
    const susActivity = async (susEmailId) => {
        try {
            let result = await fetch(
                `${process.env.REACT_APP_server_url}/api/v1/auth/safetyProtocol`,
                {
                    method: "POST",
                    body: JSON.stringify({ susEmailId: susEmailId , component:"Private.js" }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            result = await result.json();

            if (result.status === 404) {
                console.log("Error");
            } else {
                // console.log("Mail sent and notified to the team!");
            }
        } catch (error) {
            console.error("Error during suspicious activity notification", error);
        }
    };

    // if (token) {
    //     const myDecodedToken = decodeToken(token);
    //     const isMyTokenExpired = isExpired(token); 
    //       if ( myDecodedToken.id == process.env.REACT_APP_admin_email && !isMyTokenExpired) {
    //           auth=true;
    //           console.log("admin access granted");
    //       } else {
    //           console.log("Not an actual admin");
    //           susActivity(myDecodedToken.id);
              
    //       }
    // }
    

    return auth?<Outlet/>:<Navigate to='/'/>
}

export default Private
