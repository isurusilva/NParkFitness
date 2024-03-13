import React, { useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Card, Button, Box, Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper1 from '../authentication/AuthWrapper1';
import AuthCardWrapper from '../authentication/AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import SubCard from 'ui-component/cards/SubCard';
import { makeStyles } from '@material-ui/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ReactToPrint from 'react-to-print';

// assets

const useStyles = makeStyles((theme) => ({
    card: {
        // backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        height: '1000px',
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

const Receipt = ({ size, data }) => {
    const theme = useTheme();
    const classes = useStyles();
    console.log(data);

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <SubCard className={classes.card} sx={{ color: 'white' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                        <Grid item>
                            <Stack alignItems="center" justifyContent="center">
                                {/* <div
                                    style={{
                                        color: 'black',
                                        backgroundColor: 'black',
                                        height: '40px',
                                        width: '100px',
                                        borderRadius: '10px',
                                        WebkitClipPath: 'polygon(0% 0%, 45% 0, 75% 100%, 0% 100%)',
                                        clipPath: 'polygon(0% 0%, 45% 0, 120% 100%, 0% 100%)'
                                    }}
                                /> */}
                                <Typography
                                    color={theme.palette.secondary.main}
                                    style={{ textShadow: '0px 0px 5px #D0B7FF' }}
                                    gutterBottom
                                    variant={matchDownSM ? 'h3' : 'h3'}
                                >
                                    Receipt from The NParkFitness Platform
                                </Typography>
                                <Typography variant="caption" fontSize="14px" textAlign={matchDownSM ? 'center' : ''}>
                                    Invoice #1234
                                </Typography>
                                <Typography variant="caption" fontSize="14px" textAlign={matchDownSM ? 'center' : ''}>
                                    Receipt #56487
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="button" color="#666262" fontSize="15px" textAlign={matchDownSM ? 'center' : 'center'}>
                        &nbsp;
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="button" color="#666262" fontSize="15px" textAlign={matchDownSM ? 'center' : 'center'}>
                        &nbsp;
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <Stack alignItems="left" justifyContent="center">
                        <Typography variant="button" color="#666262" fontSize="15px">
                            Billing To
                        </Typography>
                        <Typography variant="body1" color="black" fontSize="14px">
                            {data.subscription.user.firstName} {data.subscription.user.lastName} ,
                        </Typography>
                        <Typography variant="body1" color="black" fontSize="14px">
                            {data.subscription.user.street} ,
                        </Typography>
                        <Typography variant="body1" color="black" fontSize="14px">
                            {data.subscription.user.lane} ,
                        </Typography>
                        <Typography variant="body1" color="black" fontSize="14px">
                            {data.subscription.user.city} ,
                        </Typography>
                        <Typography variant="body1" color="black" fontSize="14px">
                            {data.subscription.user.province} .
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack alignItems="left" justifyContent="center">
                        <Typography variant="button" color="#666262" fontSize="15px" textAlign={matchDownSM ? 'center' : ''}>
                            Amount Paid
                        </Typography>
                        <Typography variant="body1" color="black" fontSize="14px" textAlign={matchDownSM ? 'center' : ''}>
                            Rs {data.amount}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack alignItems="left" justifyContent="center">
                        <Typography variant="button" color="#666262" fontSize="15px" textAlign={matchDownSM ? 'center' : ''}>
                            Date Paid
                        </Typography>
                        <Typography variant="body1" color="black" fontSize="14px" textAlign={matchDownSM ? 'center' : ''}>
                            {data.date}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack alignItems="left" justifyContent="center">
                        <Typography variant="button" color="#666262" fontSize="15px" textAlign={matchDownSM ? 'center' : ''}>
                            Payment Method
                        </Typography>
                        <Typography variant="body1" color="black" fontSize="14px" textAlign={matchDownSM ? 'center' : ''}>
                            Visa Card
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={9}>
                    <div>
                        <Typography variant="button" color="#666262" fontSize="15px" textAlign={matchDownSM ? 'center' : ''}>
                            Summary
                        </Typography>
                        <Card sx={{ boxShadow: 0 }}>
                            <Box
                                sx={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    py: 3,
                                    pl: 3,
                                    borderLeft: '5px solid #916BD8',
                                    bgcolor: theme.palette.grey[200],
                                    color: theme.palette.grey[800]
                                }}
                            >
                                <Typography style={{ fontSize: '15px' }} variant="button">
                                    May 25, 2021 - Jun 25, 2021
                                </Typography>
                                <div style={{ height: '10px' }} />
                                <Typography style={{ fontSize: '15px' }} variant="h3">
                                    Subscription Details
                                </Typography>
                                <Grid container direction="row" alignItems="center" pt={3} pr={3} pl={3}>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h4">
                                            Subscription Plan
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h6">
                                            {data.subscription.subscriptionType.type}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h4">
                                            Gym Count Available
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h6">
                                            {data.subscription.subscriptionType.gymCount}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h4">
                                            Branch Count Available
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h6">
                                            {data.subscription.subscriptionType.branchCount}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h4">
                                            Calorie Calculator
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h6">
                                            {data.subscription.subscriptionType.isCalAvailable ? 'Available' : 'Not Available'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h4">
                                            Diet Plan
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h6">
                                            {data.subscription.subscriptionType.isDietAvailable ? 'Available' : 'Not Available'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h4">
                                            Plan Description
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h6">
                                            {data.subscription.subscriptionType.description}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h4">
                                            Amount
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h6">
                                            Rs {data.subscription.subscriptionType.amount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} pr={3} pb={3}>
                                    <Divider />
                                </Grid>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h4">
                                            Amount Paid
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={size} sm={6} md={6} pb={2}>
                                        <Typography style={{ fontSize: '15px' }} variant="h6">
                                            Rs {data.amount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <div style={{ height: '100px' }} />
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Grid container direction="row" alignItems="center" justifyContent="center" xs={12}>
                        <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                            If you have any questions, contact NParkFitenss by&nbsp;
                        </Typography>
                        <Typography color="primary" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                            nParkSolution@gmail.com
                        </Typography>
                        <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                            &nbsp;or call at&nbsp;
                        </Typography>
                        <Typography color="primary" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                            +94752369841
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </SubCard>
    );
};

//= ===============================|| Payment Success Page ||================================//

const PaymentSuccess = ({ receiptData }) => {
    const theme = useTheme();
    const classes = useStyles();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const componentRef = useRef();
    const { state } = useLocation();

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid container xs={12} sm={12} md={8} lg={6} style={{ maxWidth: 900, minWidth: 100 }}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 2, sm: 6 }, mb: 0 }}>
                            <Receipt size={12} data={state.receiptData} />
                            <div style={{ textAlign: 'right' }}>
                                <ReactToPrint
                                    documentTitle="NParkFitness Invoice"
                                    trigger={() => (
                                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                                            <AnimateButton>
                                                <Button variant="contained" className={classes.button}>
                                                    Print Receipt
                                                </Button>
                                            </AnimateButton>
                                        </div>
                                    )}
                                    content={() => componentRef.current}
                                />
                                <div style={{ display: 'none' }}>
                                    <ComponentToPrint ref={componentRef} receiptData={state.receiptData} />
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
    );
};

export class ComponentToPrint extends React.PureComponent {
    render() {
        // const classes = this.props;
        const { receiptData } = this.props;
        console.log(receiptData); // result: 'some_value'
        // console.log(this.props.centerPayData); // result: 'some_value'
        // console.log(this.props); // result: 'some_value'
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} sm={12} md={12}>
                        <Card>
                            <div style={{ padding: '20px' }}>
                                <Receipt size={6} data={receiptData} />
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default PaymentSuccess;
