import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Button, CircularProgress } from '@mui/material';
import { updateResult } from '../slices/resultSlices';
import CodeEditor from './CodeEditor';
import Result from './Result';
import * as AppConstants from '../constants/AppConstants';
import * as AppConfigs from '../constants/AppConfigs';

export default function Home() {

    const dispath = useDispatch();
    const files = useSelector(state => state.files);

    const [loading, setLoading] = useState(false);
    const [tabName, setTabName] = useState(AppConstants.CORRECT_CODE);
    const [fileName, setFileName] = useState(AppConstants.CORRECT_CODE_FILENAME);

    const onSubmit = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${AppConfigs.API_HOST}/api/code-run`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...files, testRuns: 3 })
            });

            const result = await response.json();

            if (result.errorMessage) {
                dispath(updateResult(result.errorMessage));
            } else if (result.isSameOutput) {
                dispath(updateResult("Your code is correct!"));
            } else {
                dispath(updateResult(
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
    };

    return (
        <div className='home-container'>
            <Tabs
                textColor="secondary"
                indicatorColor="secondary"
                sx={ { height: "50px", background: "white" } }
                value={ tabName }
                onChange={ handleChange }
            >
                <Tab value={ AppConstants.CORRECT_CODE } label={ AppConstants.CORRECT_CODE_LABEL } />
                <Tab value={ AppConstants.TESTING_CODE } label={ AppConstants.TESTING_CODE_LABEL } />
                <Tab value={ AppConstants.INPUT_GENERATING_CODE } label={ AppConstants.INPUT_GENERATING_CODE_LABEL } />
                <Tab value={ AppConstants.RESULT } label={ AppConstants.RESULT_LABEL } />
            </Tabs>

            {
                tabName === AppConstants.RESULT ?
                    <Result fileName={ fileName } /> :
                    <CodeEditor fileName={ fileName } />
            }

            <div>
                <Button
                    color="secondary"
                    variant="contained"
                    sx={ { float: "right", mr: 2, mb: 2, color: "white" } }
                    onClick={ onSubmit } >
                    Submit
                    {
                        loading ?
                            <CircularProgress color="primary" size={ "20px" } sx={ { ml: 1 } } /> :
                            null
                    }
                </Button>
            </div>
        </div>
    );
}
