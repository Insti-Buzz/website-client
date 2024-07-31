import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/MyAddresses.css'

function MyAddresses() {

    const [addresses, setAddresses] = React.useState([])
    const [loading, setLoading] = React.useState()
    const navigate = useNavigate();
    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");

        if (!email || !token) {
            alert("Please Login");
            navigate("/");
        } else {
            getAddresses();
        }
    }, []);


    const getAddresses = async () => {
        setLoading(true);
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");

        var result;
        if (email) {
            // console.log("trueEmail exists : ", trueEmail);
            result = await fetch(
                `${process.env.REACT_APP_server_url}/api/v1/auth/get-user-addresses`,
                {
                    method: "POST",
                    body: JSON.stringify({ email: email }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            result = await result.json();
            console.log(result)  
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('name');
            localStorage.removeItem('phone');
            //   result = {status: 404};      
        }

        if (result.status == 404) {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("phone");
            setLoading(false);
            navigate("/");
            window.location.reload();
        } else {
            console.log("No issues")
            setAddresses(result);
            // console.log("orders:", orders);
        }
    };

    function e(item,index){
        return(
            <div className='my-addresses-card'>
                <p>{item.address1}</p>
                <p> {item.address2}</p>
                <p>{item.pinCode}</p>
                <div>
                <p> {item.city} , {item.state}</p>
                
                </div>
                <p> {item.phoneNumber}</p>
            </div>
        )
    }

    if ( !Array.isArray(addresses)) {
        return <div>No addresses available.</div>;
    }
    return (
        <div className='my-addresses'>
            { addresses.length == 0 ?
                <>
                    <div className='no-addresses-available'>No addresses available.
                        {/* <a href='/address'>Click here</a> to add an address */}
                    </div>
                </>
                :
                addresses.map(e)    
        }
            {/* {addresses.map(e)} */}
        </div>
    )
}

export default MyAddresses
