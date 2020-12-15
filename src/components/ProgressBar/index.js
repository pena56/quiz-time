import React from 'react';

function index({ completed }) {
  const containerStyles = {
    height: 7,
    width: '100%',
    backgroundColor: '#4558d3',
    borderRadius: 50,
    margin: 20,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: 'white',
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
  };
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
}

export default index;
