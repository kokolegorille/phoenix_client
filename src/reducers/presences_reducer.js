import * as types from '../actions/action_types';

import initialState from './initial_state';

const presences = (state = initialState.presences, action) => {
  let copy = {};
  switch (action.type) {
    case types.DISPATCH_PRESENCE_STATE:
    case types.DISPATCH_PRESENCE_DIFF:
      // Presences object is of form {topic: topic, presences: presences}
      copy = Object.assign({}, state);
      copy[action.payload.topic] = action.payload.presences;
      return copy;

    case types.CHANNEL_CLOSED:
    case types.CONNECT_CHANNEL_ERROR:
    case types.CHANNEL_DISCONNECTED:
      copy = Object.assign({}, state);
      delete copy[action.payload.topic];
      return copy;

    default:
      return state;
  }
};

export default presences;