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

import { Store } from 'react-notifications-component';
import NotificationCard from './component/NotificationCard';

import { getDatabase, ref, onValue } from 'firebase/database';

//= =============================|| SAMPLE PAGE ||==============================//

const Notification = () => {
    // const classes = useStyles();
    const [plan, setPlan] = React.useState('');
    const [notifications, setNotifications] = React.useState();

    function getSubscription() {
        const userId = localStorage.getItem('userID');
        const db = getDatabase();
        const userRef = ref(db, `/users/${userId}/notifications`);
        onValue(userRef, async (snapshot) => {
            const notificationArr = [];
            const data = snapshot.val();
            await snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                childData.key = childKey;
                notificationArr.unshift(childData);
            });

            setNotifications(notificationArr.slice(0, 6));
        });
    }

    useEffect(async () => {
        getSubscription();
    }, []);

    return (
        <MainCard title="Notifications">
            <Grid container alignItems="center" justifyContent="center" padding={3} spacing={gridSpacing}>
                {notifications !== undefined && notifications.length > 0 ? (
                    <Grid container spacing={gridSpacing}>
                        <>
                            {notifications.map((element) => (
                                <Grid align="center" item xs={12} sm={6} md={6} lg={4}>
                                    <NotificationCard notificationData={element} />
                                </Grid>
                            ))}
                        </>
                    </Grid>
                ) : (
                    <></>
                )}
            </Grid>
        </MainCard>
    );
};

export default Notification;
