import * as types from '../actions/action_types';

import { setSocket, closeSocket } from './set_socket';

import setSystemChannel from './set_system_channel';
import setLobbyChannel from './set_lobby_channel';
import setUserChannel from './set_user_channel';
import setGameChannel from './set_game_channel';

let socket;
let channel;
const channels = {};

const socketMiddleware = store => next => (action) => {
  switch (action.type) {
    // SOCKET
    case types.OPEN_SOCKET: {
      socket = setSocket(store.dispatch);
      return next(action);
    }

    case types.CLOSE_SOCKET: {
      if (socket) { socket = closeSocket(store.dispatch); }
      return next(action);
    }

    // CHANNELS
    case types.JOIN_CHANNEL: {
      socket = setSocket(store.dispatch);
      const topicPrefix = action.topic.split(':')[0];

      switch (topicPrefix) {
        case 'system':
          channels[action.topic] =
            setSystemChannel(store.dispatch, socket);
          break;
        case 'lobby':
          channels[action.topic] =
            setLobbyChannel(store.dispatch, socket);
          break;
        case 'user':
          channels[action.topic] =
            setUserChannel(store.dispatch, socket, action.topic);
          break;
        case 'game':
          channels[action.topic] =
            setGameChannel(store.dispatch, socket, action.topic);
          break;
        default:
          // eslint-disable-next-line no-console
          console.log(`Unknown topic : ${action.topic}`);
      }
      return next(action);
    }

    case types.LEAVE_CHANNEL: {
      channel = channels[action.topic];
      if (channel) {
        if (channel.state === 'joined') {
          try {
            channel.leave();
          } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
          }
        }
        channel = null;
      }
      store.dispatch({
        type: types.CHANNEL_DISCONNECTED,
        payload: { topic: action.topic },
      });
      return next(action);
    }

    case types.SEND_COMMAND: {
      const message = `SEND COMMAND -> Topic : ${action.topic}, ` +
          `Command : ${action.command}, Payload : ${action.payload}`;
      // eslint-disable-next-line no-console
      console.log(message);

      channel = channels[action.topic];
      if (!!channel) {
        channel.push(action.command, action.payload);
      }
      return next(action);
    }

    // DEFAULT
    default:
      return next(action);
  }
};

export default socketMiddleware;
