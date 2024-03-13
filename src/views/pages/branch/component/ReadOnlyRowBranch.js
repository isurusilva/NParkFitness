import React from 'react';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit } from '@material-ui/icons';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';

const ReadOnlyRow = ({ row, handleEditClick }) => {
    const navigate = useNavigate();

    const handleShowProfile = () => {
        navigate('/pages/report/branchReport', { state: { branchId: row.id } });
    };
    return (
        <>
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="left">{row.street}</TableCell>
                <TableCell align="right">{row.lane}</TableCell>
                <TableCell align="right">{row.city}</TableCell>
                <TableCell align="right">{row.province}</TableCell>
                {row.isActive === true ? <TableCell align="right">Active</TableCell> : <TableCell align="right">Not Active</TableCell>}

                <TableCell align="right">
                    <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={2}>
                        <Button variant="contained" color="secondary" onClick={handleShowProfile}>
                            Show Branch
                        </Button>
                        <AnimateButton>
                            <IconButton aria-label="edit" color="secondary" onClick={(event) => handleEditClick(event, row)}>
                                <Edit />
                            </IconButton>
                        </AnimateButton>
                    </Stack>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ReadOnlyRow;
