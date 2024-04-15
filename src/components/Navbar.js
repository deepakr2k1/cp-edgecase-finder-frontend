import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Box, MenuItem, Select } from '@mui/material';

import Sidebar from './Sidebar';
import { updateCode, updateLanguage } from '../slices/filesSlices';
import { updateFilename } from '../slices/paramsSlices';

import * as AppConstants from '../constants/AppConstants';
import templates from '../constants/CodeTemplates';

export default function Navbar() {

    const dispatch = useDispatch();
    const files = useSelector(state => state.files);
    const params = useSelector(state => state.params);

    const handleTabChange = (event, fileName) => {
        dispatch(updateFilename({ filename: fileName }));
    };

    const handleLangChange = (event) => {
        const lang = event.target.value;
        dispatch(updateLanguage({ fileName: params.filename, language: lang }));
        applyTemplate(lang, params.templateName);
    };

    const applyTemplate = (lang, templateName) => {
        if (!templateName) return;
        const code = templates[lang][templateName];
        dispatch(updateCode({ fileName: AppConstants.INPUT_GENERATING_CODE, content: code }));
    };

    return (
        <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 50, background: 'white' } }>
            <Tabs
                textColor="secondary"
                indicatorColor="secondary"
                value={ params.filename }
                onChange={ handleTabChange }
            >
                <Tab value={ AppConstants.CORRECT_CODE } label={ AppConstants.CORRECT_CODE_LABEL } />
                <Tab value={ AppConstants.TESTING_CODE } label={ AppConstants.TESTING_CODE_LABEL } />
                <Tab value={ AppConstants.INPUT_GENERATING_CODE } label={ AppConstants.INPUT_GENERATING_CODE_LABEL } />
                <Tab value={ AppConstants.RESULT } label={ AppConstants.RESULT_LABEL } />
            </Tabs>
            <Box sx={ { display: 'flex', alignItems: 'center', height: 50, background: 'white' } }>
                {
                    params.filename !== AppConstants.RESULT ?
                        <Select
                            id="lang"
                            color="secondary"
                            fullWidth
                            value={ files[params.filename]?.language }
                            onChange={ handleLangChange }
                            sx={ {
                                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' }
                            } }>
                            <MenuItem value={ AppConstants.CPP }>C++</MenuItem>
                            <MenuItem value={ AppConstants.JAVA }>Java</MenuItem>
                            <MenuItem value={ AppConstants.PYTHON }>Python</MenuItem>
                        </Select>
                        : null
                }
                <Sidebar />
            </Box>
        </Box >
    );
}
