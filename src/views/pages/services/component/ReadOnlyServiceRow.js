import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Stack, Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit } from '@material-ui/icons';
import DeleteIcon from '@mui/icons-material/Delete';
import HttpCommon from 'utils/http-common';
import messages from 'utils/messages';

const ReadOnlyRow = ({ row, handleEditClick, userType, handleSearch }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleSubmit = () => {
        HttpCommon.delete(`/api/serviceType/${row.id}`)
            .then(() => {
                messages.addMessage({ title: 'Deleted', msg: 'Service deleted Successfully', type: 'success' });
                handleSearch();
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
        setDialogOpen(false);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };
    return (
        <>
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>

                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.bodyPart}</TableCell>

                {userType !== 'Trainer' ? (
                    <TableCell align="right">
                        <AnimateButton>
                            <IconButton aria-label="edit" color="secondary" onClick={(event) => handleDeleteClick(event, row)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton aria-label="edit" color="secondary" onClick={(event) => handleEditClick(event, row)}>
                                <Edit />
                            </IconButton>
                        </AnimateButton>
                    </TableCell>
                ) : (
                    <></>
                )}
            </TableRow>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '300px'
                        }
                    }
                }}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Are You Sure ?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ReadOnlyRow;
