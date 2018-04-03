import { combineReducers } from 'redux';
import bootupTime from './application/bootup_time_reducer';
import isFetching from './application/is_fetching_reducer';
import socketStatus from './application/socket_status_reducer';

const application = combineReducers({
  bootupTime,
  isFetching,
  socketStatus,
});

export default application;
