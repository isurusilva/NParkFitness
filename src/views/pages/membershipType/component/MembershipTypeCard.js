import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardContent,
    Grid,
    Link,
    Stack,
    Typography,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

import { IconFileAnalytics, IconCalendarEvent, IconBulb, IconReceipt2 } from '@tabler/icons';
import { loadStripe } from '@stripe/stripe-js';
import HttpCommon from 'utils/http-common';
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
            right: '-150px',
            opacity: 0.5
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
        color: 'white',
        backgroundColor: theme.palette.white,
        marginBottom: -10,
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}));

// ===========================|| PROFILE MENU - UPGRADE PLAN CARD ||=========================== //

const MembershipTypeCard = ({ row, handleEditClick, userType, handleSearch }) => {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleSubmit = () => {
        HttpCommon.delete(`/api/membershipType/${row.id}`)
            .then(() => {
                messages.addMessage({ title: 'Deleted', msg: 'Membership Type deleted Successfully', type: 'success' });
                handleSearch();
            })
            .catch((err) => {
                // messages.addMessage({ title: 'Fail !', msg: err.message, type: 'danger' });
            });
        setDialogOpen(false);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <Card className={classes.card}>
                <CardContent justifyContent="center" alignItems="center">
                    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                            <IconFileAnalytics color="black" />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Membership Type
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row !== null ? row.type : 'NotFound'}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                            <IconCalendarEvent color="black" />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Description
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row !== null ? row.description : 'NotFound'}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <IconBulb color="black" />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Duration
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row !== null ? row.periodInMonths : 'NotFound'}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <IconBulb color="black" />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Status
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row.isActive ? 'Active' : 'Not Active'}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <IconReceipt2 color="black" />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Amount
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row !== null ? row.amount : 'NotFound'}
                            </Typography>
                        </div>
                        {userType === 'Owner' ? (
                            <Grid container direction="row" justifyContent="flex-end" spacing={2}>
                                <Grid item>
                                    <AnimateButton>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            onClick={handleDeleteClick}
                                        >
                                            Delete
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                                <Grid item>
                                    <AnimateButton>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            onClick={(event) => handleEditClick(event, row)}
                                        >
                                            Edit
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        ) : (
                            <></>
                        )}
                    </Grid>
                </CardContent>
            </Card>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '300px'
                        }
                    }
                }}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Are You Sure ?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MembershipTypeCard;
