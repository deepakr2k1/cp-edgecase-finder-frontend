import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Button, CircularProgress, Box, MenuItem, Select } from '@mui/material';
import { updateResult } from '../slices/resultSlices';
import Sidebar from './Sidebar';
import CodeEditor from './CodeEditor';
import Result from './Result';
import * as AppConstants from '../constants/AppConstants';
import * as AppConfigs from '../constants/AppConfigs';
import { updateFilename } from '../slices/paramSlices';
import { updateLanguage } from '../slices/fileSlices';


export default function Home() {
    const dispatch = useDispatch();
    const files = useSelector(state => state.files);
    const params = useSelector(state => state.param);

    const [loading, setLoading] = useState(false);
    const [tabName, setTabName] = useState(AppConstants.CORRECT_CODE);
    const [fileName, setFileName] = useState(AppConstants.CORRECT_CODE_FILENAME);
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        const filename = params.filename;
        const lang = files[filename]?.language;
        setLanguage(lang);
    });

    const onSubmit = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${AppConfigs.API_HOST}/api/code-run`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...files, testRuns: params.testRuns })
            });

            const result = await response.json();

            if (result.errorMessage) {
                dispatch(updateResult(result.errorMessage));
            } else if (result.isSameOutput) {
                dispatch(updateResult("Your code is correct!"));
            } else {
                dispatch(updateResult(
                    "Input: \n" + result.input +
                    "\nCorrect Code Output: \n" + result.correctCodeOutput +
                    "\nTesting Code Output: \n" + result.testCodeOutput
                ));
            }
            setTabName(AppConstants.RESULT);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getFileNameFromTabName = (tabName) => {
        switch (tabName) {
            case AppConstants.CORRECT_CODE:
                return AppConstants.CORRECT_CODE_FILENAME;
            case AppConstants.TESTING_CODE:
                return AppConstants.TESTING_CODE_FILENAME;
            case AppConstants.INPUT_GENERATING_CODE:
                return AppConstants.INPUT_GENERATING_CODE_FILENAME;
            case AppConstants.RESULT:
                return AppConstants.RESULT_FILENAME;
            default:
                return null;
        }
    };

    const handleChange = (event, newTabName) => {
        setTabName(newTabName);
        setFileName(getFileNameFromTabName(newTabName));
        if (newTabName != AppConstants.RESULT) {
            dispatch(updateFilename({
                filename: getFileNameFromTabName(newTabName)
            }));
        }
    };

    const handleLangChange = (event) => {
        const val = event.target.value;
        dispatch(updateLanguage({ fileName: params.filename, language: val }));
        setLanguage(val);
    };

    return (
        <div className='home-container'>
            <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 50, background: 'white' } }>
                <Tabs
                    textColor="secondary"
                    indicatorColor="secondary"
                    value={ tabName }
                    onChange={ handleChange }
                >
                    <Tab value={ AppConstants.CORRECT_CODE } label={ AppConstants.CORRECT_CODE_LABEL } />
                    <Tab value={ AppConstants.TESTING_CODE } label={ AppConstants.TESTING_CODE_LABEL } />
                    <Tab value={ AppConstants.INPUT_GENERATING_CODE } label={ AppConstants.INPUT_GENERATING_CODE_LABEL } />
                    <Tab value={ AppConstants.RESULT } label={ AppConstants.RESULT_LABEL } />
                </Tabs>
                <Box sx={ { display: 'flex', alignItems: 'center', height: 50, background: 'white' } }>
                    {
                        tabName !== AppConstants.RESULT ?
                            <Select
                                id="language"
                                fullWidth
                                value={ language }
                                color='secondary'
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

            {
                tabName === AppConstants.RESULT ?
                    <Result fileName={ fileName } /> :
                    <CodeEditor fileName={ fileName } />
            }

            <div>
                <Button
                    color="secondary"
                    variant="contained"
                    sx={ { float: "right", mr: 2, mb: 2, color: "white", zIndex: 1300 } }
                    onClick={ onSubmit } >
                    Submit
                    { loading && <CircularProgress color="primary" size={ "20px" } sx={ { ml: 1 } } /> }
                </Button>
            </div>
        </div>
    );
}
