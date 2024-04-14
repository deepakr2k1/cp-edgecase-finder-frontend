import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import * as AppConstants from '../constants/AppConstants';

import { MenuItem, Select, InputLabel, TextField } from '@mui/material';
import { updateTestRuns } from '../slices/paramSlices';

export default function Sidebar() {
    const dispatch = useDispatch();
    const files = useSelector(state => state.files);
    const params = useSelector(state => state.param);


    const [open, setOpen] = useState(false);
    const [testRuns, setTestRuns] = useState(null);

    useEffect(() => {
        const _testRuns = params.testRuns;
        const filename = params.filename;
        const lang = files[filename]?.language;
        setTestRuns(_testRuns);
    });

    const toggleDrawer = (state) => () => {
        setOpen(state);
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
            <InputLabel id="test-runs" >Test Runs</InputLabel>
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
