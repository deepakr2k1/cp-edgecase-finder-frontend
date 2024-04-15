import { createSlice } from '@reduxjs/toolkit';
import * as AppConstants from '../constants/AppConstants';

const initialState = {
    filename: AppConstants.CORRECT_CODE,
    testRuns: 10,
    templateName: null
};

export const paramsSlice = createSlice({
    name: 'params',
    initialState,
    reducers: {
        updateFilename: (state, action) => {
            const { filename } = action.payload;
            state.filename = filename;
        },
        updateTestRuns: (state, action) => {
            const { testRuns } = action.payload;
            state.testRuns = testRuns;
        },
        updateTemplateName: (state, action) => {
            const { templateName } = action.payload;
            state.templateName = templateName;
        },
    }
});

export const { updateFilename, updateTestRuns, updateTemplateName } = paramsSlice.actions;

export default paramsSlice.reducer;
