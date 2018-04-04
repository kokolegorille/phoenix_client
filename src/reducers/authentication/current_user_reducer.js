import * as types from '../../actions/action_types';

import initialState from '../initial_state';

const initialUser = initialState.authentication.currentUser;

const currentUser = (state = initialUser, action) => {
  switch (action.type) {
    case types.SIGNUP_USER_SUCCESS:
    case types.SIGNIN_USER_SUCCESS:
    case types.REFRESH_TOKEN_SUCCESS:
      return action.payload.user;

    case types.SIGNOUT_USER_SUCCESS:
      return initialUser;

    default:
      return state;
  }
};

export default currentUser;
