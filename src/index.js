import React from 'react';
import * as Sentry from '@sentry/browser';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './_reducers'
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import 'typeface-roboto';

import { PersistGate } from 'redux-persist/lib/integration/react';
import createEncryptor from 'redux-persist-transform-encrypt';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

Sentry.init({dsn: "https://c5553768945946de845390fd807d4be6@sentry.io/1521245"});
const encryptor = createEncryptor({
    secretKey: 'necoUser',
    onError: function(error) {
      // Handle the error.
    }
  })

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['saveUser'],
    transforms: [encryptor]
    // stateReconciler: autoMergeLevel2 
   };
   
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    pReducer,
    {},
    compose(applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
export const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
    <PersistGate  persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
