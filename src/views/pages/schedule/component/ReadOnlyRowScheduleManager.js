import React from 'react';
import { TableRow, TableCell, IconButton, Button } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit } from '@material-ui/icons';

const date = new Date();

// eslint-disable-next-line no-unused-vars
const ReadOnlyRowScheduleManager = ({
    row,
    handleEditClick,
    handleDialog,
    handleDialogAdd,
    setScheduleId,
    getScheduleId,
    scheduleData,
    setExpireDate
}) => {
    const handleItemClick = () => {
        console.log('row.id');
        console.log(row.id);

        setScheduleId(row.id);
        handleDialog();
    };
    const handleAddItemClick = () => {
        console.log('row.id');
        console.log(row.id);

        setScheduleId(row.id);
        handleDialogAdd();
    };
    // const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    const q = new Date();
    const m = q.getMonth() + 1;
    const d = q.getDay();
    const y = q.getFullYear();

    //  const date = new Date(y, m, d);

    const date1 = new Date(row.expireDate.substring(0, 10));
    const date2 = new Date(row.CreatedAt.substring(0, 10));
    const difference = date1 - date2;
    const differenceInDays = difference / (1000 * 60 * 60 * 24);

    return (
        <>
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{row.expireDate.substring(0, 10)}</TableCell>

                {new Date(row.expireDate.substring(0, 10)) > date ? (
                    <TableCell align="center">Not Expired</TableCell>
                ) : (
                    <TableCell align="center">Expired</TableCell>
                )}
                <TableCell align="center">{differenceInDays} days</TableCell>

                <TableCell>
                    <Button disableElevation size="medium" variant="contained" color="secondary" onClick={handleItemClick}>
                        Items
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ReadOnlyRowScheduleManager;
