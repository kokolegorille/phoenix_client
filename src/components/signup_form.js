import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AlertBox from './alert_box';
import schema from '../schemas/signup_schema';
import Form from './form';

const defaultProps = {
  errorMessage: null,
};

const propTypes = {
  signupUser: PropTypes.func.isRequired,
  clearSignupError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

class SignupForm extends Component {
  static defaultProps = defaultProps;
  static propTypes = propTypes;

  _handleClick = (payload) => {
    this.props.signupUser(payload);
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { errorMessage, clearSignupError } = this.props;

    return (
      <div>
        <h1>Sign Up</h1>
        {
          errorMessage &&
          <AlertBox
            mode="danger"
            message={errorMessage}
            onClose={clearSignupError}
          />
        }
        <Form
          schema={schema}
          onClick={this._handleClick}
          buttonLabel="Sign Up"
        />
      </div>
    );
  }
}

export default SignupForm;