import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './app.css';
import AuthService from './services/auth_service';
import { 
  authenticateFromToken, 
  refreshToken, 
} from './actions/authentication_actions';
import configureStore from './configure_store';
import App from './views/app_view.js'

const store = configureStore();

// RELOAD STATE FROM TOKEN
if (AuthService.isLoggedIn()) {
  // This will sync authenticated flag on reload
  // to avoid authentication_hoc to change path before
  // trying to refresh token!
  store.dispatch(authenticateFromToken());

  // Async reload of current user by refreshing token
  refreshToken()(store.dispatch);
}
// END RELOAD STATE FROM TOKEN

// eslint-disable-next-line no-undef
const app = document.getElementById('app');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  app,
);
