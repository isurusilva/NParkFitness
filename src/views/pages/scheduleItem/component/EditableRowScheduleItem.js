import React, { useState } from 'react';
import { Cancel, Save } from '@material-ui/icons';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, IconButton, TextField, Autocomplete } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';

const EditableRowScheduleItem = ({
    editFormDataScheduleItem,
    handleEditFormChangeScheduleItem,
    handleEditFormSubmitScheduleItem,
    handleCancelClickScheduleItem,
    setEditedValueService,
    serviceArray,
    getService,
    row,
    setServiceId
}) => {
    const handleSetServiceId = () => {
        console.log(row.serviceId);

        setServiceId(row.serviceId);
    };
    const indexOfArrayService = (element) => element === `${editFormDataScheduleItem.serviceId}`;
    const indexService = serviceArray.findIndex(indexOfArrayService);
    const [serviceValue, setServiceValue] = useState(serviceArray[indexService]);
    return (
        <>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right" style={{ padding: '0px 12px 0px 0px' }}>
                    <Autocomplete
                        value={row.service.name}
                        onChange={(event, newValue) => {
                            setEditedValueService(newValue.value);
                        }}
                        id="controllable-states-demo"
                        options={serviceArray}
                        renderInput={(params) => <TextField {...params} variant="outlined" fullWidth margin="dense" name="serviceId" />}
                    />
                </TableCell>
                <TableCell align="right" style={{ padding: '0px 12px 0px 0px' }}>
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        name="noOfSet"
                        type="number"
                        value={editFormDataScheduleItem.noOfSet}
                        onChange={handleEditFormChangeScheduleItem}
                    />
                </TableCell>
                <TableCell align="right" style={{ padding: '0px 12px 0px 0px' }}>
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        name="noOfRepetition"
                        type="number"
                        value={editFormDataScheduleItem.noOfRepetition}
                        onChange={handleEditFormChangeScheduleItem}
                    />
                </TableCell>
                <TableCell align="right" style={{ padding: '0px 12px 0px 0px' }}>
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        name="timeBySeconds"
                        type="number"
                        value={editFormDataScheduleItem.timeBySeconds}
                        onChange={handleEditFormChangeScheduleItem}
                    />
                </TableCell>
                <TableCell align="right" style={{ padding: '0px 12px 0px 0px' }}>
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        name="calAmount"
                        type="number"
                        value={editFormDataScheduleItem.calAmount}
                        onChange={handleEditFormChangeScheduleItem}
                    />
                </TableCell>

                <TableCell align="right">
                    <AnimateButton>
                        <IconButton aria-label="edit" color="secondary" onClick={handleEditFormSubmitScheduleItem}>
                            <Save />
                        </IconButton>
                        <IconButton aria-label="edit" color="secondary" onClick={handleCancelClickScheduleItem}>
                            <Cancel />
                        </IconButton>
                    </AnimateButton>
                </TableCell>
            </TableRow>
        </>
    );
};

export default EditableRowScheduleItem;
