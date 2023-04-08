import React from 'react';
// import { connect } from 'react-redux';

const Spinner = ({ isLoading }) => {

  if (!isLoading) {
    return null;
  }

  return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;
