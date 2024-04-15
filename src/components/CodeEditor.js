import { useDispatch, useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';

import { updateCode } from '../slices/filesSlices';

export default function CodeEditor(props) {

    const dispatch = useDispatch();
    const files = useSelector(state => state.files);
    const params = useSelector(state => state.params);

    const handleEditorChange = (editor) => {
        dispatch(updateCode({ fileName: props.filename, content: editor }));
    };

    return <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        value={ files[props.filename]?.content }
        language={ files[props.filename]?.language }
        options={ { fontSize: "15px" } }
        sx={ { flex: 1 } }
        onChange={ handleEditorChange }
    />;
}
