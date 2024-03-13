import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit } from '@material-ui/icons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import HttpCommon from 'utils/http-common';
import messages from 'utils/messages';

const ReadOnlyRow = ({ row, userType, handleViewEditClick, handleSearch, nullBranchStaff, setIsEdit, showDataToManager }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleEditClick = (row) => (event) => {
        setIsEdit(true);
        handleViewEditClick(event, row);
    };
    const handleViewClick = (row) => (event) => {
        setIsEdit(false);
        handleViewEditClick(event, row);
    };

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleSubmit = () => {
        HttpCommon.put(`/api/user/${row.id}`, {
            branchId: null
        })
            .then((res) => {
                if (userType === 'Owner') {
                    handleSearch();
                } else {
                    showDataToManager();
                }
                messages.addMessage({ title: 'Edit Successfully !', msg: 'Subscription Type Edited Successfully', type: 'success' });
            })
            .catch((error) => {
                messages.addMessage({ title: 'Fail !', msg: error.message, type: 'danger' });
            });
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="center">{row.firstName.concat(' ', row.lastName)}</TableCell>
                <TableCell align="center">{row.contactNo}</TableCell>
                {userType === 'Admin' ? <TableCell align="center">{row.type}</TableCell> : <></>}
                {nullBranchStaff === true ? (
                    <>
                        <TableCell align="center">{row.CreatedAt.toString().slice(0, 10)}</TableCell>
                        <TableCell align="center">{row.type}</TableCell>
                    </>
                ) : (
                    <></>
                )}
                <TableCell align="right">
                    <AnimateButton>
                        <IconButton aria-label="edit" color="secondary" onClick={handleViewClick(row)}>
                            <VisibilityIcon />
                        </IconButton>
                        {userType === 'Admin' ? (
                            <></>
                        ) : (
                            <IconButton aria-label="edit" color="secondary" onClick={handleEditClick(row)}>
                                <Edit />
                            </IconButton>
                        )}
                        {nullBranchStaff === true ? (
                            <></>
                        ) : (
                            <>
                                {userType === 'Owner' || userType === 'Manager' ? (
                                    <IconButton aria-label="remove" color="secondary" onClick={(event) => handleDeleteClick(event, row)}>
                                        <DeleteIcon />
                                    </IconButton>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                    </AnimateButton>
                </TableCell>
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
