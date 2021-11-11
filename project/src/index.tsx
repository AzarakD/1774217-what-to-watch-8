import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import {
  createStore,
  applyMiddleware
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import App from './components/app/app';
import {
  checkAuthAction,
  fetchFilmsAction
} from './store/api-actions';
import { redirect } from './store/middleware/redirect';
import { reducer } from './store/reducer';
import { requireAuthorization } from './store/action';
import { createAPI } from './services/api';
import { AuthorizationStatus } from './const';
import type { ThunkAppDispatch } from './types/action';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const composeEnhancers = composeWithDevTools({trace: true, traceLimit: 20});

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk.withExtraArgument(api)),
  applyMiddleware(redirect),
));

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchFilmsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
