import React, { useEffect, useState } from 'react';
import { TableCell, TextField, TableRow, IconButton, Autocomplete } from '@material-ui/core';
import { Cancel, Save } from '@material-ui/icons';
import AnimateButton from 'ui-component/extended/AnimateButton';

const bodyparts = ['ABS', 'Back', 'Biceps', 'Chest', 'Forearm', 'Hips', 'Legs', 'Shoulder', 'Triceps'];
const status = ['Availble', 'Not Available'];

const EditableRow = ({
    editableServiceName,
    editableServiceStatus,
    editableBodyPart,
    setEditableServiceName,
    setEditableServiceStatus,
    setEditableBodyPart,
    handleEditFormSubmit,
    handleCancelClick
}) => {
    const handleServiceName = (event) => {
        setEditableServiceName(event.target.value);
    };

    const handleServiceStatus = (event, newValue) => {
        setEditableServiceStatus(newValue);
    };

    const handleBodyPart = (event, newValue) => {
        setEditableBodyPart(newValue);
    };
    return (
        <>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                    <TextField
                        required
                        fullWidth
                        label="Name"
                        margin="dense"
                        name="name"
                        value={editableServiceName}
                        onChange={handleServiceName}
                        color="secondary"
                    />
                </TableCell>
                <TableCell>
                    <Autocomplete
                        value={editableServiceStatus}
                        // inputValue={editFormData.bodyType}
                        onChange={handleServiceStatus}
                        id="controllable-states-demo"
                        options={status}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Status"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                name="status"
                                color="secondary"
                            />
                        )}
                    />
                </TableCell>
                <TableCell>
                    <Autocomplete
                        value={editableBodyPart}
                        // inputValue={editFormData.bodyType}
                        onChange={handleBodyPart}
                        id="controllable-states-demo"
                        options={bodyparts}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Body Part"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                name="bodyPart"
                                color="secondary"
                            />
                        )}
                    />
                </TableCell>
                <TableCell align="right">
                    <AnimateButton>
                        <IconButton aria-label="edit" color="secondary" onClick={handleEditFormSubmit}>
                            <Save />
                        </IconButton>
                        <IconButton aria-label="edit" color="secondary" onClick={handleCancelClick}>
                            <Cancel />
                        </IconButton>
                    </AnimateButton>
                </TableCell>
            </TableRow>
        </>
    );
};

export default EditableRow;
