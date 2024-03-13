import React from 'react';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit, Delete } from '@material-ui/icons';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import HttpCommon from 'utils/http-common';

const ReadOnlyRowGymAdmin = ({ row, handleEditClick, handleDeleteClick }) => {
    const navigate = useNavigate();

    const handleShowProfile = () => {
        navigate('/pages/report/gymReport', { state: { gymId: row.id } });
    };
    return (
        <>
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.CreatedAt.substring(0, 10)}</TableCell>

                <TableCell align="right">
                    <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={2}>
                        <Button variant="contained" color="secondary" onClick={handleShowProfile}>
                            Show Gym
                        </Button>
                    </Stack>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ReadOnlyRowGymAdmin;
