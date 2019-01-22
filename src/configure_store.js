import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import reduxApp from './reducers';
import socketMiddleware from './middlewares/socket_middleware';

const __DEV__ = process.env.NODE_ENV !== 'production';

const configureStore = () => {
  const middlewares = [
    reduxThunk,
    socketMiddleware,
  ];

  if (__DEV__) {
    middlewares.push(createLogger({collapsed: true, diff: true}));
  }

  const store = createStore(
    reduxApp,
    __DEV__
      ? composeWithDevTools(applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares),
  );

  return store;
};

export default configureStore;