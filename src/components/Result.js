import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';

export default function Result() {

    const result = useSelector(state => state.result);

    const editorOptions = {
        readOnly: true,
        lineNumbers: "off",
        fontSize: "15px"
    };

    return <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        value={ result.value }
        options={ editorOptions }
    />;
}
