import * as types from './action_types';

/* eslint-disable no-multi-spaces */

const topic = 'game';

// Those commands are intercepted by the socket middleware
const sendCommand = (command, payload, gameId) => ({
  type: types.SEND_COMMAND,
  payload,
  command,
  topic: `${topic}:${gameId}`,
});

// Requests
export const playMove = (gameId, data) => sendCommand('play_move', data, gameId);
export const pass     = (gameId, data) => sendCommand('pass', data, gameId);
export const resign   = (gameId, data) => sendCommand('resign', data, gameId);

// Chat
export const createMessage = (gameId, data) => sendCommand('create_message', data, gameId);
export const listMessages  = (gameId, data) => sendCommand('list_messages', data, gameId);

/* eslint-enable no-multi-spaces */
