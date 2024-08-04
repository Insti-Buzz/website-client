import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/MyAddresses.css'

function MyAddresses({ userDetails }) {
    
    console.log(userDetails)

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
            <>
            <div className="my-address-card">
                <label>
                    <div className="my-address-card-content">
                        <div className="my-address-card-name">
                            <h3>{userDetails.name}</h3>
                        </div>
                        <div className="my-address-card-address">
                            <p>{item.address1}, {item.address2},</p>
                            <p>{item.city}, {item.state}, Pin Code-{item.pinCode}</p>
                        </div>
                        <div className="my-address-card-phone">
                            <p>Mobile: {userDetails.phone}</p>
                        </div>
                    </div>
                    {/* <input type="radio" value={item.id} checked={selectedAddressId == item.id} onClick={setAddressField} /> */}
                </label>
                <div className="my-address-card-buttons">
                    <div className="my-address-card-remove" >
                        <h3>Remove</h3>
                    </div>
                    <div className="my-address-card-edit" >
                        <h3>Edit</h3>
                    </div>
                </div>
            </div>

        </>
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
