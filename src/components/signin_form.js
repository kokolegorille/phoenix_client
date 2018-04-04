import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AlertBox from './alert_box';
import schema from '../schemas/signin_schema';
import Form from './form';

const defaultProps = {
  errorMessage: null,
};

const propTypes = {
  signinUser: PropTypes.func.isRequired,
  clearSigninError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

class SigninForm extends Component {
  static defaultProps = defaultProps;
  static propTypes = propTypes;

  _handleClick = (payload) => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(payload));
    
    this.props.signinUser(payload);
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { errorMessage, clearSigninError } = this.props;

    return (
      <div>
        <h1>Sign In</h1>
        {
          errorMessage &&
          <AlertBox
            mode="danger"
            message={errorMessage}
            onClose={clearSigninError}
          />
        }
        <Form
          schema={schema}
          onClick={this._handleClick}
          buttonLabel="Sign In"
        />
      </div>
    );
  }
}

export default SigninForm;