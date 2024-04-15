import { combineReducers } from 'redux';
import filesReducer from '../slices/filesSlices';
import paramsReducer from '../slices/paramsSlices';

export const rootReducer = combineReducers({
    files: filesReducer,
    params: paramsReducer
});
