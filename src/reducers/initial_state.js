// This file contains default application state

const initialState = {
  application: {
    bootupTime: null,
    isFetching: false,
    socketStatus: 'disconnected',
  },
  // authentication: {
  //   isAuthenticated: false,
  //   currentUser: null,
  //   token: null,
  //   signInError: null,
  //   signUpError: null,
  // },
  // channels: {
  //   connections: {},
  //   connectionErrors: {},
  // },
  // presences: {},
};

export default initialState;