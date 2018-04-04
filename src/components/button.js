import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, ...otherProps }) => (
  <button
    onClick={onClick}
    className="button"
    {...otherProps}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;