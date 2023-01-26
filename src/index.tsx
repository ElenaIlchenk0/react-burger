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
import { HashRouter as Router } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socket-middleware'
import {
  connect as connectAllOrders,
  disconnect as disconnectAllOrders,
  wsConnecting as connectingAllOrders,
  wsOpen as openAllOrders,
  wsClose as closeAllOrders,
  wsMessage as messageAllOrders,
  wsError as errorAllOrders
} from "./services/actions/orders";
import {
  connect as connectUserOrders,
  disconnect as disconnectUserOrders,
  wsConnecting as connectingUserOrders,
  wsOpen as openUserOrders,
  wsClose as closeUserOrders,
  wsMessage as messageUserOrders,
  wsError as errorUserOrders
} from "./services/actions/userOrders";

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const AllOrdersWsActions = {
  wsConnect: connectAllOrders,
  wsDisconnect: disconnectAllOrders,
  wsConnecting: connectingAllOrders,
  onOpen: openAllOrders,
  onClose: closeAllOrders,
  onError: errorAllOrders,
  onMessage: messageAllOrders,
};

const UserOrdersWsActions = {
  wsConnect: connectUserOrders,
  wsDisconnect: disconnectUserOrders,
  wsConnecting: connectingUserOrders,
  onOpen: openUserOrders,
  onClose: closeUserOrders,
  onError: errorUserOrders,
  onMessage: messageUserOrders,
};

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(AllOrdersWsActions), socketMiddleware(UserOrdersWsActions)));

export const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
