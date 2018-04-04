import { Socket } from 'phoenix';

import AuthService from '../services/auth_service';
import * as types from '../actions/action_types';
import { ROOT_SOCKET } from '../config/config';

let socket;

const socketOptions = token => ({
  params: { token },
  logger: (kind, msg, data) => (
    // eslint-disable-next-line no-console
    console.log(`${kind}: ${msg}`, data)
  ),
});

export const setSocket = (dispatch) => {
  if (socket) { return socket; }

  const token = AuthService.loadToken();

  socket = new Socket(`${ROOT_SOCKET}/socket`, socketOptions(token));

  socket.connect();
  socket.onError(() => dispatch({ type: types.SOCKET_ERROR, payload: null }));
  socket.onClose(() => dispatch({ type: types.SOCKET_CLOSED, payload: null }));

  dispatch({ type: types.SOCKET_CONNECTED, payload: null });

  return socket;
};

export const closeSocket = (dispatch) => {
  if (socket) {
    try {
      socket.disconnect();
      socket = null;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    dispatch({ type: types.SOCKET_DISCONNECTED, payload: null });
  }
  return socket;
};
