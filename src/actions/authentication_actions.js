import Api from '../services/api';
import AuthService from '../services/auth_service';
import * as types from './action_types';

export const clearSigninError = () => ({
  type: types.CLEAR_SIGNIN_ERROR,
});

export const clearSignupError = () => ({
  type: types.CLEAR_SIGNUP_ERROR,
});

// Extracts server error
const errorPayload = error => (
  error.response && error.response.data ?
    JSON.stringify(error.response.data) :
    error.toString()
);

// THUNK
export const signinUser = ({ name, password }) => (dispatch) => {
  dispatch({ type: types.SIGNIN_USER_REQUEST, payload: { name, password } });

  // Submit name/password to the server
  Api.signin({ name, password })
    .then((response) => {
      // - Save JWT token
      const { token } = response.data;
      AuthService.saveToken(token);

      dispatch({ type: types.OPEN_SOCKET });
      dispatch({ type: types.SIGNIN_USER_SUCCESS, payload: response.data });
    })
    .catch(error =>
      dispatch({
        type: types.SIGNIN_USER_ERROR, payload: errorPayload(error),
      }));
};

// THUNK
export const signupUser = ({ name, email, password }) => (dispatch) => {
  dispatch({
    type: types.SIGNUP_USER_REQUEST, payload: { name, email, password },
  });

  // Submit name/password to the server
  Api.signup({ name, email, password })
    .then((response) => {
      // - Save JWT token
      const { token } = response.data;
      AuthService.saveToken(token);

      dispatch({ type: types.OPEN_SOCKET });
      dispatch({ type: types.SIGNUP_USER_SUCCESS, payload: response.data });
    })
    .catch(error =>
      dispatch({
        type: types.SIGNUP_USER_ERROR, payload: errorPayload(error),
      }));
};

// THUNK
export const signoutUser = () => (dispatch) => {
  Api.signout()
    .then((response) => {
      AuthService.removeToken();

      dispatch({ type: types.CLOSE_SOCKET });
      dispatch({ type: types.SIGNOUT_USER_SUCCESS, payload: response.data });
    })
    .catch(error =>
    // eslint-disable-next-line no-console
      console.log(error));
};

// This action is used to sync is_activated on refresh.
// Otherwise, hoc authentication might redirect you to sign in!
export const authenticateFromToken = () => ({
  type: types.AUTHENTICATE_FROM_TOKEN,
  payload: null,
});

// THUNK
export const refreshToken = () => (dispatch) => {
  dispatch({ type: types.REFRESH_TOKEN_REQUEST });

  Api.refreshToken()
    .then((response) => {
      // - Save JWT token
      const { token } = response.data;
      AuthService.saveToken(token);

      dispatch({ type: types.OPEN_SOCKET });
      dispatch({
        type: types.REFRESH_TOKEN_SUCCESS, payload: response.data,
      });
    })
    .catch(error =>
      dispatch({
        type: types.REFRESH_TOKEN_ERROR, payload: errorPayload(error),
      }));
};
