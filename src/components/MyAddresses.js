import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import '../css/MyAddresses.css'

function MyAddresses({ userDetails }) {
    const [id, setId] = useState();
    const [index, setIndex] = useState();
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [addresses, setAddresses] = React.useState([])
    const [loading, setLoading] = React.useState()
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [showEditAddress, setShowEditAddress] = useState(false)
    const [validPin, setValidPin] = useState(true)
    const [error, setError] = React.useState(false);
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

    const removeAddress = async (index) => {
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        console.log(index)

        var result;
        if (email) {
            try {
                // console.log("trueEmail exists : ", trueEmail);
                setLoading(true)
                result = await fetch(
                    `${process.env.REACT_APP_server_url}/api/v1/auth/remove-user-address`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email,
                            index
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                result = await result.json();
                // setLoading(false)
                // alert(result.message)
                window.location.reload()
            } catch (error) {
                alert(error)
            }
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('name');
            localStorage.removeItem('phone');
        }
        if (result.status == 404) {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("phone");
            setLoading(false);
            navigate("/");
            window.location.reload();
        }
    }

    const showEditPopup = (item, index) => {
        setId(item.id);
        setIndex(index);
        setAddress1(item.address1);
        setAddress2(item.address2);
        setCity(item.city);
        setState(item.state);
        setPinCode(item.pinCode);
        setShowEditAddress(true);
    }

    const closeEditPopup = () => {
        setId('');
        setAddress1('');
        setAddress2('');
        setCity('');
        setState('');
        setPinCode('');
        setShowEditAddress(false);
    }

    const isValidPinCode = async () => {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
        const data = await response.json();

        if (data[0].Status === "Error" || data[0].Status === "404") {
            alert("Enter a valid pin code");
            setValidPin(false)
            return false;
        } else {
            setValidPin(true)
            return true;
        }
    }

    const editAddress = async () => {
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");
        console.log('called')
        if (!address1 || !address2 || !pinCode || !city || !state) {
            setError(true);
            throw new Error("Enter Details");
            return false;
        }
        if (email) {
            const isValidPin = await isValidPinCode();
            if (isValidPin) {
                let result = await fetch(
                    `${process.env.REACT_APP_server_url}/api/v1/auth/edit-user-address`,
                    {
                        method: "POST",
                        body: JSON.stringify({ id, email, index, address1, address2, pinCode, city, state }),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                result = await result.json();
                window.location.reload()
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            } else {
                alert("Enter a valid pin code");
            }
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('name');
            localStorage.removeItem('phone');
        }
    }

    function e(item, index) {
        return (
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
                        <div className="my-address-card-remove" onClick={() => removeAddress(index)}>
                            <h3>Remove</h3>
                        </div>
                        <div className="my-address-card-edit" onClick={() => showEditPopup(item, index)}>
                            <h3>Edit</h3>
                        </div>
                    </div>
                </div>
                {showEditAddress && (
                    <div className="cart-popup-background">

                        <div class="address-form cart-popup">
                            <div className="cart-popup-close-btn">
                                <IconButton onClick={closeEditPopup}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                            <h3>EDIT ADDRESS</h3>
                            {/* <form> */}
                            <div className="address-form-form">
                                <label>Address line 1</label>
                                <input id={error && !address1 && "input-error"} autoComplete="disabled" type="text" placeholder="Address line 1" value={address1} onChange={(e) => setAddress1(e.target.value)} required></input>
                                <label>Address line 2</label>
                                <input id={error && !address2 && "input-error"} autoComplete="disabled" type="text" placeholder="Address line 2" value={address2} onChange={(e) => setAddress2(e.target.value)} required></input>
                                <label>Pin code</label>
                                <input id={error && !pinCode && "input-error"} autoComplete="disabled" type="text" placeholder="Pin Code" value={pinCode} onBlur={isValidPinCode} onChange={(e) => setPinCode(e.target.value)} required></input>
                                <label>City</label>
                                <input id={error && !city && "input-error"} autoComplete="disabled" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                                <label>State</label>
                                <input id={error && !state && "input-error"} autoComplete="disabled" type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required></input>
                                <button onClick={editAddress}>Save Address</button>
                                {/* <button class="cart-order-btn" onClick={toPaymentPage}>
                                            DELIVER TO THIS ADDRESS
                                        </button> */}
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }

    if (!Array.isArray(addresses)) {
        return <div>No addresses available.</div>;
    }
    return (
        <div className='my-addresses'>
            {addresses.length == 0 ?
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
