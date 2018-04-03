import initialState from '../initial_state';

const isFetching = (state = initialState.application.isFetching, action) => {
  if (action.type.match(/_REQUEST$/)) {
    return true;
  } else if (action.type.match(/_SUCCESS$/) || action.type.match(/_ERROR$/)) {
    return false;
  }
  return state;
};

export default isFetching;
