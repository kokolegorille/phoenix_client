import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';

import './app.css';

const App = () => (
  <h1>Hello world from React</h1>
);

// eslint-disable-next-line no-undef
const app = document.getElementById('app');
render(
  <App />,
  app,
);
