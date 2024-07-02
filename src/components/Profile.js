import React, { useEffect, useState } from 'react';
import '../css/Profile.css';

function Profile() {
    const [selected, setSelected] = useState('hostel')
    const [addressType, setAddressType] = useState('home')
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pinCode, setPinCode] = useState("");

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        var result = await fetch(
            `${process.env.REACT_APP_server_url}/api/v1/auth/get-user-details`,
            {
                method: "GET",
            },
        );
        result = await result.json();
        console.log(result);
        setName(result.name);
        setGender(result.gender);
        setPhoneNumber(result.phoneNumber);
        setEmail(result.email);
        setAddress(result.address);
        setCity(result.city);
        setState(result.state);
        setPinCode(result.pinCode);
    }

    const updateUserDetails = async () => {
        var result = await fetch(
            `${process.env.REACT_APP_server_url}/api/v1/auth/update-user-details`,
            {
                method: "POST",
                body: JSON.stringify({ name, email, gender, phoneNumber, address, city, state, pinCode }),
                headers: {
                    "Content-type": "application/json",
                },
            },
        );
        result = await result.json();
        // console.log(result);
        if (result.status == 200) {
            window.location.reload();
        }
    }

    return (
        <>
            <div className='profile-container'>
                <div className="card">
                    {/* <h2 className='grey'>Profile</h2> */}
                    <div className="block address-selector">
                        <button className='grey' style={{ background: selected === "hostel" ? "lightgreen" : "white" }} onClick={() => { setSelected("hostel") }}>Hostel</button>
                        <button className='grey' style={{ background: selected === "outside-iitm" ? "lightgreen" : "white" }} onClick={() => { setSelected("outside-iitm") }}>Outside IITM</button>
                    </div>
                    <div className="block details">
                        <div className="block">
                            <div className="input-cont">
                                <label>Name</label>
                                <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="block">
                            <div className="input-cont">
                                <label>Gender</label>
                                <select placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className="block">
                            <div className="input-cont">
                                <label>Contact Number</label>
                                <input type="text" placeholder='Contact Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                        </div>
                        <div className="block">
                            <div className="input-cont">
                                <label>Email</label>
                                <input type="text" placeholder='Email' value={email} disabled />
                            </div>
                        </div>
                        <div className="block">
                            <div className="input-cont">
                                <label>Address</label>
                                <input type="text" placeholder='Address(House number, building, street, area)' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>
                        <div className="block residence-address">
                            <div className="input-cont">
                                <label>City</label>
                                <input type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="input-cont">
                                <label>State</label>
                                <input type="text" placeholder='State' value={state} onChange={(e) => setState(e.target.value)} />
                            </div>
                        </div>
                        <div className="block">
                            <div className="input-cont">
                                <label>Pin Code</label>
                                <input type="text" placeholder='Pin Code' value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                            </div>
                        </div>
                        <div className="block address-type">
                            <button style={{ background: addressType == "home" ? "rgb(255, 226, 129)" : "white" }} onClick={() => { setAddressType("home") }}>Home</button>
                            <button style={{ background: addressType == "work" ? "rgb(255, 226, 129)" : "white" }} onClick={() => { setAddressType("work") }}>Work</button>
                        </div>
                        <div className="block save-btn">
                            <button onClick={updateUserDetails}>Save Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
