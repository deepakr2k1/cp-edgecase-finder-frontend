import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, CircularProgress } from '@mui/material';

import Navbar from './Navbar';
import CodeEditor from './CodeEditor';
import Result from './Result';
import { updateResult } from '../slices/filesSlices';
import { updateFilename } from '../slices/paramsSlices';

import * as AppConfigs from '../constants/AppConfigs';
import * as AppConstants from '../constants/AppConstants';

export default function Home() {

    const dispatch = useDispatch();
    const files = useSelector(state => state.files);
    const params = useSelector(state => state.params);

    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setLoading(true);

            const payload = {
                correctCode: files.correctCode,
                testingCode: files.testingCode,
                inputGeneratingCode: files.inputGeneratingCode,
                testRuns: params.testRuns
            };

            const result = await fetchData(payload);

            console.log(result);

            if (result.errorMessage) {
                dispatch(updateResult({ result: result.errorMessage }));
            } else if (result.isSameOutput) {
                dispatch(updateResult({ result: "Your code is correct!" }));
            } else {
                dispatch(updateResult({
                    result:
                        "Input: \n" + result.input +
                        "\nCorrect Code Output: \n" + result.correctCodeOutput +
                        "\nTesting Code Output: \n" + result.testCodeOutput
                }));
            }
        } catch (error) {
            console.log(error);
            console.error('Error fetching data:', error);
        } finally {
            dispatch(updateFilename({ filename: AppConstants.RESULT }));
            setLoading(false);
        }
    };

    return (
        <div className='home-container'>

            <Navbar />

            { params.filename === AppConstants.CORRECT_CODE && <CodeEditor filename={ AppConstants.CORRECT_CODE } /> }
            { params.filename === AppConstants.TESTING_CODE && <CodeEditor filename={ AppConstants.TESTING_CODE } /> }
            { params.filename === AppConstants.INPUT_GENERATING_CODE && <CodeEditor filename={ AppConstants.INPUT_GENERATING_CODE } /> }
            { params.filename === AppConstants.RESULT && <Result filename={ AppConstants.RESULT } /> }

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
        </div >

    );
}

const fetchData = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${AppConfigs.API_HOST}/api/code-run`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });
};
