import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  inputType, label, reffunc, valid, touched, noWrapper, ...otherProps
}) => {
  let inputElement;
  const inputClasses = ['input-element'];

  if (!valid && touched) {
    inputClasses.push('error');
  }

  switch (inputType) {
    case 'select': {
      // Extract options property
      const { options, ...selectProps } = otherProps;
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          ref={reffunc}
          {...selectProps}
        >
          {
            options.map(option => (
              <option
                key={option.value}
                value={option.value}
                selected={option.selected}
              >
                {option.displayValue}
              </option>
            ))
          }
        </select>
      );
      break;
    }
    case 'textarea': {
      inputElement = (<textarea
        className={inputClasses.join(' ')}
        ref={reffunc}
        {...otherProps}
      />);
      break;
    }
    case 'input':
    default: {
      inputElement = (<input
        className={inputClasses.join(' ')}
        ref={reffunc}
        {...otherProps}
      />);
    }
  }

  if (noWrapper) {
    return inputElement;
  }

  return (
    <div className="input">
      {
        label &&
        <label className="label">{label}</label> // eslint-disable-line jsx-a11y/label-has-for
      }
      {inputElement}
    </div>
  );
};

Input.defaultProps = {
  reffunc: () => null,
  valid: false,
  touched: false,
  noWrapper: false,
};

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  label: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  reffunc: PropTypes.func,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  noWrapper: PropTypes.bool,
};

export default Input;
