import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Stack,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    InputLabel,
    Select,
    MenuItem,
    Stepper,
    Step,
    StepLabel,
    Grid
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { Search } from '@material-ui/icons';
import MainCard from 'ui-component/cards/MainCard';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box } from '@material-ui/system';
import { Autocomplete } from '@mui/material';
import HttpCommon from 'utils/http-common';
import ReadOnlyRow from './component/ReadOnlyMemberManagementRow';

// Stepper
import FirstStep from './component/FirstStep';
import SecondStep from './component/SecondStep';
import ThirdStep from './component/ThirdStep';

// Firebase Authentication
import app from '../authentication/auth-forms/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from 'react-router';
import messages from 'utils/messages';

const gymArray = [];
const adminArray = [];
const ownerArray = [];
const managerArray = [];
const trainerArray = [];
const steps = ['Sign Up', 'Personal Info', 'Contact Details'];

function ManageEmployee() {
    const [userType, setUserType] = React.useState();
    const [branchId, setBranchId] = React.useState();
    const [nullBranchStaff, setNullBranchStaff] = React.useState(false);

    const [radioValue, setRadioValue] = React.useState();

    const [employeeData, setEmployeeData] = React.useState([]);
    const [openAddNewMemberDialog, setOpenAddNewMemberDialog] = React.useState(false);
    const [openViewEditMemberDialog, setViewEditMemberDialog] = React.useState(false);

    const [branchArray, setBranchArray] = React.useState([]);
    const [editedMemberBranchArray, seteditedMemberBranchArray] = React.useState([]);
    const [editEmployeeId, setEditEmployeeId] = React.useState();
    const [isEdit, setIsEdit] = React.useState(false);

    // Form Data
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [birthday, setBirthday] = React.useState(null);
    const [genderValue, setGenderValue] = React.useState('');
    const [contactNo, setContactNo] = React.useState('');
    const [employeeType, setEmployeeType] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [lane, setLane] = React.useState('');
    const [city, setCity] = React.useState('');
    const [province, setProvince] = React.useState('');

    const [addNewStaffButton, setAddNewStaffButton] = React.useState(true);
    const [uId, setUID] = React.useState('');

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [showTable, setShowTable] = React.useState(true);
    const navigate = useNavigate();

    // Regex email validation
    const validEmail = new RegExp('^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$'); // eslint-disable-line
    const validContactNo = new RegExp(
        '^(?:0|94|\\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$'
    ); // eslint-disable-line

    function showDataToAdmin() {
        const allMembers = [...adminArray, ...ownerArray, ...managerArray, ...trainerArray];
        setEmployeeData(allMembers);
        setBranchId(null);
        setRadioValue('Admin');
        setAddNewStaffButton(false);
        setShowTable(false);
    }

    function getGym() {
        const link = '/api/gym/getAllGymByUserId/';
        const key = localStorage.getItem('userID');
        const url = link + key;
        HttpCommon.get(url)
            .then((res) => {
                res.data.data.map((row) => gymArray.push({ label: row.name, value: row.id }));
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    }

    function getAllMembers() {
        const tempAdArr = [];
        const tempOwArr = [];
        const url = '/api/user/';
        HttpCommon.get(url)
            .then(async (res) => {
                await Promise.all(
                    res.data.data.map((element) => {
                        if (element.type === 'Admin') {
                            adminArray.push(element);
                            tempAdArr.push(element);
                        } else if (element.type === 'Owner') {
                            ownerArray.push(element);
                            tempOwArr.push(element);
                        } else if (element.type === 'Manager') {
                            managerArray.push(element);
                        } else if (element.type === 'Trainer') {
                            trainerArray.push(element);
                        }
                        return 0;
                    })
                );
                showDataToAdmin();
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    }

    function showDataToManager() {
        setRadioValue('Trainer');
        HttpCommon.get(`/api/user/${localStorage.getItem('userID')}`)
            .then((res) => {
                if (res.data.data !== null) {
                    setBranchId(res.data.data.branchId);
                    HttpCommon.get(`/api/user/findUserByBranchId/${res.data.data.branchId}`)
                        .then((res) => {
                            const tempArr = [];
                            res.data.data.forEach((element) => {
                                if (element.type === 'Trainer') {
                                    tempArr.push(element);
                                }
                            });

                            setEmployeeData(tempArr);
                            setAddNewStaffButton(false);
                            setShowTable(false);
                        })
                        .catch((err) => {
                            messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
                        });
                }
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    }

    function unauthorizedlogin() {
        localStorage.clear();
        navigate('/', { replace: true });
    }

    function checkSubscription() {
        HttpCommon.get(`/api/subscription/getSubscriptionByUserId/${localStorage.getItem('userID')}`).then((res) => {
            HttpCommon.get(`/api/subscription/${res.data.data.id}`).then((res) => {
                if (res.data.data !== null && res.data.data.isActive) {
                    gymArray.length = 0;
                    getGym();
                } else {
                    navigate('/pages/subscription', { replace: true });
                }
            });
        });
    }

    useEffect(() => {
        setUserType(localStorage.getItem('type'));
        if (localStorage.getItem('type') === 'Admin') {
            getAllMembers();
        } else if (localStorage.getItem('type') === 'Owner') {
            checkSubscription();
        } else if (localStorage.getItem('type') === 'Manager') {
            showDataToManager();
        } else if (localStorage.getItem('type') === 'Trainer') {
            unauthorizedlogin();
        }
    }, []);

    const handleGymSelect = (event, newValue) => {
        setNullBranchStaff(false);
        if (newValue !== null) {
            HttpCommon.get(`/api/branch/getBranchByGymId/${newValue.value}`)
                .then((res) => {
                    const tempArr = [];
                    res.data.data.forEach((element) => {
                        tempArr.push({ label: element.name, value: element.id });
                    });
                    setBranchArray(tempArr);
                })
                .catch((err) => {
                    messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
                });
        }
    };
    const handleAddNullBranchEmployee = (event, newValue) => {
        if (newValue !== null) {
            HttpCommon.get(`/api/branch/getBranchByGymId/${newValue.value}`)
                .then((res) => {
                    const tempArr = [];
                    res.data.data.forEach((element) => {
                        tempArr.push({ label: element.name, value: element.id });
                    });
                    seteditedMemberBranchArray(tempArr);
                    // setNullBranchStaff(false);
                })
                .catch((err) => {
                    messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
                });
        }
    };

    const handleBranchSelect = (event, newValue) => {
        if (newValue !== null) {
            setBranchId(newValue.value);
        }
    };

    const handleRadioButton = (event) => {
        setRadioValue(event.target.value);
    };

    const handleSearch = () => {
        if (branchArray.length === 0) {
            setNullBranchStaff(true);
            HttpCommon.post('/api/user/findNullBranchStaff')
                .then((res) => {
                    console.log(res.data.data.length);
                    if (res.data.data.length !== 0) {
                        setEmployeeData(res.data.data);
                        setAddNewStaffButton(false);
                        setShowTable(false);
                    } else {
                        messages.addMessage({ title: 'No Data', msg: 'There are no employees with out branch', type: 'danger' });
                    }
                })
                .catch((err) => {
                    messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
                });
        } else {
            HttpCommon.get(`/api/user/findUserByBranchId/${branchId}`)
                .then((res) => {
                    const tempArr = [];
                    res.data.data.forEach((element) => {
                        if (element.type === radioValue) {
                            tempArr.push(element);
                        }
                    });
                    setEmployeeData(tempArr);

                    setAddNewStaffButton(false);
                    setShowTable(false);
                })
                .catch((err) => {
                    messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
                });
        }
    };

    const handleAddNewMemberSubmit = () => {
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUID(userCredential.user.uid);
                HttpCommon.post('/api/user/', {
                    firstName,
                    lastName,
                    password: confirmPassword,
                    birthDay: birthday,
                    email,
                    contactNo,
                    gender: genderValue,
                    type: radioValue,
                    street,
                    lane,
                    city,
                    province,
                    fireUID: userCredential.user.uid,
                    branchId
                })
                    .then((res) => {
                        if (userType === 'Admin') {
                            showDataToAdmin();
                        } else if (userType === 'Owner') {
                            handleSearch();
                        } else {
                            showDataToManager();
                        }

                        messages.addMessage({ title: 'Successfully Added!', msg: 'New member added to the data base.', type: 'success' });

                        setOpenAddNewMemberDialog(false);
                        setActiveStep(0);
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        setFirstName('');
                        setLastName('');
                        setBirthday(null);
                        setGenderValue('Male');
                        setContactNo('');
                        setStreet('');
                        setLane('');
                        setCity('');
                        setProvince('');
                        setUID('');
                    })
                    .catch((error) => {
                        messages.addMessage({ title: 'Fail !', msg: error.massage, type: 'danger' });
                    });
            })
            .catch((error) => {
                messages.addMessage({
                    title: 'Fail!',
                    msg: error.message,
                    type: 'danger'
                });
            });
    };

    const handleViewEditClick = (event, row) => {
        console.log(isEdit);
        setEditEmployeeId(row.id);

        setViewEditMemberDialog(true);
        setFirstName(row.firstName);
        setLastName(row.lastName);
        setEmail(row.email);
        setBirthday(row.birthDay);
        setContactNo(row.contactNo);
        setGenderValue(row.gender);
        setEmployeeType(row.type);
        setStreet(row.street);
        setLane(row.lane);
        setCity(row.city);
        setProvince(row.province);
    };

    const handleEditMemberSubmit = () => {
        console.log(isEdit);
        console.log(editEmployeeId);

        HttpCommon.put(`/api/user/${editEmployeeId}`, {
            type: employeeType,
            branchId
        })
            .then((res) => {
                handleSearch();
                messages.addMessage({ title: 'Edit Successfully !', msg: 'Member Details Edited Successfully', type: 'success' });
            })
            .catch((error) => {
                messages.addMessage({ title: 'Fail !', msg: error.message, type: 'danger' });
            });

        setEditEmployeeId(null);
        setViewEditMemberDialog(false);
        setIsEdit(false);
        if (nullBranchStaff === true) {
            setBranchArray([]);
        }
    };

    // Add New Member Dialog
    const handleClickAddNewMember = () => {
        setOpenAddNewMemberDialog(true);
    };
    const handleCloseAddNewMember = () => {
        setOpenAddNewMemberDialog(false);
    };

    const handleEmployeeType = (event) => {
        console.log(editEmployeeId);
        setEmployeeType(event.target.value);
    };

    const handleCloseViewEditMember = () => {
        console.log(isEdit);
        setEditEmployeeId(null);
        setViewEditMemberDialog(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setBirthday(null);
        setContactNo('');
        setGenderValue('Male');
        setEmployeeType('');
        setStreet('');
        setLane('');
        setCity('');
        setProvince('');
    };

    const handleShowTrainerReport = () => {
        navigate('/pages/report/trainerReport', { state: { trainerId: editEmployeeId, branchId } });
    };

    // Stepper
    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function showStep(step) {
        switch (step) {
            case 0:
                return (
                    <FirstStep
                        userType={userType}
                        email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                        employeeType={employeeType}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        setEmployeeType={setEmployeeType}
                    />
                );
            case 1:
                return (
                    <SecondStep
                        firstName={firstName}
                        lastName={lastName}
                        birthday={birthday}
                        genderValue={genderValue}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        setBirthday={setBirthday}
                        setGenderValue={setGenderValue}
                    />
                );
            case 2:
                return (
                    <ThirdStep
                        contactNo={contactNo}
                        street={street}
                        lane={lane}
                        city={city}
                        province={province}
                        setContactNo={setContactNo}
                        setStreet={setStreet}
                        setLane={setLane}
                        setCity={setCity}
                        setProvince={setProvince}
                    />
                );
            default:
                return <></>;
        }
    }
    function validations() {
        switch (activeStep) {
            case 0:
                if (password === '' || email === '') {
                    messages.addMessage({ title: 'Fail !', msg: 'Field cannot be empty.', type: 'danger' });
                    setActiveStep(0);
                } else if (password !== confirmPassword) {
                    messages.addMessage({ title: 'Fail !', msg: 'Confirm Password did not match.', type: 'danger' });
                    setActiveStep(0);
                    setPassword('');
                    setConfirmPassword('');
                } else if (!validEmail.test(email)) {
                    messages.addMessage({ title: 'Fail !', msg: 'Invalid email type', type: 'danger' });
                    setActiveStep(0);
                    setEmail('');
                } else if (password.length < 6) {
                    console.log(password.length);
                    messages.addMessage({ title: 'Fail !', msg: 'Password must be at least 6 characters', type: 'danger' });
                } else if (password === confirmPassword && email !== '') {
                    handleNext();
                }
                break;
            case 1:
                if (firstName !== '' && lastName !== '' && birthday !== null && genderValue !== '') {
                    handleNext();
                } else {
                    messages.addMessage({ title: 'Fail !', msg: 'Field cannot be empty.', type: 'danger' });
                }
                break;
            case 2:
                if (contactNo === '' || street === '' || lane === '' || city === '' || province === '') {
                    messages.addMessage({ title: 'Fail !', msg: 'Field cannot be empty.', type: 'danger' });
                    setActiveStep(2);
                } else if (!validContactNo.test(contactNo)) {
                    console.log(validContactNo.test(contactNo));
                    messages.addMessage({ title: 'Fail !', msg: 'Invalid Contact Number', type: 'danger' });
                    setActiveStep(2);
                    setContactNo('');
                } else if (contactNo !== '' && street !== '' && lane !== '' && city !== '' && province !== '') {
                    handleNext();
                } else {
                    messages.addMessage({ title: 'Fail !', msg: 'Field cannot be empty.', type: 'danger' });
                }
                break;
            default:
                messages.addMessage({ title: 'Fail !', msg: 'Active Step Not Found.', type: 'danger' });
        }
    }

    return (
        <>
            <MainCard title="Manage Employee">
                {userType === 'Owner' ? (
                    <>
                        <Stack spacing={2}>
                            <Autocomplete
                                disablePortal
                                id="gyms"
                                options={gymArray}
                                onChange={handleGymSelect}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Gym" color="secondary" />}
                            />

                            {branchArray.length > 0 && nullBranchStaff === false ? (
                                <Autocomplete
                                    disablePortal
                                    id="branchs"
                                    options={branchArray}
                                    onChange={handleBranchSelect}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Branch" color="secondary" />}
                                />
                            ) : (
                                <></>
                            )}

                            <RadioGroup row value={radioValue} onChange={handleRadioButton}>
                                <FormControlLabel value="Manager" control={<Radio color="secondary" />} label="Manager" />
                                <FormControlLabel value="Trainer" control={<Radio color="secondary" />} label="Trainer" />
                            </RadioGroup>
                        </Stack>
                        <div style={{ height: 10 }} />

                        <Button variant="contained" color="secondary" startIcon={<Search />} size="smaLL" onClick={handleSearch}>
                            Search
                        </Button>
                    </>
                ) : (
                    <></>
                )}

                <div style={{ height: 20 }} />
                {showTable !== true && nullBranchStaff === false ? (
                    <Grid container justifyContent="flex-end">
                        <AnimateButton>
                            <Button
                                disableElevation
                                size="medium"
                                variant="contained"
                                color="secondary"
                                onClick={handleClickAddNewMember}
                                disabled={addNewStaffButton}
                            >
                                Add New Staff
                            </Button>
                        </AnimateButton>
                    </Grid>
                ) : (
                    <></>
                )}

                <div style={{ height: 20 }} />

                <TableContainer component={Paper} hidden={showTable}>
                    <Table sx={{ minWidth: 650, backgroundColor: '#f3e5f5' }} size="small" aria-label="a dense table">
                        <TableHead sx={{ backgroundColor: '#512da8' }}>
                            <TableRow>
                                <TableCell align="center" sx={{ color: 'white' }}>
                                    Use Id
                                </TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>
                                    Name
                                </TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>
                                    Contact No
                                </TableCell>
                                {userType === 'Admin' ? (
                                    <TableCell align="center" sx={{ color: 'white' }}>
                                        Type
                                    </TableCell>
                                ) : (
                                    <></>
                                )}
                                {nullBranchStaff === true ? (
                                    <>
                                        <TableCell align="center" sx={{ color: 'white' }}>
                                            Started Date
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>
                                            Last Job Role
                                        </TableCell>
                                    </>
                                ) : (
                                    <></>
                                )}
                                <TableCell align="right" sx={{ color: 'white' }} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeData != null ? (
                                employeeData.map((row) => (
                                    <React.Fragment key={row.id}>
                                        {editEmployeeId === row.id ? (
                                            <Dialog />
                                        ) : (
                                            <ReadOnlyRow
                                                row={row}
                                                userType={userType}
                                                handleViewEditClick={handleViewEditClick}
                                                handleSearch={handleSearch}
                                                nullBranchStaff={nullBranchStaff}
                                                setIsEdit={setIsEdit}
                                                showDataToManager={showDataToManager}
                                            />
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <></>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>

            <Dialog open={openAddNewMemberDialog} onClose={handleCloseAddNewMember}>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: 'error.main' }}>Enter all * Requierd Data</DialogContentText>
                    <div style={{ height: 10 }} />
                    <Box sx={{ width: '100%' }}>
                        <Stepper
                            style={{ width: '100%', align: 'center' }}
                            activeStep={activeStep}
                            orientation="horizontal"
                            alternativeLabel
                        >
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {showStep(activeStep)}
                        {activeStep === steps.length ? (
                            <>
                                <TextField
                                    fullWidth
                                    value={firstName.concat(' ', lastName)}
                                    label="Name"
                                    margin="dense"
                                    inputProps={{ readOnly: true }}
                                />
                                <TextField fullWidth value={email} label="Email" margin="dense" inputProps={{ readOnly: true }} />
                                <TextField fullWidth value={birthday} label="Birthday" margin="dense" inputProps={{ readOnly: true }} />
                                <TextField fullWidth value={genderValue} label="Gender" margin="dense" inputProps={{ readOnly: true }} />
                                <TextField fullWidth value={contactNo} label="Contact No" margin="dense" inputProps={{ readOnly: true }} />
                                <TextField
                                    fullWidth
                                    value={street.concat(', ', lane, ', ', city)}
                                    label="Address"
                                    margin="dense"
                                    inputProps={{ readOnly: true }}
                                />
                                <TextField fullWidth value={province} label="Province" margin="dense" inputProps={{ readOnly: true }} />
                                {userType !== 'Admin' ? (
                                    <TextField
                                        fullWidth
                                        value={branchId}
                                        label="Branch Id"
                                        margin="dense"
                                        inputProps={{ readOnly: true }}
                                    />
                                ) : (
                                    <></>
                                )}

                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                                        Back
                                    </Button>
                                    <Button color="inherit" onClick={handleCloseAddNewMember} sx={{ mr: 1 }}>
                                        Close
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleAddNewMemberSubmit}>Submit</Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={validations}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={openViewEditMemberDialog} onClose={handleCloseViewEditMember}>
                <DialogTitle>Member Details</DialogTitle>
                <DialogContent>
                    {isEdit === true ? (
                        <>
                            {userType !== 'Admin' ? (
                                <>
                                    {userType !== 'Owner' ? (
                                        <DialogContentText>Manager can change only the type of member</DialogContentText>
                                    ) : (
                                        <>
                                            <DialogContentText>Owner can change only the type of member</DialogContentText>
                                        </>
                                    )}
                                </>
                            ) : (
                                <DialogContentText>Admin can change only the type of member</DialogContentText>
                            )}
                        </>
                    ) : (
                        <></>
                    )}

                    <TextField
                        fullWidth
                        value={firstName}
                        label="First Name"
                        margin="dense"
                        name="firstName"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={lastName}
                        label="Last Name"
                        margin="dense"
                        name="lastName"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField fullWidth value={email} label="Email" margin="dense" name="email" inputProps={{ readOnly: true }} />
                    <TextField fullWidth value={birthday} label="Birthday" margin="dense" name="birthDay" inputProps={{ readOnly: true }} />
                    <TextField
                        fullWidth
                        value={contactNo}
                        label="Contact Number"
                        margin="dense"
                        name="contactNo"
                        inputProps={{ readOnly: true }}
                    />
                    <FormControl>
                        <FormLabel id="gender">Gender</FormLabel>
                        <RadioGroup row value={genderValue}>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                    {isEdit === true ? (
                        <>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="type-lable" required>
                                        Type
                                    </InputLabel>
                                    <Select
                                        labelId="type-lable"
                                        id="type-select"
                                        value={employeeType}
                                        label="Type**"
                                        onChange={handleEmployeeType}
                                        required
                                    >
                                        <MenuItem value="Manager">Manager</MenuItem>
                                        <MenuItem value="Trainer">Trainer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <div style={{ height: 10 }} />
                            {nullBranchStaff === true ? (
                                <Stack spacing={2}>
                                    <Autocomplete
                                        disablePortal
                                        id="gyms"
                                        options={gymArray}
                                        onChange={handleAddNullBranchEmployee}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Gym" />}
                                    />
                                    {editedMemberBranchArray.length > 0 ? (
                                        <Autocomplete
                                            disablePortal
                                            id="branchs"
                                            options={editedMemberBranchArray}
                                            onChange={handleBranchSelect}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Branch" />}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </Stack>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <TextField fullWidth value={employeeType} label="Employee Type" margin="dense" inputProps={{ readOnly: true }} />
                    )}
                    <TextField fullWidth value={street} label="Street" margin="dense" name="street" inputProps={{ readOnly: true }} />
                    <TextField fullWidth value={lane} label="Lane" margin="dense" name="lane" inputProps={{ readOnly: true }} />
                    <TextField fullWidth value={city} label="City" margin="dense" name="city" inputProps={{ readOnly: true }} />
                    <TextField fullWidth value={province} label="Province" margin="dense" name="province" inputProps={{ readOnly: true }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewEditMember}>Cancel</Button>
                    {radioValue === 'Trainer' ? <Button onClick={handleShowTrainerReport}>Trainer Report</Button> : <></>}
                    {isEdit === true ? <Button onClick={handleEditMemberSubmit}>Save</Button> : <></>}
                </DialogActions>
            </Dialog>
        </>
    );
}
export default ManageEmployee;
