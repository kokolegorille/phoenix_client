import * as types from '../../actions/action_types';

import initialState from '../initial_state';

const bootupTime = (state = initialState.application.bootupTime, action) => {
  switch (action.type) {
    case types.APP_BOOTUP:
      return action.payload;
    default:
      return state;
  }
};

export default bootupTime;