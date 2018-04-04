import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { appBootup } from '../actions/application_actions';
import {
  signinUser,
  clearSigninError,
  signupUser,
  clearSignupError,
  signoutUser,
} from '../actions/authentication_actions';

import Properties from '../components/properties';
import SigninForm from '../components/signin_form';
import SignupForm from '../components/signup_form';

const propTypes = {
  appBootup: PropTypes.func.isRequired,
  signinUser: PropTypes.func.isRequired,
  clearSigninError: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
  clearSignupError: PropTypes.func.isRequired,
  signoutUser: PropTypes.func.isRequired,
};

class App extends Component {
  static propTypes = propTypes;
  
  state = {
    signMode: 'Sign In',
  }
  
  componentDidMount() {
    // Application is starting...
    this.props.appBootup(Date.now());
  }
  
  _toggleSignMode = () => {
    const { signMode } = this.state;
    const newSignMode = signMode === 'Sign In' ? 'Sign Up' : 'Sign In';
    this.setState({signMode: newSignMode});
  }
  
  render() {
    const { 
      application, 
      authentication, 
      signinError, 
      signupError,
      //
      signinUser,
      clearSigninError,
      signupUser,
      clearSignupError,
      signoutUser,
    } = this.props;
    const { isAuthenticated } = authentication;
    const { signMode } = this.state;
    
    return (
      <div className='flex-container column'>
        <div className='panel'>
          <h1>Hello world from React</h1>
          <div className='flex-container'>
            <div>
              <h2>Application</h2>
              <Properties object={application} />
            </div>
            <div>
              <h2>Authentication</h2>
              <Properties object={authentication} />
            </div>
          </div>
        </div>
        <div className='panel'>
          {
            ! isAuthenticated && 
            <button className='button' onClick={this._toggleSignMode}>
              Toggle sign mode
            </button>
          }
          {
            ! isAuthenticated && signMode === 'Sign In' &&
            <SigninForm
              signinUser={signinUser}
              clearSigninError={clearSigninError}
              errorMessage={signinError}
            />
          }
          {
            ! isAuthenticated && signMode === 'Sign Up' &&
            <SignupForm
              signupUser={signupUser}
              clearSignupError={clearSignupError}
              errorMessage={signupError}
            />
          }
          {
            isAuthenticated &&
            <button className='button' onClick={signoutUser}>
              Sign out
            </button>
          }
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({
  application,
  authentication,
}) => ({
  application,
  authentication,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    appBootup,
    signinUser,
    clearSigninError,
    signupUser,
    clearSignupError,
    signoutUser,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);