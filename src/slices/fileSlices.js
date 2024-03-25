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
    }
};

export const fileSlice = createSlice({
    name: 'file',
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
    }
});

export const { updateCode, updateLanguage } = fileSlice.actions;

export default fileSlice.reducer;
