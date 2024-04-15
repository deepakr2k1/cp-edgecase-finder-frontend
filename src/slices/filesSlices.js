import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    correctCode: {
        content: "// Write Correct code here...",
        language: "cpp"
    },
    testingCode: {
        content: "// Write Testing code here...",
        language: "cpp"
    },
    inputGeneratingCode: {
        content: "// Write Input Generating code here...",
        language: "cpp"
    },
    result: null
};

export const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        updateCode: (state, action) => {
            const { fileName, content } = action.payload;
            state[fileName] = { ...state[fileName], content };
        },
        updateLanguage: (state, action) => {
            const { fileName, language } = action.payload;
            state[fileName] = { ...state[fileName], language };
        },
        updateResult: (state, action) => {
            const { result } = action.payload;
            state["result"] = result;
        },
    }
});

export const { updateCode, updateLanguage, updateResult } = filesSlice.actions;

export default filesSlice.reducer;
