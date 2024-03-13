import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardContent,
    Grid,
    Link,
    Stack,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

import BadgeIcon from '@mui/icons-material/Badge';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

import { IconFileAnalytics, IconCalendarEvent, IconBulb, IconReceipt2, IconFileDescription } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        paddingTop: '20px',
        background: theme.palette.secondary.light,
        marginTop: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        boxShadow: theme.shadows[3],
        position: 'relative',
        '&:hover': {
            boxShadow: theme.shadows[8]
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '3px solid ',
            borderColor: theme.palette.secondary.dark,
            borderRadius: '50%',
            top: '145px',
            right: '-70px',
            opacity: 0.5
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '19px solid ',
            borderColor: theme.palette.secondary.dark,
            borderRadius: '50%',
            top: '65px',
            right: '-150px'
        }
    },
    tagLine: {
        color: theme.palette.grey[900],
        opacity: 0.6
    },
    button: {
        color: theme.palette.white,
        backgroundColor: theme.palette.secondary.main,
        marginBottom: -10,
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const rows = [createData('Frozen yoghurt', 159, 6.0), createData('Ice cream sandwich', 237, 9.0), createData('Eclair', 262, 16.0)];

// ===========================|| PROFILE MENU - UPGRADE PLAN CARD ||=========================== //

const DietPlanCard = (dietPlanData) => {
    const classes = useStyles();
    console.log(dietPlanData);
    console.log(dietPlanData.dietPlanData.dietPlanData.mealType);

    let status;
    if (dietPlanData.dietPlanData.isActive) {
        status = 'Active';
    } else {
        status = 'InsActive';
    }
    return (
        <Card className={classes.card}>
            <CardContent justifyContent="center" alignItems="center">
                <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                        <IconFileAnalytics color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Meal Type :
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {dietPlanData !== null ? dietPlanData.dietPlanData.dietPlanData.mealType : 'NotFound'}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                        <IconFileAnalytics color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Total Calories :
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {dietPlanData !== null ? dietPlanData.dietPlanData.totalCalorie : 'NotFound'}
                        </Typography>
                    </div>
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 400 }} aria-label="customized table">
                                <TableHead sx={{ backgroundColor: '#512da8' }}>
                                    <TableRow>
                                        <StyledTableCell sx={{ color: 'white' }}>Food</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ color: 'white' }}>
                                            Amount (g)
                                        </StyledTableCell>
                                        <StyledTableCell align="center" sx={{ color: 'white' }}>
                                            Calorie
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dietPlanData.dietPlanData.mealItemData.map((row) => (
                                        <StyledTableRow key={row.foodName}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.foodName}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.amount}</StyledTableCell>
                                            <StyledTableCell align="center">{row.calAmount}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default DietPlanCard;
