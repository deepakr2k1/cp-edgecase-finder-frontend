import { createSlice } from '@reduxjs/toolkit';

const initialState = { res: "" };

export const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        updateResult: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { updateResult } = resultSlice.actions;

export default resultSlice.reducer;
