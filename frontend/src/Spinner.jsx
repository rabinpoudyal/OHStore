import React from 'react';
import { Progress } from 'reactstrap';
// import { connect } from 'react-redux';

const Spinner = ({ isLoading }) => {

  if (!isLoading) {
    return null;
  }

  return (
    <Progress striped color="danger" value="100" />
  );
};

export default Spinner;
