import React from 'react';
import { TableRow, TableCell, IconButton, Button } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit } from '@material-ui/icons';

const ReadOnlyRowScheduleItemManager = ({ row, handleEditClick, getDate, getServiceToView, getService }) => (
    <>
        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row" align="center">
                {row.service.name}
            </TableCell>

            <TableCell align="center">{row.noOfSet}</TableCell>

            <TableCell align="center">{row.noOfRepetition}</TableCell>

            <TableCell align="center">{row.timeBySeconds}</TableCell>
            <TableCell align="center">{row.calAmount}</TableCell>
        </TableRow>
    </>
);

export default ReadOnlyRowScheduleItemManager;
