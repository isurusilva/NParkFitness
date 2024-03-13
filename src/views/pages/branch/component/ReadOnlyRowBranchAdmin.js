import React from 'react';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit } from '@material-ui/icons';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';

const ReadOnlyRowBranchAdmin = ({ row, handleEditClick }) => {
    const navigate = useNavigate();

    const handleShowProfile = () => {
        navigate('/pages/report/branchReport', { state: { branchId: row.id } });
    };
    return (
        <>
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.street}</TableCell>
                <TableCell align="center">{row.lane}</TableCell>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{row.province}</TableCell>
                {row.isActive === true ? <TableCell align="center">Active</TableCell> : <TableCell align="center">Not Active</TableCell>}

                <TableCell align="right">
                    <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={2}>
                        <Button variant="contained" color="secondary" onClick={handleShowProfile}>
                            Show Branch
                        </Button>
                    </Stack>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ReadOnlyRowBranchAdmin;
