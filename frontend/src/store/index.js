import { combineReducers, applyMiddleware, compose } from 'redux';
import { legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import classificationReducer from './classification';
import genresReducer from './genre';
import eventsReducer from './event';

const rootReducer = combineReducers({
  session,
  classifications: classificationReducer,
  genres: genresReducer,
  events: eventsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;