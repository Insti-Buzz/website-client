import React, { useState, useEffect } from 'react';
import '../css/Loading.css'; // Import CSS file for styling
import logo from "../assets/973300f3-c585-48d9-9e8c-601a3ae24121.png"

function LoadingPage() {

  return (
    <div className="loading-cont">
      <img className="logo" src={logo} alt="Logo" />
    </div>
  );
}

export default LoadingPage;
