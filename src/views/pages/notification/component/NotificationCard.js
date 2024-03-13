import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardContent,
    Grid,
    Box,
    Link,
    Stack,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Chip,
    CardMedia
} from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import StorefrontTwoToneIcon from '@material-ui/icons/StorefrontTwoTone';
import BadgeIcon from '@mui/icons-material/Badge';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

import { IconFileAnalytics, IconCalendarEvent, IconBulb, IconReceipt2 } from '@tabler/icons';
import { useTheme } from '@emotion/react';
import { getDatabase, ref, onValue, update } from 'firebase/database';

let theme;

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(210.04deg, ${theme.palette.secondary.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
            borderRadius: '50%',
            top: '-30px',
            right: '-120px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(140.9deg, ${theme.palette.secondary.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
            borderRadius: '50%',
            top: '-160px',
            right: '-60px'
        }
    },
    content: {
        padding: '16px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.dark
    },
    secondary: {
        color: theme.palette.grey[500]
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    },
    listChipError: {
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        height: '24px',
        padding: '0 6px',
        marginRight: '5px'
    },
    listChipWarning: {
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.secondary.light,
        height: '24px',
        padding: '0 6px'
    },
    listChipSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: '24px',
        padding: '0 6px'
    },
    listChipDefault: {
        color: theme.palette.grey[500],
        backgroundColor: theme.palette.grey[200],
        height: '24px',
        padding: '0 6px'
    }
}));

const ShadowBox = () => {
    theme = useTheme();
    const number = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    switch (number) {
        case 1:
            return <IconFileAnalytics stroke={1.5} size="1.3rem" />;

        case 2:
            return <IconCalendarEvent stroke={1.5} size="1.3rem" />;

        case 3:
            return <IconBulb stroke={1.5} size="1.3rem" />;

        case 4:
            return <IconReceipt2 stroke={1.5} size="1.3rem" />;

        case 5:
            return <StorefrontTwoToneIcon stroke={1.5} size="1.3rem" />;

        default:
            return (
                <CardMedia component="img" image="https://npark-fitness-bucket-2.s3.us-east-2.amazonaws.com/dp.jpg" alt="green iguana" />
            );
        // code block
    }
};

// ===========================|| PROFILE MENU - UPGRADE PLAN CARD ||=========================== //

const NotificationCard = (notificationData) => {
    const classes = useStyles();
    const db = getDatabase();
    let time = '';
    // console.log(notificationData);
    // console.log(subscriptionData.subscriptionData.id);
    // let status;
    // if (subscriptionData.subscriptionData.isActive) {
    //     status = 'Active';
    // } else {
    //     status = 'InsActive';
    // }
    if (notificationData.notificationData !== undefined) {
        const d = new Date(notificationData.notificationData.date);
        console.log(d.toString());
        console.log(d.toLocaleTimeString());
        time = d.toLocaleTimeString();
        notificationData.notificationData.date = d.toString().substring(0, 15);
    }

    const handleClickNew = () => {
        const userId = localStorage.getItem('userID');
        console.info('You clicked the New Chip.');
        const updates = {};
        updates[`/users/${userId}/notifications/${notificationData.notificationData.key}/isNew`] = false;

        return update(ref(db), updates);
    };

    const handleClickRead = () => {
        const userId = localStorage.getItem('userID');
        console.info('You clicked the Read Chip.');
        const updates = {};
        updates[`/users/${userId}/notifications/${notificationData.notificationData.key}/isRead`] = true;

        return update(ref(db), updates);
    };

    return (
        <MainCard className={classes.card} contentClass={classes.content}>
            <List className={classes.padding}>
                <ListItem alignItems="center" disableGutters className={classes.padding}>
                    <ListItemAvatar>
                        <Avatar variant="rounded" className={classes.avatar}>
                            <ShadowBox />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        sx={{
                            mt: 0.45,
                            mb: 0.45
                        }}
                        className={classes.padding}
                        primary={
                            <>
                                <Typography variant="h4">{notificationData.notificationData.title}</Typography>
                                <Typography variant="h5" sx={{ pb: 1 }}>
                                    {notificationData.notificationData.body}
                                </Typography>
                            </>
                        }
                        // secondary={<Typography variant="h4">4 Managers</Typography>}
                        secondary={
                            <>
                                <Typography variant="subtitle2" className={classes.secondary}>
                                    {notificationData.notificationData.date}
                                </Typography>
                                <Typography variant="subtitle2" className={classes.secondary}>
                                    {time}
                                </Typography>
                            </>
                        }
                    />
                </ListItem>
                <Stack pl={7} direction="row" spacing={1}>
                    {notificationData.notificationData.isNew ? (
                        <Chip size="small" label="New" className={classes.listChipWarning} onClick={handleClickNew} />
                    ) : (
                        <></>
                    )}

                    {notificationData.notificationData.isRead ? (
                        <Chip size="small" label="read" className={classes.listChipDefault} />
                    ) : (
                        <Chip size="small" label="Unread" className={classes.listChipError} onClick={handleClickRead} />
                    )}
                </Stack>
            </List>
        </MainCard>
    );
};

export default NotificationCard;
