import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

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
import CameraAltIcon from '@mui/icons-material/CameraAlt';

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
import {
    Autocomplete,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    CardMedia,
    OutlinedInput,
    InputAdornment,
    IconButton
} from '@mui/material';

import HttpCommon from 'utils/http-common';
import { useNavigate } from 'react-router-dom';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

import { Store } from 'react-notifications-component';
import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

import { getAuth, updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import messages from 'utils/messages';
//= ==============================|| SHADOW BOX ||===============================//
let theme;

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(210.04deg, ${theme.palette.secondary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
            borderRadius: '50%',
            top: '-30px',
            right: '-140px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(140.9deg, ${theme.palette.secondary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
            borderRadius: '50%',
            top: '-160px',
            right: '-100px'
        }
    },
    primary: {
        color: '#fff'
    },
    secondary: {
        color: theme.palette.primary.light,
        marginTop: '5px'
    },
    content: {
        zIndex: 1,
        padding: '20px !important'
    },
    backColor: theme.palette.secondary[800],
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary[800],
        marginTop: '2px',
        fontSize: '120'
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary[200]
        // zIndex: 1
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '0.9rem',
        fontWeight: 500,
        color: theme.palette.grey
    },
    avatarCircle: {
        cursor: 'pointer',
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark,
        fontSize: '120'
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    },
    button: {
        color: theme.palette.white,
        marginTop: 20,
        backgroundColor: theme.palette.secondary.main,
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}));

//= ===========================|| UTILITIES SHADOW ||============================//

// const CustomTypography = withStyles({
//     root: {
//         color: 'black'
//     }
// })(MuiTypography);

const ShadowBox = ({ image, name }) => {
    theme = useTheme();

    return (
        <Card sx={{ height: 160, width: 160, mb: 3, boxShadow: 0 }}>
            {image !== null ? (
                // <CardMedia component="img" image={image} alt="green iguana" />
                <Avatar sx={{ width: 160, height: 160 }} aria-haspopup="true" color="inherit">
                    <Avatar src={image} sx={{ width: 150, height: 150 }} aria-haspopup="true" color="inherit" />
                </Avatar>
            ) : (
                <Avatar sx={{ width: 150, height: 150 }} aria-haspopup="true" color="inherit">
                    <MuiTypography style={{ fontSize: '50px', color: theme.palette.grey[800] }} right variant="subtitle1">
                        {name}
                    </MuiTypography>
                </Avatar>
            )}
        </Card>
    );
};

const Transition = React.forwardRef((props, ref) => {
    console.log('');
    return <Slide direction="up" ref={ref} {...props} />;
});

const Account = () => {
    const classes = useStyles();
    theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);

    const inputFile = useRef(null);
    const [file, setFile] = React.useState('');

    const [isDataLoading, setDataLoading] = React.useState(true);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        birthDay: '',
        contactNo: '',
        email: '',
        gender: '',
        height: '',
        image: '',
        street: '',
        lane: '',
        city: '',
        province: '',
        type: ''
    });

    const navigate = useNavigate();
    const ownerName = 'Saman';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClickOpen3 = () => {
        setOpen3(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpen2(false);
        setOpen3(false);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const getFile = () => {
        inputFile.current.click();
    };

    const gotoSignIn = () => {
        localStorage.clear();
        navigate('/');
    };

    function getUserDetails(userId) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            // const displayName = user.displayName;
            // const email = user.email;
            console.log(user.email);
            HttpCommon.get(`/api/user/${userId}`).then((response) => {
                console.log(response.data.data);
                setValues({
                    firstName: response.data.data.firstName,
                    lastName: response.data.data.lastName,
                    birthDay: response.data.data.birthDay,
                    contactNo: response.data.data.contactNo,
                    gender: response.data.data.gender,
                    email: user.email,
                    height: response.data.data.height,
                    image: response.data.data.image,
                    street: response.data.data.street,
                    lane: response.data.data.lane,
                    city: response.data.data.city,
                    province: response.data.data.province,
                    type: response.data.data.type
                });
                setDataLoading(false);
            });

            // const photoURL = user.photoURL;
            // const emailVerified = user.emailVerified;
        } else {
            navigate('/', { replace: true });
        }
    }

    function changeFirebaseEmail() {
        const userId = localStorage.getItem('userID');
        const auth = getAuth();
        const user = auth.currentUser;
        if (values.email !== undefined && values.email !== '') {
            updateEmail(auth.currentUser, values.email)
                .then(() => {
                    // Email updated!
                    setOpen2(false);
                    HttpCommon.put(`/api/user/${userId}`, {
                        email: values.email
                    }).then((response) => {
                        console.log(response.data.data);
                        messages.addMessage({ title: 'Email Changed!', msg: 'User Account Email Changed', type: 'success' });

                        if (response.data.success) {
                            messages.addMessage({ title: 'Saved!', msg: 'Profile Details Saved Successfully', type: 'success' });
                        }
                        setDataLoading(true);
                        const key = localStorage.getItem('userID');
                        getUserDetails(key);
                    });
                })
                .catch((error) => {
                    // An error occurred
                    setOpen2(false);
                    console.log(error);
                    console.log(error.message);
                    console.log(error.code);
                    messages.addMessage({ title: 'Email Changed Failed!', msg: error.message, type: 'danger' });

                    if (error.code === 'auth/requires-recent-login') {
                        setOpen3(true);
                    }
                });
        } else {
            messages.addMessage({ title: 'Error!', msg: 'Enter all required fields', type: 'danger' });
        }
    }

    function saveProfileDetails() {
        const userId = localStorage.getItem('userID');
        // let arr = [];
        // if (values.email !== undefined && values.email !== '') {
        //     changeFirebaseEmail();
        // }
        if (values.contactNo.toString().length !== 10) {
            messages.addMessage({ title: 'Error!', msg: 'Contact number should be only 10 numbers', type: 'danger' });
        } else if (
            values.firstName !== undefined &&
            values.firstName !== '' &&
            values.lastName !== undefined &&
            values.lastName !== '' &&
            values.birthDay !== undefined &&
            values.birthDay !== '' &&
            values.gender !== undefined &&
            values.gender !== '' &&
            values.type !== undefined &&
            values.type !== '' &&
            values.email !== undefined &&
            values.email !== '' &&
            values.contactNo !== undefined &&
            values.contactNo !== '' &&
            values.street !== undefined &&
            values.street !== '' &&
            values.city !== undefined &&
            values.city !== '' &&
            values.province !== undefined &&
            values.province !== ''
        ) {
            HttpCommon.put(`/api/user/${userId}`, {
                firstName: values.firstName,
                lastName: values.lastName,
                birthDay: values.birthDay,
                email: values.email,
                contactNo: values.contactNo,
                gender: values.gender,
                type: values.type,
                street: values.street,
                lane: values.lane,
                city: values.city,
                province: values.province
            }).then((response) => {
                console.log(response.data.data);
                if (response.data.success) {
                    messages.addMessage({ title: 'Saved!', msg: 'Profile Details Saved Successfully', type: 'success' });
                }
                setDataLoading(true);
                const key = localStorage.getItem('userID');
                getUserDetails(key);
            });
        } else {
            messages.addMessage({ title: 'Error!', msg: 'Enter all required fields', type: 'danger' });
        }
    }

    function uploadProfileImage(file) {
        // let arr = [];
        const key = localStorage.getItem('userID');
        const formData = new FormData();
        formData.append('image', file);
        formData.append('userId', key);
        HttpCommon.post(`/api/user/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data.data);
            if (response.data.success) {
                messages.addMessage({ title: 'Uploaded!', msg: 'Profile Image Uploaded', type: 'success' });
            }
            setDataLoading(true);

            getUserDetails(key);
        });
    }

    const changeFirebasePassword = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        const cred = EmailAuthProvider.credential(user.email, currentPassword);

        reauthenticateWithCredential(user, cred)
            .then(() => {
                // User re-authenticated.
                if (currentPassword === password) {
                    messages.addMessage({ title: 'Password Changed Failed!', msg: 'Enter new password', type: 'danger' });
                } else if (password === confirmPassword) {
                    updatePassword(user, password)
                        .then(() => {
                            // Update successful.
                            messages.addMessage({ title: 'Password Changed!', msg: 'User Account Password Changed', type: 'success' });

                            setOpen(false);
                        })
                        .catch((error) => {
                            // An error ocurred
                            messages.addMessage({ title: 'Password Changed Failed!', msg: error.message, type: 'danger' });

                            setOpen(false);
                        });
                } else {
                    messages.addMessage({ title: 'Error Occured!', msg: 'Confirm password does not match', type: 'danger' });
                }
            })
            .catch((error) => {
                messages.addMessage({ title: 'Password Changed Failed!', msg: error.message, type: 'danger' });
            });

        // const auth = getAuth();

        // const user = auth.currentUser;
        // const newPassword = password;

        // console.log(user.password);
    };

    const onChangeFile = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
        uploadProfileImage(event.target.files[0]);
    };

    const handleChangePassword = (event) => {
        console.log(event.target.value);
        setPassword(event.target.value);
        const temp = strengthIndicator(event.target.value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const handleChangeConfirmPassword = (event) => {
        console.log(event.target.value);
        setConfirmPassword(event.target.value);
    };

    const handleChangeCurrentPassword = (event) => {
        console.log(event.target.value);
        setCurrentPassword(event.target.value);
    };

    const showNewPasswordHandler = () => {
        setShowNewPassword(!showNewPassword);
    };

    const showCurrentPasswordHandler = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    };

    useEffect(async () => {
        setDataLoading(true);
        const key = localStorage.getItem('userID');
        getUserDetails(key);
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
                <Grid spacing={gridSpacing}>
                    {/* bgcolor: 'secondary.main', */}
                    <SubCard sx={{ color: 'white' }} title="Personal Detailes">
                        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                            <Grid item alignItems="center" justifyContent="center" sm={12} xs={12} md={12} lg={12}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <ShadowBox name={values.firstName.charAt(0) + values.lastName.charAt(0)} image={values.image} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {/* <Button variant="contained" color="secondary" startIcon={<CameraAltIcon />}>
                                        Edit Image
                                    </Button> */}
                                    {/* <Uploady>
                                        <MyComponent />
                                    </Uploady> */}
                                    <input type="file" id="file" ref={inputFile} style={{ display: 'none' }} onChange={onChangeFile} />
                                    <Button variant="contained" color="secondary" startIcon={<CameraAltIcon />} onClick={() => getFile()}>
                                        Edit Image
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={6}>
                                <TextField
                                    fullWidth
                                    id="outlined-name"
                                    label="First Name"
                                    value={values.firstName}
                                    onChange={handleChange('firstName')}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={6}>
                                <TextField
                                    fullWidth
                                    id="outlined-name"
                                    label="Last Name"
                                    value={values.lastName}
                                    onChange={handleChange('lastName')}
                                />
                            </Grid>

                            <Grid item sm={12} xs={12} md={6} lg={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.gender.toLowerCase()}
                                        label="Gender"
                                        onChange={handleChange('gender')}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={12} xs={12} md={6} lg={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Birth Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={values.birthDay}
                                        sx={{ width: 600 }}
                                        onChange={(newValue) => {
                                            setValues({ ...values, birthDay: newValue.toISOString().substring(0, 10) });
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                    <div style={{ height: '20px' }} />
                    <SubCard sx={{ color: 'white' }} title="Account Detailes">
                        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                            <div style={{ height: '20px' }} />
                            <Grid item sm={12} xs={12} md={6} lg={6}>
                                <TextField contentEditable={false} fullWidth id="outlined-name" label="Type" value={values.type} />
                            </Grid>
                            <Grid item sm={12} xs={12} md={6} lg={3}>
                                <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                                    Change Password
                                </Button>
                            </Grid>
                            <Grid item sm={12} xs={12} md={6} lg={3}>
                                <Button variant="contained" color="secondary" onClick={handleClickOpen2}>
                                    Change Email
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                    <div style={{ height: '20px' }} />

                    <SubCard sx={{ color: 'white' }} title="Contact Detailes">
                        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                            <Grid item sm={12} xs={12} md={12} lg={6}>
                                <TextField
                                    fullWidth
                                    id="outlined-name"
                                    type="number"
                                    label="ContactNo"
                                    value={values.contactNo}
                                    onChange={handleChange('contactNo')}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={6}>
                                <TextField fullWidth contentEditable={false} id="outlined-name" label="Email" value={values.email} />
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={6}>
                                <TextField
                                    fullWidth
                                    id="outlined-name"
                                    label="Street"
                                    value={values.street}
                                    onChange={handleChange('street')}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={6}>
                                <TextField fullWidth id="outlined-name" label="Lane" value={values.lane} onChange={handleChange('lane')} />
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={6}>
                                <TextField fullWidth id="outlined-name" label="City" value={values.city} onChange={handleChange('city')} />
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={6}>
                                <TextField
                                    fullWidth
                                    id="outlined-name"
                                    label="Province"
                                    value={values.province}
                                    onChange={handleChange('province')}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                    <div style={{ height: '20px' }} />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="contained" color="secondary" onClick={saveProfileDetails}>
                            Save Changes
                        </Button>
                    </div>

                    <div style={{ height: '20px' }} />
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>Enter New Password</DialogTitle>
                        <DialogContent>
                            <FormControl fullWidth sx={{ ...theme.typography.passwordInput, mb: 0, mt: 1 }}>
                                <InputLabel>Current Password</InputLabel>
                                <OutlinedInput
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={handleChangeCurrentPassword}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={showCurrentPasswordHandler}
                                                edge="end"
                                                size="large"
                                            >
                                                {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ ...theme.typography.passwordInput, mb: 1, mt: 1 }}>
                                <InputLabel>New Password</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handleChangePassword}
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

                            {strength !== 0 && (
                                <FormControl fullWidth>
                                    <Box sx={{ mb: 2 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Box
                                                    style={{ backgroundColor: level?.color }}
                                                    sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" fontSize="0.75rem">
                                                    {level?.label}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </FormControl>
                            )}
                            <FormControl fullWidth sx={{ ...theme.typography.passwordInput, mb: 1 }}>
                                <InputLabel>Confirm New Password</InputLabel>
                                <OutlinedInput
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={handleChangeConfirmPassword}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={showNewPasswordHandler}
                                                edge="end"
                                                size="large"
                                            >
                                                {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={changeFirebasePassword}>
                                Change Password
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={open2}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>Change Email</DialogTitle>
                        <DialogContent>
                            {/* <FormControl fullWidth sx={{ ...theme.typography.passwordInput, mb: 1, mt: 1 }}>
                                <InputLabel>Current Password</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    value={currentPassword}
                                    onChange={handleChangeCurrentPassword}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={showNewPasswordHandler}
                                                edge="end"
                                                size="large"
                                            >
                                                {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl> */}

                            <FormControl fullWidth sx={{ ...theme.typography.passwordInput, mb: 1, width: '400px' }}>
                                <InputLabel>New Email</InputLabel>
                                <OutlinedInput fullWidth type="text" value={values.email} onChange={handleChange('email')} />
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={changeFirebaseEmail}>
                                Change Email
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={open3}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>User Reauthentication</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                To do this activity user must sign in again.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={gotoSignIn}>
                                Go to SignIn
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            )}
        </>
    );
};

export default Account;
