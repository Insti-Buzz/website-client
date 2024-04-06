import React, { useState, useEffect } from 'react';
import '../css/Loading.css'; // Import CSS file for styling

function LoadingPage() {
  
  return (
    <div className="loading-page-container">
      
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading...</div>
        </div>
      
    </div>
  );
}

export default LoadingPage;
