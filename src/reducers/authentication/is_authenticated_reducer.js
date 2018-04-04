import * as types from '../../actions/action_types';

import initialState from '../initial_state';

const initialIsAuthenticated = initialState.authentication.isAuthenticated;

const isAuthenticated = (state = initialIsAuthenticated, action) => {
  switch (action.type) {
    case types.AUTHENTICATE_FROM_TOKEN:
    case types.REFRESH_TOKEN_SUCCESS:
    case types.SIGNIN_USER_SUCCESS:
    case types.SIGNUP_USER_SUCCESS:
      return true;

    case types.SIGNOUT_USER_SUCCESS:
    case types.REFRESH_TOKEN_ERROR:
      return false;

    default:
      return state;
  }
};

export default isAuthenticated;
