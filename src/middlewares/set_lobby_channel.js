import { Presence } from 'phoenix';

import * as types from '../actions/action_types';

let presences = {};

const setLobbyChannel = (dispatch, socket) => {
  const topic = 'lobby';
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

  // Request
  channel.on('requests_received', payload =>
    dispatch({ type: types.REQUESTS_RECEIVED, payload }));

  channel.on('request_created', payload =>
    dispatch({ type: types.REQUEST_CREATED, payload }));

  channel.on('request_created_error', payload =>
    dispatch({ type: types.REQUEST_CREATED_ERROR, payload }));

  channel.on('request_cancelled', payload =>
    dispatch({ type: types.REQUEST_CANCELLED, payload }));

  channel.on('request_cancelled_error', payload =>
    dispatch({ type: types.REQUEST_CANCELLED_ERROR, payload }));

  channel.on('request_accepted', payload =>
    dispatch({ type: types.REQUEST_ACCEPTED, payload }));

  channel.on('request_accepted_error', payload =>
    dispatch({ type: types.REQUEST_ACCEPTED_ERROR, payload }));

  channel.on('games_received', payload =>
    dispatch({ type: types.GAMES_RECEIVED, payload }));

  channel.on('game_added', payload =>
    dispatch({ type: types.GAME_ADDED, payload }));

  channel.on('game_removed', payload =>
    dispatch({ type: types.GAME_REMOVED, payload }));

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

export default setLobbyChannel;
