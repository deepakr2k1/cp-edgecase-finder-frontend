import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import * as AppConstants from '../constants/AppConstants';

import { MenuItem, Select, InputLabel, TextField } from '@mui/material';
import { updateTestRuns } from '../slices/paramSlices';
import { updateCode } from '../slices/fileSlices';
import { updateIgcTemplateName } from '../slices/paramSlices';


const igcTemplates = {
    "cpp": {
        "name1c": "code1c",
        "name2c": "code2c",
        "name3c": "code3c"
    },
    "java": {
        "name1j": "code1j",
        "name2j": "code2j",
        "name3j": "code3j"
    },
    "py": {
        "name1p": "code1p",
        "name2p": "code2p",
        "name3p": "code3p"
    }
};

const igcTemplateNames = [
    "t_name_1",
    "t_name_2",
    "t_name_3"
];

export default function Sidebar() {
    const dispatch = useDispatch();
    const files = useSelector(state => state.files);
    const params = useSelector(state => state.param);

    const [open, setOpen] = useState(false);

    const handleTestRunsChange = (event) => {
        const val = event.target.value;
        if (val < 1 || val > 100) return;
        dispatch(updateTestRuns({ testRuns: val }));
    };

    const handleIgcTemplate = (event) => {
        const val = event.target.value;
        dispatch(updateIgcTemplateName({ igcTemplateName: val }));
        applyIgcTemplate(files.inputGeneratingCode.language, val);
    };

    const applyIgcTemplate = (lang, t_name) => {
        const code = `some code to get from some var, ${lang} & ${t_name}`;
        dispatch(updateCode({ fileName: "inputGeneratingCode", content: code }));
    };

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const DrawerList = (
        <Box sx={ { width: 250, p: 2 } } role="presentation" onClick={ toggleDrawer(false) }>
            <InputLabel id="test-runs" sx={ { marginTop: 3 } }>Test Runs</InputLabel>
            <TextField
                variant="outlined"
                fullWidth
                value={ params.testRuns }
                color='secondary'
                type="number"
                inputProps={ {
                    min: 1,
                    max: 100,
                    step: 1
                } }
                onChange={ handleTestRunsChange }
                onClick={ stopPropagation } />
            <InputLabel id="language" sx={ { mt: 2 } }>Input Generating Code Template</InputLabel>
            <Select
                id="input-generating-code-template"
                fullWidth
                value={ params.igcTemplateName }
                color='secondary'
                onChange={ handleIgcTemplate }
                onClick={ stopPropagation } >
                {
                    igcTemplateNames.map((templateName) => {
                        return <MenuItem value={ templateName }>{ templateName }</MenuItem>;
                    })
                }
            </Select>
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
