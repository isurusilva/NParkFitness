import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, IconButton, Button, Stack } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit, Delete } from '@material-ui/icons';

const date = new Date();

const ReadOnlyRowScheduleItem = ({
    row,
    handleEditClickScheduleItem,
    setServiceId,
    getServiceToView,
    getServiceId,
    isExpired,
    getService,
    handleDeleteClickScheduleItem
}) => {
    console.log(row);
    return (
        <>
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                    {row.service.name}
                </TableCell>

                <TableCell align="center">{row.noOfSet}</TableCell>

                <TableCell align="center">{row.noOfRepetition}</TableCell>

                <TableCell align="center">{row.timeBySeconds}</TableCell>
                <TableCell align="center">{row.calAmount}</TableCell>

                <TableCell align="right">
                    <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={2}>
                        {new Date(row.schedule.expireDate.substring(0, 10)) > date ? (
                            <>
                                <AnimateButton>
                                    <IconButton
                                        aria-label="edit"
                                        color="secondary"
                                        onClick={(event) => handleEditClickScheduleItem(event, row)}
                                    >
                                        <Edit />
                                    </IconButton>
                                </AnimateButton>
                                <AnimateButton>
                                    <IconButton
                                        aria-label="edit"
                                        color="secondary"
                                        onClick={(event) => handleDeleteClickScheduleItem(event, row)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </AnimateButton>
                            </>
                        ) : (
                            <></>
                        )}
                    </Stack>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ReadOnlyRowScheduleItem;
