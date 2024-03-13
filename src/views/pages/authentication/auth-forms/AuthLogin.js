import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from 'assets/images/icons/social-google.svg';
import app from './firebase';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router';
import HttpCommon from 'utils/http-common';
import { Store } from 'react-notifications-component';
import { SET_TOKEN, SET_FONT_FAMILY } from 'store/actions'; // THEME_RTL

import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';
import messages from 'utils/messages';
// ============================|| FIREBASE - LOGIN ||============================ //

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const FirebaseLogin = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const [checked, setChecked] = useState(true);
    const [isDataLoading, setDataLoading] = React.useState(false);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    };

    // forget Password
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function sendRecoveryEmail() {
        const auth = getAuth();

        if (recoveryEmail !== '') {
            sendPasswordResetEmail(auth, recoveryEmail)
                .then(() => {
                    // Password reset email sent!
                    messages.addMessage({ title: 'Success', msg: 'Password recover instructions sent!', type: 'success' });
                    setOpen(false);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    messages.addMessage({ title: 'Error Occured!', msg: errorMessage, type: 'danger' });
                });
        } else {
            messages.addMessage({ title: 'Error Occured!', msg: 'Please enter your email first!', type: 'danger' });
        }
    }

    function navigateDashboard(type, subscriptionStatus) {
        switch (type) {
            case 'Admin':
                navigate('/pages/dashboard/admin');
                break;
            case 'Owner':
                if (subscriptionStatus) {
                    navigate('/pages/dashboard/owner');
                } else {
                    navigate('/pages/subscription');
                }
                break;
            case 'Manager':
                if (subscriptionStatus) {
                    navigate('/pages/dashboard/manager');
                } else {
                    messages.addMessage({
                        title: 'Gym Subscription Expired!',
                        msg: `Your gym subscription expired. Contact your gym owner. `,
                        type: 'danger'
                    });
                }
                break;
            case 'Trainer':
                if (subscriptionStatus) {
                    navigate('/pages/dashboard/trainer');
                } else {
                    messages.addMessage({
                        title: 'Gym Subscription Expired!',
                        msg: `Your gym subscription expired. Contact your gym owner. `,
                        type: 'danger'
                    });
                }
                break;
            default:
                messages.addMessage({ title: 'Error Occured!', msg: `${type} type clients cannot enter this system. `, type: 'danger' });

                break;
        }
    }

    // google login
    const googleProvider = new GoogleAuthProvider();
    const googleHandler = async (event) => {
        setDataLoading(true);
        event.preventDefault();
        let fireUID = '';
        const userInput = {
            email
        };
        const auth = getAuth(app);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log(credential);

                // The signed-in user info.
                const { user } = result;
                console.log(user);
                const token = user.accessToken;

                fireUID = user.uid;
                userInput.fireUID = fireUID;
                userInput.email = user.email;
                console.log(user.uid);
                dispatch({ type: SET_TOKEN, token });

                localStorage.setItem('token', token);
                HttpCommon.post('/auth/validateUserByFireUIDAndEmail', userInput)
                    .then(async (response) => {
                        console.log(response);
                        setDataLoading(false);
                        if (response.data.success) {
                            // localStorage.setItem('type', response.data.data.type);
                            // localStorage.setItem('userID', response.data.data.id);
                            await Promise.all([
                                localStorage.setItem('type', response.data.data.type),
                                localStorage.setItem('userID', response.data.data.id)
                            ]);
                            navigateDashboard(response.data.data.type, response.data.data.subscriptionStatus);
                            // navigate('/pages/dashboard/admin');
                            console.log(token);
                            console.log(response.data.data.type);
                            console.log(response.data.data.id);
                        } else {
                            messages.addMessage({ title: 'Error Occured!', msg: 'Entered User Cannot Find In Server', type: 'danger' });
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        setDataLoading(false);
                    });
            })
            .catch((error) => {
                setDataLoading(false);
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                messages.addMessage({ title: 'Error Occured!', msg: errorMessage, type: 'danger' });
            });
    };
    const onSubmitHandler = (event) => {
        setDataLoading(true);
        event.preventDefault();
        let fireUID = '';
        const userInput = {
            email
        };
        const auth = getAuth(app);
        console.log('email');
        console.log(email);
        console.log('password');
        console.log(password);
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // const user = userCredential.user;
                console.log(userCredential.user);
                fireUID = userCredential.user.uid;
                console.log(userCredential.user.accessToken);
                dispatch({ type: SET_TOKEN, token: userCredential.user.accessToken });
                localStorage.setItem('token', userCredential.user.accessToken);
                userInput.fireUID = fireUID;
                HttpCommon.post('/auth/validateUserByFireUIDAndEmail', userInput)
                    .then(async (response) => {
                        console.log(response);
                        setDataLoading(false);
                        if (response.data.success) {
                            // localStorage.setItem('type', response.data.data.type);
                            // localStorage.setItem('userID', response.data.data.id);
                            await Promise.all([
                                localStorage.setItem('type', response.data.data.type),
                                localStorage.setItem('userID', response.data.data.id)
                            ]);
                            // if (response.data.data.type === 'Manager' || response.data.data.type === 'Trainer') {
                            //     if (response.data.data.branchId === null || response.data.data.branchId === 0) {
                            //         messages.addMessage({
                            //             title: 'Error Occured!',
                            //             msg: `This ${response.data.data.type} type client does not assign to a branch. `,
                            //             type: 'danger'
                            //         });
                            //     } else {
                            //         navigateDashboard(response.data.data.type, response.data.data.subscriptionStatus);
                            //     }
                            // } else {
                            //     navigateDashboard(response.data.data.type, response.data.data.subscriptionStatus);
                            // }
                            navigateDashboard(response.data.data.type, response.data.data.subscriptionStatus);

                            // navigate('/pages/dashboard/admin');
                        } else {
                            messages.addMessage({ title: 'Error Occured!', msg: 'Entered User Cannot Find In Server', type: 'danger' });
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        setDataLoading(false);
                    });
            })
            .catch((error) => {
                setDataLoading(false);
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                messages.addMessage({ title: 'Error Occured!', msg: errorMessage, type: 'danger' });
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== '') {
            dispatch({ type: SET_TOKEN, token });
            setDataLoading(true);

            HttpCommon.post('/api/user/validateUserByJWT')
                .then(async (response) => {
                    console.log(response);
                    setDataLoading(false);
                    if (response.data.success) {
                        localStorage.setItem('type', response.data.data.type);
                        localStorage.setItem('userID', response.data.data.id);
                        navigateDashboard(response.data.data.type, response.data.data.subscriptionStatus);
                        // navigate('/pages/dashboard/admin');
                    } else {
                        localStorage.clear();
                        window.location.reload();
                        messages.addMessage({ title: 'Error Occured!', msg: 'Entered User Cannot Find In Server', type: 'danger' });
                    }
                })
                .catch((err) => {
                    setDataLoading(false);
                    localStorage.clear();
                    window.location.reload();
                    messages.addMessage({ title: 'Error Occured!', msg: 'Entered User Cannot Find In Server', type: 'danger' });
                });
        }
    }, []);

    return (
        <>
            {isDataLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            ) : (
                <>
                    <div>
                        <Grid container direction="column" justifyContent="center" spacing={2}>
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        fullWidth
                                        onClick={googleHandler}
                                        size="large"
                                        variant="outlined"
                                        sx={{
                                            color: 'grey.700',
                                            backgroundColor: theme.palette.grey[50],
                                            borderColor: theme.palette.grey[100]
                                        }}
                                    >
                                        <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                            <img
                                                src={Google}
                                                alt="google"
                                                width={16}
                                                height={16}
                                                style={{ marginRight: matchDownSM ? 8 : 16 }}
                                            />
                                        </Box>
                                        Login in with Google
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex'
                                    }}
                                >
                                    <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                                    <Button
                                        variant="outlined"
                                        sx={{
                                            cursor: 'unset',
                                            m: 2,
                                            py: 0.5,
                                            px: 7,
                                            borderColor: `${theme.palette.grey[100]} !important`,
                                            color: `${theme.palette.grey[900]}!important`,
                                            fontWeight: 500,
                                            borderRadius: `${customization.borderRadius}px`
                                        }}
                                        disableRipple
                                        disabled
                                    >
                                        OR
                                    </Button>

                                    <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                                </Box>
                            </Grid>
                            <Grid item xs={12} container alignItems="center" justifyContent="center">
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle1">Log in with Email address</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <form noValidate onSubmit={onSubmitHandler}>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput, mb: 2 }}>
                                <TextField
                                    id="outlined-adornment-email-login"
                                    type="email"
                                    value={email}
                                    label="Email Address / Username"
                                    onChange={(event) => {
                                        console.log(event.target.value);
                                        setEmail(event.target.value);
                                    }}
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    label="Password"
                                    onChange={(event) => {
                                        console.log(event.target.value);
                                        setPassword(event.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={showPasswordHandler}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Typography
                                    variant="subtitle1"
                                    color="secondary"
                                    sx={{ textDecoration: 'none', cursor: 'pointer' }}
                                    onClick={handleClickOpen}
                                >
                                    Forgot Password?
                                </Typography>
                            </Stack>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle variant="h3">Reset Password</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Enter the email associated with your account and we will send an email with instructions to reset
                                        your password.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        variant="filled"
                                        onChange={(event) => {
                                            setRecoveryEmail(event.target.value);
                                        }}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={sendRecoveryEmail} type="button">
                                        Send Instructions
                                    </Button>
                                    <Button onClick={handleClose}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                            <Box sx={{ mt: 2 }}>
                                <AnimateButton>
                                    <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                                        Log in
                                    </Button>
                                </AnimateButton>
                            </Box>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default FirebaseLogin;
