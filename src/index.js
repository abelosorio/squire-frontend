import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import './index.css';
import AppRoot from './modules/App/components/AppRoot';
import AppReducer from './modules/App/reducers';

// GraphQL client
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
  })
});

// Redux logger
const reduxLogger = createLogger({ collapsed: true });

// Redux middlewares
const reduxMiddlewares = [reduxThunk, client.middleware()];

if (process.env.NODE_ENV === 'development') {
  reduxMiddlewares.push(reduxLogger);
}

// Redux store
let store = createStore(
  AppReducer,
  compose(applyMiddleware(...reduxMiddlewares))
);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <ApolloProvider client={ client }>
    <ReduxProvider store={ store }>
      <AppRoot />
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
