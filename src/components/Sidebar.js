import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import * as AppConstants from '../constants/AppConstants';

import { MenuItem, Select, InputLabel, TextField } from '@mui/material';
import { updateTestRuns } from '../slices/paramSlices';
import { updateLanguage } from '../slices/fileSlices';

export default function Sidebar() {
    const dispatch = useDispatch();
    const files = useSelector(state => state.files);
    const params = useSelector(state => state.param);


    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState(null);
    const [testRuns, setTestRuns] = useState(null);

    useEffect(() => {
        const _testRuns = params.testRuns;
        const filename = params.filename;
        const lang = files[filename]?.language;
        setTestRuns(_testRuns);
        setLanguage(lang);
    });

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    const handleLangChange = (event) => {
        const val = event.target.value;
        dispatch(updateLanguage({ fileName: params.filename, language: val }));
        setLanguage(val);
    };

    const handleTestRunsChange = (event) => {
        const val = event.target.value;
        if (val < 1 || val > 100) return;
        dispatch(updateTestRuns({ testRuns: val }));
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const DrawerList = (
        <Box sx={ { width: 250, p: 2 } } role="presentation" onClick={ toggleDrawer(false) }>
            <InputLabel id="language">Language</InputLabel>
            <Select
                id="language"
                fullWidth
                value={ language }
                color='secondary'
                onChange={ handleLangChange }
                onClick={ stopPropagation } >
                <MenuItem value={ AppConstants.CPP }>C++</MenuItem>
                <MenuItem value={ AppConstants.JAVA }>Java</MenuItem>
                <MenuItem value={ AppConstants.PYTHON }>Python</MenuItem>
            </Select>
            <InputLabel id="test-runs" sx={ { marginTop: 3 } }>Test Runs</InputLabel>
            <TextField
                variant="outlined"
                fullWidth
                value={ testRuns }
                color='secondary'
                type="number"
                inputProps={ {
                    min: 1,
                    max: 100,
                    step: 1
                } }
                onChange={ handleTestRunsChange }
                onClick={ stopPropagation } />
        </Box>
    );

    return (
        <div>
            <Button onClick={ toggleDrawer(true) }>
                <MenuIcon color='secondary' />
            </Button>
            <Drawer
                anchor="right"
                open={ open }
                onClose={ toggleDrawer(false) }
                ModalProps={ { disableBackdropClick: true } }
                slotProps={ { backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0)' } } } }>
                { DrawerList }
            </Drawer>
        </div>
    );
}
