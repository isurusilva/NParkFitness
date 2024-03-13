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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    card: {
        // backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        width: '755px',
        // border: '5px solid #916BD8',
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

function createData(name, calories, mealData) {
    return {
        name,
        calories,
        history: mealData
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(true);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.calories} cal</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {/* <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography> */}
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            {/* <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell> */}

                                            <StyledTableCell style={{ marginLeft: '50px' }}>Food</StyledTableCell>
                                            <StyledTableCell align="center">Amount (g)</StyledTableCell>
                                            <StyledTableCell align="center">Calorie</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.history.map((historyRow) => (
                                            <StyledTableRow key={historyRow.food}>
                                                <StyledTableCell style={{ marginLeft: '50px' }} component="th" scope="row">
                                                    {historyRow.food}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{historyRow.amount}</StyledTableCell>
                                                <StyledTableCell align="center">{historyRow.calorie}</StyledTableCell>
                                            </StyledTableRow>

                                            // <TableRow key={historyRow.date}>
                                            //     <TableCell component="th" scope="row">
                                            //         {historyRow.date}
                                            //     </TableCell>
                                            //     <TableCell>{historyRow.customerId}</TableCell>
                                            //     <TableCell align="right">{historyRow.amount}</TableCell>
                                            //     <TableCell align="right">{Math.round(historyRow.amount * row.price * 100) / 100}</TableCell>
                                            // </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired
//             })
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired
//     }).isRequired
// };

const DietDetails = ({ size, data }) => {
    theme = useTheme();
    const classes = useStyles();
    console.log(data);
    const memberData = data;
    const [rows, setRows] = React.useState([]);

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(async () => {
        if (data !== null) {
            const newRow = [];
            await Promise.all(
                await data.map(async (element) => {
                    const mealItem = [];
                    await Promise.all(
                        await element.mealItemData.map((mealElement) => {
                            mealItem.push({
                                food: mealElement.foodName,
                                amount: mealElement.amount,
                                calorie: mealElement.calAmount
                            });
                            return 0;
                        }),
                        newRow.push(createData(element.dietPlanData.mealType, element.totalCalorie, mealItem))
                    );
                    return 0;
                })
            );

            setRows(newRow);
        }
    }, []);

    return (
        <>
            <SubCard
                className={classes.card}
                sx={{ color: 'white', maxWidth: 900, minWidth: 100, marginBottom: '10px' }}
                title="Diet Detailes"
            >
                <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                    <Grid align="center" item xs={12}>
                        {/* <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ marginLeft: '50px' }}>Activity</StyledTableCell>
                                        <StyledTableCell align="center">Body Part</StyledTableCell>
                                        <StyledTableCell align="center">Done Percentage&nbsp;(g)</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell style={{ marginLeft: '50px' }} component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.bodyPart}</StyledTableCell>
                                            <StyledTableCell align="center">{row.percentage}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> */}
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Meal</TableCell>
                                        <TableCell align="center">Calories</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <Row key={row.name} row={row} />
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

export default DietDetails;
