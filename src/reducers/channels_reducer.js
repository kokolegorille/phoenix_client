import { combineReducers } from 'redux';

import connections from './channels/connections_reducer';
import connectionErrors from './channels/connection_errors_reducer';

const channels = combineReducers({
  connections,
  connectionErrors,
});

export default channels;
