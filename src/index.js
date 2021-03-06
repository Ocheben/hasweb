import React from 'react';
import * as Sentry from '@sentry/browser';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './_reducers'
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import 'typeface-roboto';

import { PersistGate } from 'redux-persist/lib/integration/react';
import createEncryptor from 'redux-persist-transform-encrypt';
import * as serviceWorker from './serviceWorker';
import App from './App';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// Sentry.init({ dsn: 'https://c5553768945946de845390fd807d4be6@sentry.io/1521245' });
const encryptor = createEncryptor({
  secretKey: 'necoUser',
  onError(error) {
    // Handle the error.
    console.log(error);
  }
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userInfo', 'userData'],
  transforms: [encryptor],
  stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  pReducer,
  {},
  compose(applyMiddleware(thunk),
    // eslint-disable-next-line no-underscore-dangle
    window.devToolsExtension ? window.devToolsExtension() : f => f)
);
// eslint-disable-next-line import/prefer-default-export
export const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
