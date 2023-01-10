import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import '@ya.praktikum/react-developer-burger-ui-components';
import { rootReducer } from './services/reducers/index'
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socket-middleware'
import {
  connect as AllOrdersWsConnect,
  disconnect as  AllOrdersWsDisconnect,
  wsConnecting as  AllOrdersWsConnecting,
  wsOpen as  AllOrdersWsOpen,
  wsClose as  AllOrdersWsClose,
  wsMessage as  AllOrdersWsMessage,
  wsError as  AllOrdersWsError
} from "./services/actions/orders";

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const AllOrdersWsActions = {
  wsConnect: AllOrdersWsConnect,
  wsDisconnect: AllOrdersWsDisconnect,
  wsConnecting: AllOrdersWsConnecting,
  onOpen: AllOrdersWsOpen,
  onClose: AllOrdersWsClose,
  onError: AllOrdersWsError,
  onMessage: AllOrdersWsMessage,
};

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(AllOrdersWsActions)));

export const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    {/* <React.StrictMode> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </React.StrictMode> */}
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
