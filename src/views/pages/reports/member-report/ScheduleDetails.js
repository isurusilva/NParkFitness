import React, { useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Card, Button, Box, Divider, Grid, Stack, Typography, useMediaQuery, CardMedia } from '@material-ui/core';

// project imports
import AuthWrapper1 from '../../authentication/AuthWrapper1';
import AuthCardWrapper from '../../authentication/AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import SubCard from 'ui-component/cards/SubCard';
import { makeStyles, withStyles } from '@material-ui/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ReactToPrint from 'react-to-print';
import MuiTypography from '@material-ui/core/Typography';

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import HttpCommon from 'utils/http-common';
import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';

import { gridSpacing } from 'store/constant';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles((theme) => ({
    card: {
        // backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        width: '755px',
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
    },
    mainCard: {
        // backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        width: '800px',
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '1500px',
            height: '610px',
            background: `linear-gradient(275.9deg, ${theme.palette.secondary[800]} -50.02%, rgba(145, 107, 216, 0) 180.58%)`,
            borderRadius: '250%',
            top: '-500px',
            right: '-350px'
        }
    },
    button: {
        color: theme.palette.white,
        alignItems: 'right',
        marginTop: 20,
        backgroundColor: theme.palette.secondary.main,
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}));

let theme;

const CustomTypography = withStyles({
    root: {
        color: '#7E7676'
    }
})(MuiTypography);

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

function createData(name, repetitions, sets, time, percentage) {
    return { name, repetitions, sets, time, percentage };
}

// const rows = [
//     createData('Tread Mill', 'Full Body', '60%'),
//     createData('Bench Press', 'Abs', '33%'),
//     createData('Squats', 'Legs', '70%'),
//     createData('Bicep Curl', 'Arm', '40%'),
//     createData('Front Press', 'Back', '20%')
// ];

const ScheduleDetails = ({ size, data }) => {
    theme = useTheme();
    const classes = useStyles();
    console.log(data);
    const memberData = data;
    const [rows, setRows] = React.useState([]);

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(async () => {
        console.log(Array.isArray(data));
        if (data !== null && Array.isArray(data)) {
            const newRow = [];
            data.forEach((element) => {
                newRow.push(createData(element.service.name, element.noOfRepetition, element.noOfSet, element.timeBySeconds, '0%'));
            });
            setRows(newRow);
        } else if (data !== null && !Array.isArray(data)) {
            const newRow = [];
            data.attendItem.forEach(async (element) => {
                newRow.push(
                    createData(
                        element.scheduleItem.service.name,
                        element.scheduleItem.noOfRepetition,
                        element.scheduleItem.noOfSet,
                        element.scheduleItem.timeBySeconds,
                        element.totalDonePercentage.toString().concat('%')
                    )
                );
            });
            setRows(newRow);
        }
    }, []);
    return (
        <>
            <SubCard
                className={classes.card}
                sx={{ color: 'white', maxWidth: 900, minWidth: 100, marginBottom: '10px' }}
                title="Schedule Detailes"
            >
                <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                    <Grid align="center" item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ marginLeft: '50px' }}>Activity</StyledTableCell>
                                        <StyledTableCell align="center">Repetitions</StyledTableCell>
                                        <StyledTableCell align="center">Set</StyledTableCell>
                                        <StyledTableCell align="center">Time (Seconds)</StyledTableCell>
                                        <StyledTableCell align="center">Done Percentage&nbsp;(g)</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell style={{ marginLeft: '50px' }} component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.repetitions}</StyledTableCell>
                                            <StyledTableCell align="center">{row.sets}</StyledTableCell>
                                            <StyledTableCell align="center">{row.time}</StyledTableCell>
                                            <StyledTableCell align="center">{row.percentage}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </SubCard>
        </>
    );
};

export default ScheduleDetails;
