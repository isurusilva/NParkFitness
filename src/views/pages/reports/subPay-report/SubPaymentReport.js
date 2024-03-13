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
import EventIcon from '@mui/icons-material/Event';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import MapIcon from '@mui/icons-material/Map';
import SquareCard from '../trainer-report/SquareCard';
import SmallCard from '../trainer-report/SmallCard';
import TotalGrowthBarChart from 'views/dashboard/dashboard-component/TotalGrowthBarChart';
import AttendanceChart from '../branch-report/AttendanceChart';
import PopularCard from 'views/dashboard/dashboard-component/PopularCard';
import SubTypeCard from 'views/dashboard/dashboard-component/SubTypeCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// assets

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const useStyles = makeStyles((theme) => ({
    card: {
        // backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        width: '755px',
        // border: '5px solid #916BD8',
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
        // borderRadius: '0px!important'
        // '&:after': {
        //     content: '""',
        //     zIndex: 1,
        //     position: 'absolute',
        //     width: '1200px',
        //     height: '1500px',
        //     background: `linear-gradient(210.04deg, ${theme.palette.secondary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        //     // borderRadius: '50%',
        //     top: '-300px',
        //     right: '-250px'
        // },
        // '&:before': {
        //     content: '""',
        //     position: 'absolute',
        //     width: '1500px',
        //     height: '610px',
        //     background: `linear-gradient(275.9deg, ${theme.palette.secondary[800]} -50.02%, rgba(145, 107, 216, 0) 180.58%)`,
        //     borderRadius: '250%',
        //     top: '-500px',
        //     right: '-350px'
        // }
    },
    page: {
        width: '21cm',
        minHeight: '29.7cm',
        padding: '2cm',
        margin: '1cm auto',
        border: '1px #D3D3D3 solid',
        borderRadius: '5px',
        background: 'white',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
    },
    mainCard: {
        // backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        // width: '800px',
        width: '21cm',
        // height: '29.7cm',
        // padding: '2cm',
        margin: '0.5cm auto',
        // border: '5px solid #916BD8',
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
        // borderRadius: '0px!important'
        // '&:after': {
        //     content: '""',
        //     zIndex: 1,
        //     position: 'absolute',
        //     width: '1200px',
        //     height: '1500px',
        //     background: `linear-gradient(210.04deg, ${theme.palette.secondary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        //     // borderRadius: '50%',
        //     top: '-300px',
        //     right: '-250px'
        // },
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

const Report = ({ paymentData }) => {
    theme = useTheme();
    const classes = useStyles();
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <>
            <SubCard
                className={classes.mainCard}
                sx={{
                    color: 'white',
                    maxWidth: 900,
                    minWidth: 100,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography
                    color={theme.palette.secondary.main}
                    style={{
                        textShadow: '0px 0px 5px #D0B7FF',
                        textAlign: 'center',
                        marginTop: '20px',
                        marginBottom: '0px'
                    }}
                    gutterBottom
                    variant="h3"
                >
                    Subscription Payment Report
                </Typography>
                <Typography
                    color={theme.palette.secondary.main}
                    style={{
                        textShadow: '0px 0px 5px #D0B7FF',
                        textAlign: 'center',
                        marginTop: '3px',
                        marginBottom: '0px'
                    }}
                    gutterBottom
                    fontSize="16px"
                    variant="h3"
                >
                    Card Payment
                </Typography>
                <Typography variant="h5" fontSize="14px" textAlign="center" marginBottom="40px">
                    {lastDayOfMonth.toISOString().slice(0, 7)}-01 to {lastDayOfMonth.toISOString().slice(0, 10)}
                </Typography>
                <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                    <Grid align="center" item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ marginLeft: '50px' }}>Owner ID</StyledTableCell>
                                        <StyledTableCell align="center">First Name</StyledTableCell>
                                        <StyledTableCell align="center">Last Name</StyledTableCell>
                                        <StyledTableCell align="center">Amount</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paymentData.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell style={{ marginLeft: '50px' }} component="th" scope="row">
                                                {row.userId}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.firstName}</StyledTableCell>
                                            <StyledTableCell align="center">{row.lastName}</StyledTableCell>
                                            <StyledTableCell align="center">{row.totAmount.toFixed(2)}</StyledTableCell>
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

//= ===============================|| Payment Success Page ||================================//

const SubPaymentReport = () => {
    const theme = useTheme();
    const classes = useStyles();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const componentRef = useRef(null);
    const [paymentData, setPaymentData] = React.useState();
    const [isDataLoading, setDataLoading] = React.useState(true);
    const [display, setDisplay] = React.useState('none');
    const { state } = useLocation();
    // const type = state !== null ? state.type : 'gym';
    // const gymId = state !== null ? state.gymId : 1;
    // const branchId = state !== null ? state.branchId : 1;
    // const trainerId = 4;
    // const userId = 1;
    // const gymId = 1;
    // const branchId = 1;

    function getAdminDashboard() {
        // let arr = [];
        HttpCommon.get(`/api/payment/getAllPaymentGroupByOwner/1`).then(async (response) => {
            console.log(response.data.data);
            setPaymentData(response.data.data);
            setDataLoading(false);
        });
    }

    const handleDisplay = () => {
        setTimeout(() => {
            setDisplay('block');
            setDisplay('none');
            console.log('Done');
        }, 2000);
    };

    useEffect(async () => {
        setDataLoading(true);
        getAdminDashboard();
    }, []);

    return (
        <>
            {isDataLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '800px',
                        width: '100%'
                    }}
                >
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            ) : (
                <>
                    <AuthWrapper1>
                        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
                            <Grid container xs={12} sm={12} md={8} lg={8} style={{ maxWidth: 900, minWidth: 100 }}>
                                <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                                    <Grid item sx={{ m: { xs: 2, sm: 6 }, mb: 0 }}>
                                        {/* <SubCard
                                        className={classes.mainCard}
                                        sx={{
                                            color: 'white',
                                            maxWidth: 900,
                                            minWidth: 100,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    > */}
                                        <Report paymentData={paymentData} />
                                        {/* </SubCard> */}
                                        <div style={{ textAlign: 'right' }}>
                                            <ReactToPrint
                                                documentTitle="Branch Report"
                                                trigger={() => (
                                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                                                        <AnimateButton>
                                                            <Button variant="contained" className={classes.button}>
                                                                Print Report
                                                            </Button>
                                                        </AnimateButton>
                                                    </div>
                                                )}
                                                content={() => componentRef.current}
                                            />
                                            <div style={{ visibility: 'hidden' }}>
                                                <Typography variant="h5" fontSize="14px" textAlign="center" marginBottom="40px">
                                                    Print Preview
                                                </Typography>
                                                <ComponentToPrint ref={componentRef} paymentData={paymentData} classes={classes} />
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                                <AuthFooter />
                            </Grid>
                        </Grid>
                    </AuthWrapper1>
                </>
            )}
        </>
    );
};

export class ComponentToPrint extends React.PureComponent {
    render() {
        // const classes = this.props;
        const { paymentData, classes } = this.props;
        // console.log(this.props.centerPayData); // result: 'some_value'
        // console.log(this.props); // result: 'some_value'
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} sm={12} md={12}>
                        {/* <SubCard
                            className={classes.mainCard}
                            sx={{
                                color: 'white',
                                maxWidth: 900,
                                minWidth: 100,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        > */}
                        <div>
                            <Report paymentData={paymentData} />
                        </div>
                        {/* </SubCard> */}
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default SubPaymentReport;
