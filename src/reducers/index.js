import { combineReducers } from 'redux';

import application from './application_reducer';
import authentication from './authentication_reducer';
// import channels from './channels_reducer';
// import presences from './presences_reducer';

const reduxApp = combineReducers({
  application,
  authentication,
  // channels,
  // presences,
});

export default reduxApp;
