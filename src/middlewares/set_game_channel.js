import { Presence } from 'phoenix';

import * as types from '../actions/action_types';

let presences = {};

const setGameChannel = (dispatch, socket, topic) => {
  const channel = socket.channel(topic, {});
  
  // const presence = new Presence(channel);
  
  const listBy = (id, { metas: [first, ...rest] }) =>
    Object.assign({}, first, { id, count: rest.length + 1 });

  const render = presences => (Presence.list(presences, listBy));

  // // Presences
  // presenceOnSync(() => {
  //   const presences = presence.list(listBy);
  //   return dispatch({
  //     type: types.DISPATCH_PRESENCE_STATE,
  //     payload: { topic, presences },
  //   });
  // });

  // Presences
  channel.on('presence_state', (payload) => {
    presences = Presence.syncState(presences, payload);
    return dispatch({
      type: types.DISPATCH_PRESENCE_STATE,
      payload: { topic, presences: render(presences) },
    });
  });

  channel.on('presence_diff', (payload) => {
    presences = Presence.syncDiff(presences, payload);
    return dispatch({
      type: types.DISPATCH_PRESENCE_DIFF,
      payload: { topic, presences: render(presences) },
    });
  });

  // Game
  channel.on('update_game_state', payload =>
    dispatch({ type: types.UPDATE_GAME_STATE, payload }));

  channel.on('update_game_info', payload =>
    dispatch({ type: types.UPDATE_GAME_INFO, payload }));

  channel.on('game_force_quit', payload =>
    dispatch({ type: types.GAME_FORCE_QUIT, payload }));

  // Chat room
  channel.on('messages_received', payload => 
    dispatch({type: types.MESSAGES_RECEIVED, payload})
  );
  
  channel.on('message_created', payload => 
    dispatch({type: types.MESSAGE_CREATED, payload})
  );

  // Join
  if (channel.state !== 'joined') {
    channel.join()
      .receive('ok', () =>
        dispatch({ type: types.CHANNEL_CONNECTED, payload: { topic } }))
      .receive('error', payload =>
        dispatch({ type: types.CONNECT_CHANNEL_ERROR, payload: { topic, error: payload } }))
      .receive('timeout', () =>
        // eslint-disable-next-line no-console
        console.log('Networking issue. Still waiting...'));
  }

  channel.onError(() => 
    dispatch({ 
      type: types.CHANNEL_ERROR, 
      payload: { topic, error: 'there was an error!' } 
    })
  );
  channel.onClose(() => 
    dispatch({ 
      type: types.CHANNEL_CLOSED, 
      payload: { topic, error: 'the channel has gone away gracefully' } 
    })
  );

  return channel;
};

export default setGameChannel;
