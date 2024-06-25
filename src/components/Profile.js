import React, { useState } from 'react';
import '../css/Profile.css';

function Profile() {

    const [selected,setSelected] = useState('hostel')
    const [addressType,setAddressType] = useState('home')




    return (
    <>
    <div className='profile-container'>
      <div className="card">
        {/* <h2 className='grey'>Profile</h2> */}
        <div className="block address-selector">
            <button className='grey' style={{background: selected === "hostel" ? "lightgreen" : "white"}} onClick={()=>{setSelected("hostel")}}>Hostel</button>
            <button className='grey' style={{background: selected === "outside-iitm" ? "lightgreen" : "white"}} onClick={()=>{setSelected("outside-iitm")}}>Outside IITM</button>
        </div>
        <div className="block details">
            <div className="block">
                <div className="input-cont">
                    <label>Name</label>
                    <input type="text" placeholder='Name'/>
                </div>
            </div>
            <div className="block">
                <div className="input-cont">
                    <label>Gender</label>
                    <select placeholder="Gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
            </div>
            <div className="block">
                <div className="input-cont">
                    <label>Contact Number</label>
                    <input type="text" placeholder='Contact Number'/>
                </div>
            </div>
            <div className="block">
                <div className="input-cont">
                    <label>Email</label>
                    <input type="text" placeholder='Email'/>
                </div>
            </div>
            <div className="block">
                <div className="input-cont">
                    <label>Address</label>
                    <input type="text" placeholder='Address(House number, building, street, area)'/>
                </div>
            </div>
            <div className="block residence-address">
                <div className="input-cont">
                    <label>City</label>
                    <input type="text" placeholder='City'/>
                </div>
                <div className="input-cont">
                    <label>State</label>
                    <input type="text" placeholder='State'/>
                </div>
            </div>
            <div className="block">
                <div className="input-cont">
                    <label>PinCode</label>
                    <input type="text" placeholder='PinCode'/>
                </div>
            </div>
            <div className="block address-type">
                <button style={{background: addressType == "home" ? "rgb(255, 226, 129)" : "white"}} onClick={()=>{setAddressType("home")}}>Home</button>
                <button style={{background: addressType == "work" ? "rgb(255, 226, 129)" : "white"}} onClick={()=>{setAddressType("work")}}>Work</button>
            </div>
            <div className="block save-btn">
                <button>Save Details</button>
            </div>
        </div>
      </div>
    </div>      
    </>
  )
}

export default Profile
