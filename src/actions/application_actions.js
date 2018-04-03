import * as types from './action_types';

// eslint-disable-next-line import/prefer-default-export
export const appBootup = bootupTime => (
  { type: types.APP_BOOTUP, payload: bootupTime }
);
