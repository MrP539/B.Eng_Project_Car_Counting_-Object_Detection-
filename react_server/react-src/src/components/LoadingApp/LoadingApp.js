import React, { Component } from 'react';
import { FallingLines } from 'react-loader-spinner'
import { TextField, Button, Container, Typography, Backdrop } from '@mui/material'; // Import Material-UI Components

class LoadingApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  render() {
    const { isLoading } = this.state;

    return (
      <>
        {isLoading ? (
          <Backdrop open={isLoading} invisible style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="loading-screen" style={{ color: 'white', fontSize: '24px' }}>
              <FallingLines
                color="#4fa94d"
                width="150"
                visible={true}
                ariaLabel="falling-circles-loading"
              />
              Loading.....
            </div>
          </Backdrop>
        ) : null}
      </>
    );
  }
}

export default LoadingApp;
