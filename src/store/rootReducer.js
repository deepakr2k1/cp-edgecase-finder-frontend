import { combineReducers } from 'redux';
import fileReducer from '../slices/fileSlices';
import resultReducer from '../slices/resultSlices';

export const rootReducer = combineReducers({
    files: fileReducer,
    result: resultReducer
});
