import * as types from '../../actions/action_types';

import initialState from '../initial_state';

const initialToken = initialState.authentication.token;

const token = (state = initialToken, action) => {
  switch (action.type) {
    case types.SIGNIN_USER_SUCCESS:
    case types.SIGNUP_USER_SUCCESS:
    case types.REFRESH_TOKEN_SUCCESS:
      return action.payload.token;

    case types.SIGNOUT_USER_SUCCESS:
    case types.REFRESH_TOKEN_ERROR:
      return initialToken;

    default:
      return state;
  }
};

export default token;
