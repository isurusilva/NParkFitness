import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardContent, Grid, Link, Stack, Typography } from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

import { IconFileAnalytics, IconCalendarEvent, IconBulb, IconReceipt2 } from '@tabler/icons';
import { loadStripe } from '@stripe/stripe-js';
import HttpCommon from 'utils/http-common';
import { Store } from 'react-notifications-component';
import messages from 'utils/messages';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        paddingTop: '20px',
        background: '#E9C7FC',
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
            border: '19px solid ',
            borderColor: theme.palette.secondary.dark,
            borderRadius: '50%',
            top: '65px',
            right: '-150px'
        },
        '&:before': {
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

// ===========================|| PROFILE MENU - UPGRADE PLAN CARD ||=========================== //

let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        console.log('process.env.REACT_APP_STRIPE_KEY');
        console.log(process.env);
        console.log(process.env.REACT_APP_STRIPE_KEY);
        stripePromise = loadStripe(
            'pk_test_51L19WVJhj4XbjMCUjUPHPmrjOP1pGg3V0AsCzYmg3K1ujl2Fkilm02pxTyz4aqm8Hg3748CK5PA9VorUgSdJrtYg005Gcku3Rl'
        );
    }

    return stripePromise;
};

const SubscriptionCard = (subscriptionData) => {
    const classes = useStyles();
    let status;
    if (subscriptionData.subscriptionData.isActive) {
        status = 'Active';
    } else {
        status = 'InActive';
    }

    const [stripeError, setStripeError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    // const item = {
    //     price: 'price_1L1SmyJhj4XbjMCUTgAPOMO8',
    //     quantity: 1
    // };

    const redirectToCheckout = async () => {
        setLoading(true);
        console.log('redirectToCheckout');
        const item = {
            price: 'price_1LDpT7Jhj4XbjMCUjmUsvtEy',
            quantity: 1
        };
        switch (subscriptionData.subscriptionData.subscriptionType.type) {
            case 'Gold':
                item.price = 'price_1L1ReTJhj4XbjMCUpgapZYHB';
                break;

            case 'Silver':
                item.price = 'price_1L1SmyJhj4XbjMCUTgAPOMO8';
                break;

            case 'Platinum':
                item.price = 'price_1L9PNEJhj4XbjMCUB9e9Fz0F';
                break;

            case 'Diamond':
                item.price = 'price_1LDpRJJhj4XbjMCUqQP65kha';
                break;

            default:
                break;
        }

        HttpCommon.post('/payhere/createStripeSession', {
            metadata: { userId: subscriptionData.subscriptionData.userId },
            line_items: item,
            success_url: `${window.location.origin}/pages/subscription`,
            cancel_url: `${window.location.origin}/pages/subscription`
        })
            .then(async (res) => {
                console.log('session');
                console.log(res.data.data);
                const stripe = await getStripe();
                const { error } = await stripe.redirectToCheckout({ sessionId: res.data.data.id });
                console.log('Stripe checkout error', error);
                if (error) setStripeError(error.message);
                if (!error) {
                    messages.addMessage({ title: 'Successful!', msg: 'Payment succesfully done.', type: 'success' });
                } else {
                    messages.addMessage({ title: 'Payment Error Occured!', msg: error.message, type: 'danger' });
                }
            })
            .catch((err) => {
                console.log(err);
                messages.addMessage({ title: 'Payment Error Occured!', msg: err.message, type: 'danger' });
            });

        setLoading(false);
    };

    return (
        <Card className={classes.card}>
            <CardContent justifyContent="center" alignItems="center">
                <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                        <IconFileAnalytics color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Subscription
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {subscriptionData !== null ? subscriptionData.subscriptionData.subscriptionType.type : 'NotFound'}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                        <IconCalendarEvent color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Expire Date
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {subscriptionData !== null ? subscriptionData.subscriptionData.expireDate : 'NotFound'}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                        <IconBulb color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Status
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {subscriptionData !== null ? status : 'NotFound'}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                        <IconReceipt2 color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Amount
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {subscriptionData !== null ? subscriptionData.subscriptionData.subscriptionType.amount : 'NotFound'}
                        </Typography>
                    </div>
                    <AnimateButton>
                        <Button type="button" variant="contained" onClick={redirectToCheckout} className={classes.button}>
                            Pay
                        </Button>
                    </AnimateButton>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SubscriptionCard;
