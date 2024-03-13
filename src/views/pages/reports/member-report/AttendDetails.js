import React, { useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Card, Button, Paper, Box, Divider, Grid, Stack, Typography, useMediaQuery, CardMedia } from '@material-ui/core';

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
import Chart from 'react-apexcharts';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, MonthView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';

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

const CustomTypography = withStyles({
    root: {
        color: '#7E7676'
    }
})(MuiTypography);

export const appointments = [
    {
        title: 'Attended',
        startDate: new Date(2018, 6, 11),
        endDate: new Date(2018, 6, 12)
    },
    {
        title: 'Attended',
        startDate: new Date(2018, 6, 2),
        endDate: new Date(2018, 6, 3)
    },
    {
        title: 'Attended',
        startDate: new Date(2018, 6, 6),
        endDate: new Date(2018, 6, 7)
    },
    {
        title: 'Attended',
        startDate: new Date(2018, 6, 15),
        endDate: new Date(2018, 6, 16)
    },
    {
        title: 'Attended',
        startDate: new Date(2018, 6, 20),
        endDate: new Date(2018, 6, 21)
    },
    {
        title: 'Attended',
        startDate: new Date(2018, 6, 25),
        endDate: new Date(2018, 6, 26)
    }
];

const currentDate = new Date().toISOString().slice(0, 10);
const AttendDetails = ({ size, data }) => {
    theme = useTheme();
    const classes = useStyles();
    // console.log(data);
    const memberData = data;

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [attendanceArr, setAttendanceArr] = React.useState([]);

    useEffect(async () => {
        if (data !== undefined) {
            const attendance = [];
            data.forEach((element) => {
                const date = new Date(element.date);
                const nextDay = new Date(element.date);
                nextDay.setDate(nextDay.getDate() + 1);

                attendance.push({
                    title: 'Attended',
                    startDate: date.toISOString().slice(0, 10),
                    endDate: nextDay.toISOString().slice(0, 10)
                });
            });
            console.log(attendance);
            setAttendanceArr(attendance);
        }
    }, []);

    return (
        <>
            <SubCard
                className={classes.card}
                sx={{ color: 'white', maxWidth: 900, minWidth: 100, marginBottom: '10px' }}
                title="Attendance Detailes"
            >
                <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                    <Grid align="center" item xs={12}>
                        <Scheduler data={attendanceArr}>
                            <ViewState currentDate={currentDate} />
                            <MonthView />
                            <Appointments />
                        </Scheduler>
                    </Grid>
                </Grid>
            </SubCard>
        </>
    );
};

export default AttendDetails;
