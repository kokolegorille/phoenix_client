// This file contains default application state

const initialState = {
  application: {
    bootupTime: null,
    isFetching: false,
    socketStatus: 'disconnected',
  },
  authentication: {
    isAuthenticated: false,
    currentUser: null,
    token: null,
    signinError: null,
    signupError: null,
  },
  channels: {
    connections: {},
    connectionErrors: {},
  },
  presences: {},
};

export default initialState;