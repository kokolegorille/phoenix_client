import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';

import './app.css';
import App from './views/app_view.js'
import configureStore from './configure_store';

const store = configureStore();

// eslint-disable-next-line no-undef
const app = document.getElementById('app');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  app,
);
