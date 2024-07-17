import React from 'react';
import { FallingLines } from 'react-loader-spinner';
import './fullscreen.css'


const LoadingScreen = ({ show }) => (
  show ? (
    <div>
      <div className="backdrop"></div>
      <div className="loading-screen">
        <FallingLines
          color="#4fa94d"
          width="150"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
        Loading
      </div>
    </div>
  ) : null
);

export default LoadingScreen;
