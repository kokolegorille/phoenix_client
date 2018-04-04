import * as types from './action_types';

/* eslint-disable no-multi-spaces */
export const joinChannel  = topic => ({ type: types.JOIN_CHANNEL, topic });
export const leaveChannel = topic => ({ type: types.LEAVE_CHANNEL, topic });
/* eslint-enable no-multi-spaces */