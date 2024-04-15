import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Drawer, MenuItem, Select, InputLabel, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { updateCode } from '../slices/filesSlices';
import { updateTestRuns, updateTemplateName } from '../slices/paramsSlices';

import * as AppConstants from '../constants/AppConstants';
import templates from '../constants/CodeTemplates';

export default function Sidebar() {

    const dispatch = useDispatch();
    const files = useSelector(state => state.files);
    const params = useSelector(state => state.params);

    const [open, setOpen] = useState(false);

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const handleTestRunsChange = (event) => {
        const testRuns = event.target.value;
        if (testRuns < 1 || testRuns > 100) return;
        dispatch(updateTestRuns({ testRuns }));
    };

    const handleTemplateNameChange = (event) => {
        const templateName = event.target.value;
        dispatch(updateTemplateName({ templateName }));
        applyTemplate(files.inputGeneratingCode.language, templateName);
    };

    const applyTemplate = (lang, templateName) => {
        if (!templateName) return;
        const code = templates[lang][templateName];
        dispatch(updateCode({ fileName: AppConstants.INPUT_GENERATING_CODE, content: code }));
    };

    const DrawerList = (
        <Box sx={ { width: 250, p: 2 } } role="presentation" onClick={ toggleDrawer(false) }>
            <InputLabel id="test-runs-label" sx={ { marginTop: 3 } }>Test Runs</InputLabel>
            <TextField
                id="test-runs"
                variant="outlined"
                color="secondary"
                type="number"
                fullWidth
                value={ params.testRuns }
                inputProps={ { min: 1, max: 100, step: 1 } }
                onChange={ handleTestRunsChange }
                onClick={ stopPropagation } />

            <InputLabel id="template-name-label" sx={ { mt: 2 } }>Input Generating Code Template</InputLabel>
            <Select
                id="template-name"
                color="secondary"
                fullWidth
                value={ params.templateName }
                onChange={ handleTemplateNameChange }
                onClick={ stopPropagation } >
                {
                    AppConstants.templateNames.map((templateName) => {
                        return <MenuItem value={ templateName }>{ templateName }</MenuItem>;
                    })
                }
            </Select>
        </Box>
    );

    return (
        <div>
            <Button onClick={ toggleDrawer(true) }>
                <MenuIcon color="secondary" />
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
