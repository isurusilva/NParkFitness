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
    mainCard: {
        // backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        width: '800px',
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

const CustomTypography = withStyles({
    root: {
        color: '#7E7676'
    }
})(MuiTypography);
const ShadowBox = ({ image, name }) => {
    theme = useTheme();

    return (
        <Card sx={{ height: 150, width: 150, mb: 3, boxShadow: 0 }}>
            <Box
                sx={{
                    height: 150,
                    width: 150,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 3,
                    bgcolor: theme.palette.primary.light,
                    color: theme.palette.grey[800]
                }}
            >
                {image !== null ? (
                    <CardMedia component="img" image={image} alt="green iguana" />
                ) : (
                    <MuiTypography style={{ fontSize: '40px' }} right variant="subtitle1">
                        {name}
                    </MuiTypography>
                )}
            </Box>
        </Card>
    );
};

const MemberDetails = ({ size, data }) => {
    theme = useTheme();
    const classes = useStyles();
    console.log(data);
    const memberData = data;

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <>
            <SubCard
                className={classes.card}
                sx={{ color: 'white', maxWidth: 900, minWidth: 100, marginBottom: '10px' }}
                title="Member Detailes"
            >
                <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                    <Grid align="center" item xs={4}>
                        <ShadowBox
                            name={memberData.member.user.firstName.charAt(0) + memberData.member.user.lastName.charAt(0)}
                            image={memberData.member.user.image}
                        />
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center" direction="column" xs={8}>
                        <div style={{ height: '20px' }} />
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <CreditCardIcon sx={{ color: '#7E7676' }} />
                            <div style={{ width: '20px' }} />
                            <CustomTypography style={{ maxWidth: '150px', minWidth: '150px' }} variant="subtitle1">
                                Membership ID
                            </CustomTypography>
                            <CustomTypography style={{ maxWidth: '100px', minWidth: '100px' }} variant="subtitle1">
                                {memberData.member.id}
                            </CustomTypography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <EventIcon sx={{ color: '#7E7676' }} />
                            <div style={{ width: '20px' }} />
                            <CustomTypography style={{ maxWidth: '150px', minWidth: '150px' }} variant="subtitle1">
                                Expire Date
                            </CustomTypography>
                            <CustomTypography style={{ maxWidth: '100px', minWidth: '100px' }} variant="subtitle1">
                                {memberData.member.expireDate.slice(0, 10)}
                            </CustomTypography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <BadgeIcon sx={{ color: '#7E7676' }} />
                            <div style={{ width: '20px' }} />
                            <CustomTypography style={{ maxWidth: '150px', minWidth: '150px' }} variant="subtitle1">
                                First Name
                            </CustomTypography>
                            <CustomTypography style={{ maxWidth: '100px', minWidth: '100px' }} variant="subtitle1">
                                {memberData.member.user.firstName}
                            </CustomTypography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <BadgeIcon sx={{ color: '#7E7676' }} />
                            <div style={{ width: '20px' }} />
                            <CustomTypography style={{ maxWidth: '150px', minWidth: '150px' }} variant="subtitle1">
                                Last Name
                            </CustomTypography>
                            <CustomTypography style={{ maxWidth: '100px', minWidth: '100px' }} variant="subtitle1">
                                {memberData.member.user.lastName}
                            </CustomTypography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <LocationOnIcon sx={{ color: '#7E7676' }} />
                            <div style={{ width: '20px' }} />
                            <CustomTypography style={{ maxWidth: '150px', minWidth: '150px' }} variant="subtitle1">
                                Street
                            </CustomTypography>
                            <CustomTypography style={{ maxWidth: '100px', minWidth: '100px' }} variant="subtitle1">
                                {memberData.member.user.street}
                            </CustomTypography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <LocationOnIcon sx={{ color: '#7E7676' }} />
                            <div style={{ width: '20px' }} />
                            <CustomTypography style={{ maxWidth: '150px', minWidth: '150px' }} variant="subtitle1">
                                Lane
                            </CustomTypography>
                            <CustomTypography style={{ maxWidth: '100px', minWidth: '100px' }} variant="subtitle1">
                                {memberData.member.user.lane}
                            </CustomTypography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <FlagIcon sx={{ color: '#7E7676' }} />
                            <div style={{ width: '20px' }} />
                            <CustomTypography style={{ maxWidth: '150px', minWidth: '150px' }} variant="subtitle1">
                                City
                            </CustomTypography>
                            <CustomTypography style={{ maxWidth: '100px', minWidth: '100px' }} variant="subtitle1">
                                {memberData.member.user.city}
                            </CustomTypography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <MapIcon sx={{ color: '#7E7676' }} />
                            <div style={{ width: '20px' }} />
                            <CustomTypography style={{ maxWidth: '150px', minWidth: '150px' }} variant="subtitle1">
                                Province
                            </CustomTypography>
                            <CustomTypography style={{ maxWidth: '100px', minWidth: '100px' }} variant="subtitle1">
                                {memberData.member.user.province}
                            </CustomTypography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <EmailIcon sx={{ color: '#7E7676' }} />
                            <div style={{ width: '20px' }} />
                            <CustomTypography style={{ maxWidth: '150px', minWidth: '150px' }} variant="subtitle1">
                                email
                            </CustomTypography>
                            <CustomTypography style={{ maxWidth: '100px', minWidth: '100px' }} variant="subtitle1">
                                {memberData.member.user.email}
                            </CustomTypography>
                        </div>
                    </Grid>
                </Grid>
            </SubCard>
        </>
    );
};

export default MemberDetails;
