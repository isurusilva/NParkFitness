import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField
} from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { IconFileAnalytics, IconBulb, IconReceipt2, IconFileDescription, IconBulbOff } from '@tabler/icons';
import HttpCommon from 'utils/http-common';
import messages from 'utils/messages';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import GradeIcon from '@mui/icons-material/Grade';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        paddingTop: '20px',
        background: '#E9C7FC',
        marginTop: '5px',
        marginBottom: '5px',
        marginLeft: '20px',
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

const ReviewCard = ({ row, getUserReviews }) => {
    const classes = useStyles();
    // let status;
    // if (row.isActive) {
    //     status = 'Active';
    // } else {
    //     status = 'InsActive';
    // }
    console.log(row);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [comment, setComment] = useState();
    const [ratingValue, setRatingValue] = useState();

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleEditClick = () => {
        setComment(row.comment);
        setRatingValue(row.rating);
        setEditDialogOpen(true);
    };

    const handleComment = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        HttpCommon.delete(`/api/review/${row.id}`)
            .then(() => {
                messages.addMessage({ title: 'Deleted', msg: 'Review deleted Successfully', type: 'success' });
                getUserReviews();
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
        setDialogOpen(false);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setEditDialogOpen(false);
    };

    const handleEditSubmit = () => {
        HttpCommon.put(`/api/review/${row.id}`, {
            comment,
            rating: ratingValue
        })
            .then(() => {
                messages.addMessage({ title: 'Success', msg: 'Review Edited Successfully', type: 'success' });
                getUserReviews();
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
        setEditDialogOpen(false);
    };

    return (
        <>
            <Card className={classes.card}>
                <CardContent justifyContent="center" alignItems="left">
                    <Grid container justifyContent="center" alignItems="center" direction="column">
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                            <PersonIcon sx={{ color: 'black' }} />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="h4" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Name :
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row !== null ? row.name : 'NotFound'}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                            <CommentIcon sx={{ color: 'black' }} />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="h4" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Comment :
                            </Typography>
                            <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                                {row !== null ? row.comment : 'NotFound'}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                            <GradeIcon sx={{ color: 'black' }} />
                            <div style={{ width: '20px' }} />
                            <Typography align="left" variant="h4" style={{ maxWidth: '150px', minWidth: '150px' }}>
                                Rating :
                            </Typography>
                            <Rating sx={{ color: 'secondary.main' }} name="size-large" value={row.rating} size="medium" readOnly />
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
                            {localStorage.getItem('type') !== 'Admin' ? (
                                <Grid item>
                                    <AnimateButton>
                                        <Button size="medium" variant="contained" color="secondary" onClick={handleEditClick}>
                                            Edit
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            ) : (
                                <></>
                            )}
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
            <Dialog
                open={editDialogOpen}
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
                    <Stack spacing={2}>
                        <Grid>
                            <TextField
                                value={row.name}
                                label="Name"
                                variant="outlined"
                                inputProps={{ readOnly: true, maxLength: 255 }}
                                color="secondary"
                            />
                        </Grid>
                        <TextField
                            id="comment"
                            label="Comment"
                            variant="outlined"
                            value={comment}
                            onChange={handleComment}
                            fullWidth
                            multiline
                            rows={6}
                            color="secondary"
                            inputProps={{ maxLength: 255 }}
                        />
                        <Typography component="legend">Your Rating : </Typography>
                        <Rating
                            name="simple-controlled"
                            value={ratingValue}
                            size="large"
                            onChange={(event, newValue) => {
                                setRatingValue(newValue);
                            }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEditSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ReviewCard;
