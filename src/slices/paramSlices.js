import { createSlice } from '@reduxjs/toolkit';
import * as AppConstants from '../constants/AppConstants';

const initialState = {
    filename: AppConstants.CORRECT_CODE_FILENAME,
    testRuns: 10,
    igcTemplate: null
};

export const paramSlice = createSlice({
    name: 'param',
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
        updateIgcTemplateName: (state, action) => {
            const { igcTemplateName } = action.payload;
            state.igcTemplate = igcTemplateName;
        },
    }
});

export const { updateFilename, updateTestRuns, updateIgcTemplateName } = paramSlice.actions;

export default paramSlice.reducer;
