import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import trackReducer from './trackReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    mapReducer, 
    trackReducer,
    orderReducer
})