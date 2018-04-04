import * as types from '../../actions/action_types';

import initialState from '../initial_state';

const initialErrors = initialState.channels.connectionErrors;
const connectionErrors = (state = initialErrors, action) => {
  let copy = {};
  switch (action.type) {
    case types.CHANNEL_ERROR:
    case types.CONNECT_CHANNEL_ERROR:
      copy = Object.assign({}, state);
      copy[action.payload.topic] = action.payload.error;
      return copy;

    case types.CHANNEL_CONNECTED:
    case types.CHANNEL_DISCONNECTED:
      copy = Object.assign({}, state);
      delete copy[action.payload.topic];
      return copy;

    default:
      return state;
  }
};

export default connectionErrors;
