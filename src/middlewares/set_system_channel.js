import { Presence } from 'phoenix';

import * as types from '../actions/action_types';

const setSystemChannel = (dispatch, socket) => {
  const topic = 'system';
  const channel = socket.channel(topic, {});

  // Presences
  const presence = new Presence(channel);
  const listBy = (id, { metas: [first, ...rest] }) =>
    Object.assign({}, first, { id, count: rest.length + 1 });

  presence.onSync(() => {
    const presences = presence.list(listBy);
    return dispatch({
      type: types.DISPATCH_PRESENCE_STATE,
      payload: { topic, presences },
    });
  });

  // Control and Lag estimation
  channel.on('ping', (payload) => { channel.push('pong', payload); });

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

export default setSystemChannel;
