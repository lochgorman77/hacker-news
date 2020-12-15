import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const composeEnhancers = composeWithDevTools({
  trace: true,
});
const reduxLogger = createLogger({
  predicate: (getState, action) => action.type === 'FETCH_DETAILS_ERROR',
});

const configureStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, reduxLogger))
);
export default configureStore;
