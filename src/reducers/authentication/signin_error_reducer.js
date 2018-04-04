import * as types from '../../actions/action_types';

import initialState from '../initial_state';

const initialError = initialState.authentication.signinError;

const signinError = (state = initialError, action) => {
  switch (action.type) {
    case types.CLEAR_SIGNIN_ERROR:
    case types.SIGNIN_USER_SUCCESS:
    case types.SIGNUP_USER_SUCCESS:
    case types.REFRESH_TOKEN_SUCCESS:
    case types.SIGNOUT_USER_SUCCESS:
      return null;

    case types.SIGNIN_USER_ERROR:
      return action.payload;

    default:
      return state;
  }
};

export default signinError;
