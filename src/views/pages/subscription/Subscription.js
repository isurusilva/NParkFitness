import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

// material-ui
import { makeStyles, useTheme, withStyles } from '@material-ui/styles';
import { Box, Button, Card, Grid, TextField, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import MuiTypography from '@material-ui/core/Typography';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import MapIcon from '@mui/icons-material/Map';

import { purple, grey } from '@mui/material/colors';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

import SubscriptionCard from './component/SubscriptionCard';
import {
    IconBrandTinder,
    IconToolsKitchen2,
    IconListCheck,
    IconBellRinging,
    IconPhoneCall,
    IconCash,
    IconBuildingCommunity,
    IconBrandCodesandbox,
    IconBuildingArch,
    IconUsers,
    IconReportAnalytics,
    IconReceipt
} from '@tabler/icons';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import HttpCommon from 'utils/http-common';
import { useNavigate } from 'react-router-dom';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// import { Payhere, AccountCategory, Customer, CurrencyType, PayhereCheckout, CheckoutParams } from 'payhere-js-sdk';
import { Store } from 'react-notifications-component';
import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';
import messages from 'utils/messages';
import PriceView from './component/PriceView';

//= ==============================|| SHADOW BOX ||===============================//
let theme;

// Sandbox
// Payhere.init('1217402', AccountCategory.SANDBOX);

// Live
// Payhere.init("12xxxxx",AccountCategory.LIVE)

// Visa card
// Visa : 4916217501611292

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
        backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(210.04deg, ${theme.palette.secondary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
            borderRadius: '50%',
            top: '-30px',
            right: '-140px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(140.9deg, ${theme.palette.secondary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
            borderRadius: '50%',
            top: '-160px',
            right: '-100px'
        }
    },
    primary: {
        color: '#fff'
    },
    secondary: {
        color: theme.palette.primary.light,
        marginTop: '5px'
    },
    content: {
        zIndex: 1,
        padding: '20px !important'
    },
    backColor: theme.palette.secondary[800],
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary[800],
        marginTop: '2px',
        fontSize: '120'
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary[200]
        // zIndex: 1
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '0.9rem',
        fontWeight: 500,
        color: theme.palette.grey
    },
    avatarCircle: {
        cursor: 'pointer',
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark,
        fontSize: '120'
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    },
    button: {
        color: theme.palette.white,
        marginTop: 20,
        backgroundColor: theme.palette.secondary.main,
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}));

const ActivityCard = ({ cardDetails }) => {
    theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();

    console.log(cardDetails);

    function handleReceipt() {
        console.log(cardDetails);
        navigate('/pages/paymentSuccess', {
            state: { receiptData: cardDetails }
        });
    }

    return (
        <MainCard border={false} className={classes.card} contentClass={classes.content} onClick={handleReceipt}>
            <List className={classes.padding}>
                <ListItem alignItems="center" disableGutters className={classes.padding}>
                    <Grid container justifyContent="center" alignItems="center" direction="column" xs={12} sm={6} md={6} lg={6}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <CreditCardIcon sx={{ color: 'white' }} />
                            <div style={{ width: '20px' }} />
                            <MuiTypography style={{ maxWidth: '150px', minWidth: '150px', color: 'white' }} variant="subtitle1">
                                Method
                            </MuiTypography>
                            <MuiTypography style={{ maxWidth: '100px', minWidth: '100px', color: 'white' }} variant="subtitle1">
                                Card
                            </MuiTypography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <EventIcon sx={{ color: 'white' }} />
                            <div style={{ width: '20px' }} />
                            <MuiTypography style={{ maxWidth: '150px', minWidth: '150px', color: 'white' }} variant="subtitle1">
                                Date
                            </MuiTypography>
                            <MuiTypography style={{ maxWidth: '100px', minWidth: '100px', color: 'white' }} variant="subtitle1">
                                {cardDetails.date}
                            </MuiTypography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <LocalAtmIcon sx={{ color: 'white' }} />
                            <div style={{ width: '20px' }} />
                            <MuiTypography style={{ maxWidth: '150px', minWidth: '150px', color: 'white' }} variant="subtitle1">
                                Amount
                            </MuiTypography>
                            <MuiTypography style={{ maxWidth: '100px', minWidth: '100px', color: 'white' }} variant="subtitle1">
                                {cardDetails.amount}
                            </MuiTypography>
                        </div>
                    </Grid>
                </ListItem>
            </List>
        </MainCard>
    );
};

const Subscription = () => {
    const classes = useStyles();
    const [plan, setPlan] = React.useState('');
    const [subscription, setSubscription] = React.useState(null);
    const [subscriptionTypes, setSubscriptionTypes] = React.useState(null);
    const [subscriptionPayments, setSubscriptionPayments] = React.useState(null);
    const [menuItems, setMenuItems] = React.useState([]);
    const [isDataLoading, setDataLoading] = React.useState(true);

    const navigate = useNavigate();
    const ownerName = 'Saman';
    // const userId = 1;

    function getSubscriptionTypes() {
        // let arr = [];
        HttpCommon.get('/api/subscriptionType/').then((response) => {
            console.log(response.data.data);
            setSubscriptionTypes(response.data.data);
            response.data.data.forEach((element) => {
                menuItems.push({ label: element.type, value: element });
            });
        });
    }

    function getSubscription() {
        // let arr = [];
        const userId = localStorage.getItem('userID');

        HttpCommon.get(`/api/subscription/getSubscriptionByUserId/${userId}`).then((response) => {
            console.log(response.data);
            console.log(response.data.data);
            // console.log(response.data.data.isActive);
            setSubscription(response.data.data);
            HttpCommon.get(`/api/subscriptionPayment/getSubscriptionPaymentByUserId/${userId}`).then((response) => {
                console.log(response.data.data);
                console.log(response.data.data.payment);
                setSubscriptionPayments(response.data.data.payment);
                setDataLoading(false);
            });
        });
    }

    function renewPlan() {
        // let arr = [];
        HttpCommon.put(`/api/subscription/RenewSubscription/${subscription.id}`, {
            subscriptionTypeId: plan.id
        })
            .then((response) => {
                console.log(response.data.data);
                getSubscription();
                messages.addMessage({
                    title: 'Subscription Type Changed!',
                    msg: 'Subscription type changed successfully.',
                    type: 'success'
                });
            })
            .catch((error) => {
                // handle error
                console.log(error);
                messages.addMessage({ title: 'Error Occured!', msg: error.message, type: 'danger' });
            });
    }

    useEffect(async () => {
        setDataLoading(true);
        getSubscription();
        getSubscriptionTypes();
    }, []);

    const handleChangePlan = (event, value) => {
        console.log(value);
        if (value !== null) {
            setPlan(value.value);
        }
    };

    return (
        <>
            {isDataLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            ) : (
                <>
                    {subscription !== null ? (
                        <Grid spacing={gridSpacing}>
                            {/* bgcolor: 'secondary.main', */}
                            <SubCard sx={{ color: 'white' }} title="Subscription Detailes">
                                <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                                    <Grid align="center" item xs={12} sm={12} md={12} lg={6}>
                                        <div
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                maxWidth: '400px',
                                                minWidth: '400px'
                                            }}
                                        >
                                            {subscription !== null ? <SubscriptionCard subscriptionData={subscription} /> : <></>}
                                        </div>
                                    </Grid>
                                    {subscription !== null ? (
                                        <Grid
                                            style={{ paddingLeft: '150px' }}
                                            container
                                            justifyContent="center"
                                            alignItems="center"
                                            direction="column"
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={6}
                                        >
                                            <div style={{ height: '20px' }} />
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                                                <IconBuildingCommunity color="black" />
                                                <div style={{ width: '20px' }} />
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    Gym Count Available
                                                </MuiTypography>
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    {subscription.subscriptionType.gymCount}
                                                </MuiTypography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                                                <IconBuildingArch color="black" />
                                                <div style={{ width: '20px' }} />
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    Branch Count Available
                                                </MuiTypography>
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    {subscription.subscriptionType.branchCount}
                                                </MuiTypography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                                                <IconBrandTinder color="black" />
                                                <div style={{ width: '20px' }} />
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    Calorie Calculator
                                                </MuiTypography>
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    {subscription.subscriptionType.isCalAvailable ? 'Available' : 'Not Available'}
                                                </MuiTypography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                                                <IconToolsKitchen2 color="black" />
                                                <div style={{ width: '20px' }} />
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    Diet Plan
                                                </MuiTypography>
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    {subscription.subscriptionType.isDietAvailable ? 'Available' : 'Not Available'}
                                                </MuiTypography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                                                <IconListCheck color="black" />
                                                <div style={{ width: '20px' }} />
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    Plan Description
                                                </MuiTypography>
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    {subscription.subscriptionType.description}
                                                </MuiTypography>
                                            </div>
                                        </Grid>
                                    ) : (
                                        <></>
                                    )}
                                </Grid>
                            </SubCard>
                            <div style={{ height: '20px' }} />
                            <SubCard sx={{ color: 'white' }} title="Renew Subscription">
                                <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                                    <Grid align="center" item xs={12} sm={12} md={12} lg={6}>
                                        <div
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                maxWidth: '400px',
                                                minWidth: '400px'
                                            }}
                                        >
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={menuItems}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} label="Subscription Plan" />}
                                                onChange={handleChangePlan}
                                            />

                                            {plan.amount < 1 || plan.amount == null ? (
                                                <></>
                                            ) : (
                                                <AnimateButton>
                                                    <Button onClick={renewPlan} variant="contained" className={classes.button}>
                                                        Renew Plan
                                                    </Button>
                                                </AnimateButton>
                                            )}
                                        </div>
                                    </Grid>
                                    {plan === null || plan === '' ? (
                                        <></>
                                    ) : (
                                        <Grid
                                            style={{ paddingLeft: '150px' }}
                                            container
                                            justifyContent="center"
                                            alignItems="center"
                                            direction="column"
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={6}
                                        >
                                            <div style={{ height: '20px' }} />
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                                                <IconBuildingCommunity color="black" />
                                                <div style={{ width: '20px' }} />
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    Gym Count Available
                                                </MuiTypography>
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    {plan.gymCount}
                                                </MuiTypography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                                                <IconBuildingArch color="black" />
                                                <div style={{ width: '20px' }} />
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    Branch Count Available
                                                </MuiTypography>
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    {plan.branchCount}
                                                </MuiTypography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                                                <IconBrandTinder color="black" />
                                                <div style={{ width: '20px' }} />
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    Calorie Calculator
                                                </MuiTypography>
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    {plan.isCalAvailable ? 'Available' : 'NotAvailable'}
                                                </MuiTypography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                                                <IconToolsKitchen2 color="black" />
                                                <div style={{ width: '20px' }} />
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    Diet Plan
                                                </MuiTypography>
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    {plan.isDietAvailable ? 'Available' : 'NotAvailable'}
                                                </MuiTypography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                                                <IconCash color="black" />
                                                <div style={{ width: '20px' }} />
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    Amount
                                                </MuiTypography>
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    {plan.amount}
                                                </MuiTypography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                                                <IconListCheck color="black" />
                                                <div style={{ width: '20px' }} />
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    Plan Description
                                                </MuiTypography>
                                                <MuiTypography style={{ maxWidth: '200px', minWidth: '200px' }} variant="subtitle1">
                                                    {plan.description}
                                                </MuiTypography>
                                            </div>
                                        </Grid>
                                    )}
                                </Grid>
                            </SubCard>
                            <div style={{ height: '20px' }} />
                            <SubCard title="Payment Activity">
                                {subscriptionPayments !== null && subscriptionPayments.length > 0 ? (
                                    <Grid container spacing={gridSpacing}>
                                        <>
                                            {subscriptionPayments.map((element) => (
                                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                                    <ActivityCard cardDetails={element} />
                                                </Grid>
                                            ))}
                                        </>
                                    </Grid>
                                ) : (
                                    <></>
                                )}
                                {/* <Grid container spacing={gridSpacing}>
 <Grid item xs={12} sm={6} md={6} lg={4}>
     <ActivityCard />
 </Grid>
 <Grid item xs={12} sm={6} md={6} lg={4}>
     <ActivityCard />
 </Grid>
 <Grid item xs={12} sm={6} md={6} lg={4}>
     <ActivityCard />
 </Grid>
</Grid> */}
                            </SubCard>
                        </Grid>
                    ) : (
                        <PriceView />
                    )}
                </>
            )}
        </>
    );
};

export default Subscription;
