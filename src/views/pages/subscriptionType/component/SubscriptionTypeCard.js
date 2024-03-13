import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { IconFileAnalytics, IconBulb, IconReceipt2, IconFileDescription, IconBulbOff } from '@tabler/icons';
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

const SubscriptionTypeCard = ({ row, handleEditClick, getSubscriptionTypes }) => {
    const classes = useStyles();

    let status;
    if (row.isActive) {
        status = 'Active';
    } else {
        status = 'InsActive';
    }

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleSubmit = () => {
        HttpCommon.delete(`/api/subscriptionType/${row.id}`)
            .then(() => {
                messages.addMessage({ title: 'Deleted', msg: 'Subscription Type deleted Successfully', type: 'success' });
                getSubscriptionTypes();
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
                                Subscription Type :
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row !== null ? row.type : 'NotFound'}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                            <IconBulbOff color="black" />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Gym Count :
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row !== null ? row.gymCount : 'NotFound'}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                            <IconBulbOff color="black" />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Branch Count :
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row !== null ? row.branchCount : 'NotFound'}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <IconBulb color="black" />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Status :
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row.isActive ? 'Active' : 'Not Active'}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                            <IconReceipt2 color="black" />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Amount :
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row !== null ? row.amount : 'NotFound'}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                            <IconBulbOff color="black" />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Calorie Cal :
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row.isCalAvailable ? 'Available' : 'Not Available'}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                            <IconBulbOff color="black" />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Diet Plan :
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row.isDietAvailable ? 'Available' : 'Not Available'}
                            </Typography>
                        </div>
                        <div style={{ height: 10 }} />
                        <Grid container direction="row" justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <AnimateButton>
                                    <Button size="medium" variant="contained" color="secondary" onClick={handleDeleteClick}>
                                        Delete
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        color="secondary"
                                        onClick={(event) => handleEditClick(event, row)}
                                    >
                                        Edit
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
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

export default SubscriptionTypeCard;
