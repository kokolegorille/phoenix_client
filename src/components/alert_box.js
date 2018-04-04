import React from 'react';
import PropTypes from 'prop-types';

/*
  eslint-disable jsx-a11y/anchor-is-valid,
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
*/

const AlertBox = ({ mode, message, onClose }) => (
  <div role="alert" className={`alert alert-${mode}`}>
    <a onClick={onClose} className="close">&times;</a>
    <strong>{message}</strong>
  </div>
);

/* 
  eslint-enable jsx-a11y/anchor-is-valid,
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
*/

AlertBox.defaultProps = {
  mode: 'info',
};

AlertBox.propTypes = {
  mode: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlertBox;
