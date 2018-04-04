import * as types from '../actions/action_types';

const setUserChannel = (dispatch, socket, topic) => {
  const channel = socket.channel(topic, {});

  channel.on('join_game', payload =>
    dispatch({ type: types.JOIN_GAME, payload }));

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

export default setUserChannel;
