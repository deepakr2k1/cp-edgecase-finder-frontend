import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCode } from '../slices/fileSlices';

export default function CodeEditor(props) {

    const dispatch = useDispatch();
    const files = useSelector(state => state.files);

    const handleChange = (editor) => {
        dispatch(updateCode({ fileName: props.fileName, content: editor }));
    };

    return <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        value={ files[props.fileName].content }
        language={ files[props.fileName].language }
        onChange={ handleChange }
        options={ { fontSize: "15px" } }
        sx={ { flex: 1 } }
    />;
}
