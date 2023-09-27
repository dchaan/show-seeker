import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import * as artistActions from "./store/artist";
import * as classificationActions from "./store/classification";
import * as eventActions from "./store/event";
import * as favoriteActions from "./store/favorites";
import * as genreActions from "./store/genre";
import * as purchaseActions from "./store/purchases";
import * as sessionActions from "./store/session";
import * as venueActions from "./store/venue";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.artistActions = artistActions;
  window.classificationActions = classificationActions;
  window.eventActions = eventActions;
  window.favoriteActions = favoriteActions;
  window.genreActions = genreActions;
  window.purchaseActions = purchaseActions;
  window.sessionActions = sessionActions;
  window.venueActions = venueActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);