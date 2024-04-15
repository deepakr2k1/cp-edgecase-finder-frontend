import Editor from '@monaco-editor/react';
import { useSelector } from 'react-redux';

export default function Result() {

    const files = useSelector(state => state.files);

    return <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        value={ files.result }
        options={ {
            readOnly: true,
            lineNumbers: "off",
            fontSize: "15px"
        } }
    />;
}
