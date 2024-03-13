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
import DescriptionIcon from '@mui/icons-material/Description';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import HeightIcon from '@mui/icons-material/Height';

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

const GoalDetails = ({ size, data }) => {
    theme = useTheme();
    const classes = useStyles();
    console.log(data);
    const memberData = data === null ? {} : data;

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <>
            <SubCard
                className={classes.card}
                sx={{ color: 'white', maxWidth: 900, minWidth: 100, marginBottom: '10px' }}
                title="Goal Detailes"
            >
                <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                    <Grid align="center" item xs={6}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <HeightIcon sx={{ color: '#7E7676' }} />
                            <div style={{ width: '20px' }} />
                            <MuiTypography style={{ maxWidth: '150px', minWidth: '150px' }} variant="subtitle1">
                                Target Height
                            </MuiTypography>
                            <MuiTypography style={{ maxWidth: '100px', minWidth: '100px' }} variant="subtitle1">
                                {memberData.heightTarget === undefined ? 'NotFound' : memberData.heightTarget.toString().concat('cm')}
                            </MuiTypography>
                        </div>
                    </Grid>
                    <Grid align="center" item xs={6}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <MonitorWeightIcon sx={{ color: '#7E7676' }} />
                            <div style={{ width: '20px' }} />
                            <MuiTypography style={{ maxWidth: '150px', minWidth: '150px' }} variant="subtitle1">
                                Target Weight
                            </MuiTypography>
                            <MuiTypography style={{ maxWidth: '100px', minWidth: '100px' }} variant="subtitle1">
                                {memberData.weightTarget === undefined ? 'NotFound' : memberData.weightTarget.toString().concat('kg')}
                            </MuiTypography>
                        </div>
                    </Grid>
                    <Grid container justifyContent="start" alignItems="start" direction="column" xs={12}>
                        <div style={{ height: '20px' }} />
                        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '29px' }}>
                            <DescriptionIcon sx={{ color: '#7E7676' }} />
                            <div style={{ width: '20px' }} />
                            <MuiTypography style={{ maxWidth: '150px', minWidth: '150px', marginLeft: '28px' }} variant="subtitle1">
                                Description
                            </MuiTypography>
                            <MuiTypography variant="subtitle1">
                                {memberData.description === undefined ? 'NotFound' : memberData.description}
                            </MuiTypography>
                        </div>
                    </Grid>
                </Grid>
            </SubCard>
        </>
    );
};

export default GoalDetails;
