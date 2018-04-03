import * as types from '../../actions/action_types';
import initialState from '../initial_state';

const initialStatus = initialState.application.socketStatus;

const socketStatus = (state = initialStatus, action) => {
  switch (action.type) {
    // When a socket close and reconnect
    // set socket status also when channels recoonect
    case types.CHANNEL_CONNECTED:
    case types.SOCKET_CONNECTED:
      return 'connected';
    case types.SOCKET_DISCONNECTED:
      return 'disconnected';
    case types.SOCKET_ERROR:
      return 'error';
    case types.SOCKET_CLOSED:
      return 'closed';
    default:
      return state;
  }
};

export default socketStatus;
