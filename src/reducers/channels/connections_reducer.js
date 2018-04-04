import * as types from '../../actions/action_types';
import initialState from '../initial_state';

const initialConnections = initialState.channels.connections;
const connections = (state = initialConnections, action) => {
  let copy = {};
  switch (action.type) {
    case types.CHANNEL_CONNECTED:
      copy = Object.assign({}, state);
      copy[action.payload.topic] = true;
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

export default connections;
