import { combineReducers } from 'redux';
import stories from './stories';
import details from './details';

const rootReducer = combineReducers({ stories, details });
export default rootReducer;
