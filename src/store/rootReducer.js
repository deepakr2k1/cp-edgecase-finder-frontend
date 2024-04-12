import { combineReducers } from 'redux';
import fileReducer from '../slices/fileSlices';
import resultReducer from '../slices/resultSlices';
import paramReducer from '../slices/paramSlices';

export const rootReducer = combineReducers({
    files: fileReducer,
    result: resultReducer,
    param: paramReducer
});
