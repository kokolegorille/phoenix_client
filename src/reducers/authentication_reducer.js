import { combineReducers } from 'redux';
import currentUser from './authentication/current_user_reducer';
import isAuthenticated from './authentication/is_authenticated_reducer';
import token from './authentication/token_reducer';
import signinError from './authentication/signin_error_reducer';
import signupError from './authentication/signup_error_reducer';

const authentication = combineReducers({
  currentUser,
  isAuthenticated,
  token,
  signinError,
  signupError,
});

export default authentication;
