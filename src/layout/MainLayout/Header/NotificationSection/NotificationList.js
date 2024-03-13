import React, { useEffect } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@material-ui/core';

// assets
import {
    IconBrandTelegram,
    IconBuildingStore,
    IconMailbox,
    IconPhoto,
    IconFileAnalytics,
    IconCalendarEvent,
    IconBulb,
    IconReceipt2
} from '@tabler/icons';
import StorefrontTwoToneIcon from '@material-ui/icons/StorefrontTwoTone';

import User1 from 'assets/images/users/user-round.svg';

// style constant
const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '330px',
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '300px'
        }
    },
    listAction: {
        top: '22px'
    },
    actionColor: {
        color: theme.palette.grey[500]
    },

    listItem: {
        padding: 0
    },
    sendIcon: {
        marginLeft: '8px',
        marginTop: '-3px'
    },
    listDivider: {
        marginTop: 0,
        marginBottom: 0
    },
    listChipError: {
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        height: '24px',
        padding: '0 6px',
        marginRight: '5px'
    },
    listChipWarning: {
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light,
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
    },
    listAvatarSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        border: 'none',
        borderColor: theme.palette.success.main
    },
    listAvatarPrimary: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
        border: 'none',
        borderColor: theme.palette.primary.main
    },
    listAvatarSecondary: {
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.secondary.light,
        border: 'none',
        borderColor: theme.palette.secondary.main
    },
    listAvatarWarning: {
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light,
        border: 'none',
        borderColor: theme.palette.warning.main
    },
    listAvatarError: {
        color: theme.palette.error.dark,
        backgroundColor: theme.palette.error.light,
        border: 'none',
        borderColor: theme.palette.error.main
    },
    listContainer: {
        paddingLeft: '56px'
    },
    uploadCard: {
        backgroundColor: theme.palette.secondary.light
    },
    paddingBottom: {
        paddingBottom: '16px'
    },
    itemAction: {
        cursor: 'pointer',
        padding: '16px',
        '&:hover': {
            background: theme.palette.primary.light
        }
    }
}));

const ShadowBox = () => {
    const classes = useStyles();
    const number = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    switch (number) {
        case 1:
            return (
                <Avatar className={classes.listAvatarPrimary}>
                    <IconFileAnalytics stroke={1.5} size="1.3rem" />
                </Avatar>
            );

        case 2:
            return (
                <Avatar className={classes.listAvatarSecondary}>
                    <IconCalendarEvent stroke={1.5} size="1.3rem" />
                </Avatar>
            );

        case 3:
            return (
                <Avatar className={classes.listAvatarWarning}>
                    <IconBulb stroke={1.5} size="1.3rem" />
                </Avatar>
            );

        case 4:
            return (
                <Avatar className={classes.listAvatarPrimary}>
                    <IconReceipt2 stroke={1.5} size="1.3rem" />
                </Avatar>
            );

        case 5:
            return (
                <Avatar className={classes.listAvatarSuccess}>
                    <StorefrontTwoToneIcon stroke={1.5} size="1.3rem" />
                </Avatar>
            );

        default:
            return (
                <Avatar className={classes.listAvatarSuccess}>
                    <StorefrontTwoToneIcon stroke={1.5} size="1.3rem" />
                </Avatar>
            );
    }
};

// ===========================|| NOTIFICATION LIST ITEM ||=========================== //

const NotificationList = (notificationData) => {
    const classes = useStyles();
    // console.log(notificationData);

    return (
        <List className={classes.navContainer}>
            {notificationData.notificationData !== undefined && notificationData.notificationData.length > 0 ? (
                <>
                    {notificationData.notificationData.map((element) => (
                        <>
                            <div className={classes.itemAction}>
                                <ListItem alignItems="center" className={classes.listItem}>
                                    <ListItemAvatar>
                                        <Avatar className={classes.listAvatarSuccess}>
                                            <ShadowBox />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={<Typography variant="subtitle1">{element.title}</Typography>} />
                                    <ListItemSecondaryAction className={classes.listAction}>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item xs={12}>
                                                <Typography variant="caption" display="block" gutterBottom className={classes.actionColor}>
                                                    2 min ago
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Grid container direction="column" className={classes.listContainer}>
                                    <Grid item xs={12} className={classes.paddingBottom}>
                                        <Typography variant="subtitle2">{element.body}</Typography>
                                    </Grid>
                                    <Stack direction="row" spacing={1}>
                                        {element.isRead ? (
                                            <Chip size="small" label="read" className={classes.listChipDefault} />
                                        ) : (
                                            <Chip size="small" label="Unread" className={classes.listChipError} />
                                        )}
                                        {element.isNew ? <Chip size="small" label="New" className={classes.listChipWarning} /> : <></>}
                                    </Stack>
                                </Grid>
                            </div>
                            <Divider className={classes.listDivider} />
                        </>
                    ))}
                </>
            ) : (
                <>
                    <div className={classes.itemAction}>
                        <ListItem alignItems="center" className={classes.listItem}>
                            <ListItemAvatar>
                                <Avatar className={classes.listAvatarError}>
                                    <IconBuildingStore stroke={1.5} size="1.3rem" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1">No Notification Available</Typography>} />
                        </ListItem>
                        <Grid container direction="column" className={classes.listContainer}>
                            <Grid item xs={12} className={classes.paddingBottom}>
                                <Typography variant="subtitle2">Currently you do not have any notifications.</Typography>
                            </Grid>
                        </Grid>
                    </div>
                </>
            )}
        </List>
    );
};

export default NotificationList;
