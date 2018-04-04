import * as types from './action_types';

const topic = 'lobby';

/* eslint-disable no-multi-spaces */

// Those commands are intercepted by the socket middleware
const sendCommand = (command, payload) => ({
  type: types.SEND_COMMAND,
  payload,
  command,
  topic,
});

// Requests
export const createRequest = data => sendCommand('create_request', data);
export const cancelRequest = data => sendCommand('cancel_request', data);
export const acceptRequest = data => sendCommand('accept_request', data);
export const listRequests  = data => sendCommand('list_requests', data);

// Games
export const listGames     = data => sendCommand('list_games', data);

/* eslint-enable no-multi-spaces */
