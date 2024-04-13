import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCode } from '../slices/fileSlices';

export default function CodeEditor(props) {

    const dispath = useDispatch();
    const files = useSelector(state => state.files);
    const [editorValue, setEditorValue] = useState("");
    const [editorLanguage, setEditorLanguage] = useState("cpp");

    const editorOptions = {
        fontSize: "15px"
    };

    useEffect(() => {
        const file = files[props.fileName];
        setEditorValue(file.content);
        setEditorLanguage(file.language == "py" ? "python" : file.language);
    }, [props.fileName]);

    const handleChange = (editor) => {
        dispath(updateCode({ fileName: props.fileName, content: editor }));
    };

    return <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        value={ editorValue }
        language={ editorLanguage }
        options={ editorOptions }
        sx={ { flex: 1 } }
        onChange={ handleChange }
    />;
}
