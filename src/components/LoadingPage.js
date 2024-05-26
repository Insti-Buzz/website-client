import React, { useState, useEffect } from 'react';
import '../css/Loading.css'; // Import CSS file for styling
import logo from "../assets/cd5b0d91-6766-411f-bce8-7f701eeff7e9.png"

function LoadingPage() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="loading-cont">
      <img className="logo" src={logo} alt="Logo" />
    </div>
  );
}

export default LoadingPage;
