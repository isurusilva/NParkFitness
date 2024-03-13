import { Box, Button, Grid, Stack, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import HttpCommon from 'utils/http-common';
import messages from 'utils/messages';
import ReviewCard from './component/ReviewCard';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const Reviews = () => {
    const [userReviews, setUserReviews] = useState([]);
    const [userName, setUserName] = useState();
    const [comment, setComment] = useState('');
    const [value, setValue] = useState('');
    const [userType, setUserType] = useState();
    const [postButtonDisable, setPostButtonDisable] = useState(true);

    function getUserData() {
        HttpCommon.get(`/api/user/${localStorage.getItem('userID')}`)
            .then((res) => {
                console.log(res.data.data.firstName.concat(' ', res.data.data.lastName));
                setUserName(res.data.data.firstName.concat(' ', res.data.data.lastName));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getUserReviews() {
        HttpCommon.get(`/api/review/getReviewByUserId/${localStorage.getItem('userID')}`)
            .then((res) => {
                console.log(res.data.data);
                setUserReviews(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getAllReviews() {
        HttpCommon.get('/api/review')
            .then((res) => {
                const tempArr = res.data.data;
                setUserReviews(tempArr.slice(0, 10));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        setUserType(localStorage.getItem('type'));
        if (localStorage.getItem('type') === 'Admin') {
            getAllReviews();
        } else {
            getUserData();
            getUserReviews();
        }
    }, []);

    const postButton = () => {
        if (comment !== '' && value !== '') {
            console.log(comment);
            console.log(value);
            setPostButtonDisable(false);
        }
    };

    const handleComment = (event) => {
        setComment(event.target.value);
        if (event.target.value !== '' && value !== '') {
            setPostButtonDisable(false);
        }
    };

    const handleRating = (event, newValue) => {
        setValue(newValue);
        if (comment !== '' && newValue !== '') {
            setPostButtonDisable(false);
        }
    };

    const handleAddReview = () => {
        HttpCommon.post('/api/review', {
            name: userName,
            comment,
            rating: value,
            userId: localStorage.getItem('userID')
        })
            .then((res) => {
                messages.addMessage({ title: 'Successfully Done!', msg: 'Comment post successfully', type: 'success' });
                getUserReviews();
                setValue('');
                setComment('');
                setPostButtonDisable(true);
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    };

    return (
        <>
            {userType !== 'Admin' ? (
                <MainCard title="Add Reviews">
                    <Stack spacing={2}>
                        <Box>
                            <TextField
                                label="Name"
                                variant="outlined"
                                value={userName}
                                inputProps={{ readOnly: true, maxLength: 255 }}
                                color="secondary"
                            />
                        </Box>
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
                        <Rating name="simple-controlled" value={value} size="large" onChange={handleRating} />
                        <Grid container justifyContent="flex-end">
                            <Button
                                size="large"
                                variant="contained"
                                color="secondary"
                                onClick={handleAddReview}
                                disabled={postButtonDisable}
                            >
                                Post
                            </Button>
                        </Grid>
                    </Stack>
                </MainCard>
            ) : (
                <></>
            )}
            <div style={{ height: 10 }} />
            <MainCard title="Reviews">
                <Grid container>
                    {userReviews !== null ? (
                        userReviews.map((row) => (
                            <Grid item sx={12} md={6} lg={4} spacing={2}>
                                <ReviewCard row={row} getUserReviews={getUserReviews} />
                            </Grid>
                        ))
                    ) : (
                        <></>
                    )}
                </Grid>
                {/* <Stack spacing={2}>
                    {userReviews !== null ? userReviews.map((row) => <ReviewCard row={row} getUserReviews={getUserReviews} />) : <></>}
                </Stack> */}
            </MainCard>
        </>
    );
};

export default Reviews;
