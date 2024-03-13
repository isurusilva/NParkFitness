/* eslint-disable spaced-comment */
/* eslint-disable react/react-in-jsx-scope */
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
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Avatar,
    CardActionArea,
    CardActions,
    Autocomplete,
    Stack
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiAlert from '@mui/material/Alert';
import HttpCommon from 'utils/http-common';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router';
import messages from 'utils/messages';

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';

import ReadOnlyRowSchedule from './component/ReadOnlyRowSchedule';
import ReadOnlyRowScheduleItem from '../scheduleItem/component/ReadOnlyRowScheduleItem';
import ReadOnlyRowScheduleItemManager from '../scheduleItem/component/ReadOnlyScheduleItemManager';
import ReadOnlyRowScheduleManager from './component/ReadOnlyRowScheduleManager';
import EditableRowScheduleItem from '../scheduleItem/component/EditableRowScheduleItem';

/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Schedule() {
    const [addButton, setAddButtonDisable] = useState(true);
    const [disableSearch, setDisableSearch] = useState(true);
    const [serviceArray, setServiceArray] = useState([]);
    const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
    const [openDialogDeleteScheduleItem, setOpenDialogDeleteScheduleItem] = React.useState(false);

    const current = new Date();
    const navigate = useNavigate();

    function unauthorizedlogin() {
        localStorage.clear();
        navigate('/', { replace: true });
    }

    const q = new Date();
    const m = q.getMonth() + 1;
    const d = q.getDay();
    const y = q.getFullYear();

    //  const date = new Date(y, m, d);
    const date = new Date();

    const [getSchedule, setSchedule] = useState(true);
    const [getAddSchedule, setAddSchedule] = useState(true);

    // dialog box
    const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
    const [openDialogScheduleItem, setOpenDialogScheduleItem] = React.useState(false);
    const [openDialogScheduleItemAdd, setopenDialogScheduleItemAdd] = React.useState(false);
    const handleDialog = () => {
        setOpenDialogScheduleItem(true);
    };
    const handleDialogAdd = () => {
        setopenDialogScheduleItemAdd(true);
    };
    const [userId, setUserId] = useState(0);
    const [type, setType] = useState([]);

    const [goalData, setGoalData] = React.useState();

    useEffect(() => {
        const userId = localStorage.getItem('userID');
        const type = localStorage.getItem('type');
        setUserId(userId);
        setType(type);
        // console.log(date);
        HttpCommon.get('api/goal')
            .then((res) => {
                setGoalData(res.data.data);
            })
            .catch((err) => {
                // console.log('error');
            });
    }, []);

    //-----------------------schedule-----------------------------
    const [scheduleData, setScheduleData] = React.useState();
    const [editContactIdSchedule, setEditContctIdSchedule] = React.useState(null);
    const [getMemberId, setMemberId] = React.useState();
    const [getBranchIdToService, setBranchIdToService] = React.useState();

    //take membership id
    const getScheduleToView = () => {
        const link = '/api/schedule/getAllScheduleByMemberId/';
        const id = getMemberId;
        const url = link + id;
        if (getMemberId != null) {
            console.log(url);
            HttpCommon.get(url)
                .then((res) => {
                    setScheduleData(res.data.data);
                    /* if (res.data.data.length === 0) {
                        navigate('/pages/membership');
                    }*/
                })
                .catch((err) => {
                    setSchedule(true);
                    console.log(err);
                    messages.addMessage({ title: 'Fail !', msg: err.message, type: 'danger' });
                });
        }
    };

    const viewMemberSchedule = () => {
        setSchedule(false);
        setAddSchedule(true);
        getScheduleToView();
    };

    useEffect(() => {
        setType(localStorage.getItem('type'));
        if (localStorage.getItem('type') === 'Trainer' || localStorage.getItem('type') === 'Manager') {
            getScheduleToView();
        } else {
            unauthorizedlogin();
        }
    }, []);

    const getServicesAvailable = () => {
        const link = '/api/user/';
        const id = userId;
        const url = link + id;
        if (userId > 0) {
            console.log('Starting');

            HttpCommon.get(url)
                .then((res) => {
                    // console.log(res.data.data);
                    setBranchIdToService(res.data.data.branchId);
                })
                .catch((err) => {
                    // console.log(err);
                });
        }
    };
    useEffect(() => {
        getServicesAvailable();
    }, [userId]);

    const [getExpireDate, setExpireDate] = useState(null);

    const [newScheduleData, setNewScheduleData] = React.useState();

    const [editFormDataSchedule, setEditFormDataSchedule] = React.useState({
        expireDate: ''
    });

    const [editContactId, setEditContctId] = React.useState(null);

    // Send New schedule data to server
    const handleAddFormSubmitSchedule = () => {
        if (new Date(getExpireDate) < date) {
            Store.addNotification({
                title: 'Fail to create schedule !',
                message: 'You can not add past dates as expire date',
                type: 'danger',
                insert: 'top',
                container: 'top-right',
                animationIn: ['animate__animated', 'animate__fadeIn'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                },
                width: 500
            });
        } else {
            HttpCommon.post('/api/schedule/', {
                expireDate: getExpireDate,
                membershipId: getMemberId,
                trainerId: userId
            })
                .then((res) => {
                    getScheduleToView();
                    setNewScheduleData(null);

                    Store.addNotification({
                        title: 'Successfully Done!',
                        message: 'Schedule Created Successfully',
                        type: 'success',
                        insert: 'top',
                        container: 'top-right',
                        animationIn: ['animate__animated', 'animate__fadeIn'],
                        animationOut: ['animate__animated', 'animate__fadeOut'],
                        dismiss: {
                            duration: 2000,
                            onScreen: true
                        },
                        width: 500
                    });
                })
                .catch((error) => {
                    // console.log(error);

                    Store.addNotification({
                        title: 'Fail !',
                        message: 'Fail to create schedule, This member is not exist',
                        type: 'danger',
                        insert: 'top',
                        container: 'top-right',
                        animationIn: ['animate__animated', 'animate__fadeIn'],
                        animationOut: ['animate__animated', 'animate__fadeOut'],
                        dismiss: {
                            duration: 2000,
                            onScreen: true
                        },
                        width: 500
                    });
                });
            setExpireDate(null);
            setAddSchedule(true);
        }
    };

    const handleEditFormSubmitSchedule = () => {
        if (new Date(getExpireDate) < date) {
            Store.addNotification({
                title: 'Fail to create schedule !',
                message: 'You can not add past dates as expire date',
                type: 'danger',
                insert: 'top',
                container: 'top-right',
                animationIn: ['animate__animated', 'animate__fadeIn'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                },
                width: 500
            });
        } else {
            const link = '/api/schedule/';
            const key = editContactId;
            const url = link + key;

            HttpCommon.put(url, {
                expireDate: getExpireDate
            })
                .then((res) => {
                    getScheduleToView();
                    Store.addNotification({
                        title: 'Successfully Done!',
                        message: 'Schedule Updated Successfully',
                        type: 'success',
                        insert: 'top',
                        container: 'top-right',
                        animationIn: ['animate__animated', 'animate__fadeIn'],
                        animationOut: ['animate__animated', 'animate__fadeOut'],
                        dismiss: {
                            duration: 2000,
                            onScreen: true
                        },
                        width: 500
                    });
                })
                .catch((error) => {
                    // console.log(error);

                    Store.addNotification({
                        title: 'Fail !',
                        message: error,
                        type: 'danger',
                        insert: 'top',
                        container: 'top-right',
                        animationIn: ['animate__animated', 'animate__fadeIn'],
                        animationOut: ['animate__animated', 'animate__fadeOut'],
                        dismiss: {
                            duration: 2000,
                            onScreen: true
                        },
                        width: 500
                    });
                });
            setExpireDate(null);
            setEditContctId(null);
            setOpenDialogEdit(false);
        }
    };

    const handleEditClick = (event, row) => {
        setEditContctId(row.id);
        setOpenDialogEdit(true);

        const formValues = {
            expireDate: getExpireDate
        };
        setEditFormDataSchedule(formValues);
    };
    const handleDeleteSubmit = () => {
        HttpCommon.delete(`/api/schedule/${editContactId}`)
            .then((res) => {
                getScheduleToView();
                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Schedule Deleted',
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    },
                    width: 500
                });
            })
            .catch((error) => {
                //  console.log(error);

                Store.addNotification({
                    title: 'Fail !',
                    message: error,
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    },
                    width: 500
                });
            });

        setEditContctId(null);
        setOpenDialogDelete(false);
    };

    const handleDeleteClick = (event, row) => {
        setEditContctId(row.id);
        setOpenDialogDelete(true);
    };

    const handleCloseEdit = () => {
        setEditContctId(null);
        setOpenDialogEdit(false);
        setOpenDialogDelete(false);
    };
    const handleCloseScheduleItem = () => {
        setEditContctId(null);
        setOpenDialogScheduleItem(false);
    };

    const myRef = useRef(null);

    // Scroll to myRef view
    const executeScroll = () => {
        myRef.current.scrollIntoView();
        setAddSchedule(false);
    };

    const handleShowSchedule = (event) => {
        setDisableSearch(false);
        setMemberId(event.target.value);
        // setSchedule(false);
        // setAddSchedule(true);
    };
    const [getScheduleId, setScheduleId] = React.useState();

    /* const getScheduleByScheduleId = () => {
        const link = '/api/schedule/';
        const id = getScheduleId;
        const url = link + id;
        HttpCommon.get(url)
            .then((res) => {
                console.log(res.data);
                setExpireDate(res.data.data.expireDate);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getScheduleByScheduleId();
    }, [getScheduleId]);*/
    const viewGoal = () => {
        navigate('/pages/report/memberReport', { state: { memberid: getMemberId } });
    };

    const [getDateDissable, setDateDissable] = useState();
    //----------------------------------scheduleItem-------------------------------
    const [scheduleItemData, setScheduleItemData] = React.useState();
    const [getServiceId, setServiceId] = React.useState();
    const [getService, setService] = React.useState();
    const getScheduleItemData = () => {
        const link = '/api/scheduleItem/getScheduleItemById/';
        const id = getScheduleId;
        const url = link + id;
        if (getScheduleId != null) {
            HttpCommon.get(url)
                .then((res) => {
                    // console.log(res.data);
                    setScheduleItemData(res.data.data);
                })
                .catch((err) => {
                    // console.log(err);
                });
        }
    };
    useEffect(() => {
        getScheduleItemData();
    }, [getScheduleId]);

    //get service by servie id
    /* const getServiceToView = () => {
        const link = '/api/serviceType/';
        const id = getServiceId;
        const url = link + id;
        HttpCommon.get(url)
            .then((res) => {
                console.log(res.data);
                setService(res.data.data.name);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getServiceToView();
    }, [getServiceId]);*/
    // get all services for autocomplete
    const getServiceToArray = () => {
        const link = '/api/serviceType/getServiceTypeByBranchId/';
        const id = getBranchIdToService;
        const url = link + id;
        if (getBranchIdToService != null) {
            console.log(url);
            HttpCommon.get(url)
                .then(async (res) => {
                    const tempArr = [];
                    // console.log(res);

                    await Promise.all(res.data.data.serviceType.map((row) => tempArr.push({ label: row.name, value: row.id })));
                    //console.log(tempArr);
                    setServiceArray(tempArr);
                })
                .catch((err) => {
                    // console.log(err);
                });
        }
    };
    useEffect(() => {
        getServiceToArray();
    }, [getBranchIdToService]);

    const handleScheduleAdd = (event, value) => {
        setAddButtonDisable(false);
        setServiceId(value.value);
    };

    // dialog box
    const [openDialog, setOpenDialog] = React.useState(false);

    const [newScheduleItemData, setNewScheduleItemData] = React.useState();

    const [editFormDataScheduleItem, setEditFormDataScheduleItem] = React.useState({
        serviceId: '',
        noOfSet: '',
        noOfRepetition: '',
        timeBySeconds: '',
        calAmount: ''
    });

    const [editContactIdSchedueItem, setEditContctIdScheduleItem] = React.useState(null);
    //  Add New ScheduleItem
    const handlAddFormChangeScheduleItem = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...newScheduleItemData };
        newFormData[fieldName] = fieldValue;

        setNewScheduleItemData(newFormData);
        // console.log(newScheduleItemData);
    };

    // Send New ScheduleItem data to server
    const handleAddFormSubmitScheduleItem = () => {
        // console.log(newScheduleItemData);

        HttpCommon.post('/api/scheduleItem/', {
            serviceId: getServiceId,
            noOfSet: newScheduleItemData.noOfSet,
            noOfRepetition: newScheduleItemData.noOfRepetition,
            timeBySeconds: newScheduleItemData.timeBySeconds,
            calAmount: newScheduleItemData.calAmount,
            scheduleId: getScheduleId
        })
            .then((res) => {
                getScheduleItemData();
                setNewScheduleItemData(null);

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'New ScheduleItem Added Successfully',
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    },
                    width: 500
                });
            })
            .catch((error) => {
                // console.log(error);

                Store.addNotification({
                    title: 'Fail !',
                    message: 'Fill all required Data',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    },
                    width: 500
                });
            });
        setAddButtonDisable(true);
    };

    // Data entering to text feilds in Edit scheduleitem details
    const handleEditFormChangeScheduleItem = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...editFormDataScheduleItem };
        newFormData[fieldName] = fieldValue;

        setEditFormDataScheduleItem(newFormData);
        // console.log('after type edit data');
    };

    const [editedValueService, setEditedValueService] = useState();

    // Send Edited branch data to server
    const handleEditFormSubmitScheduleItem = () => {
        const link = '/api/scheduleItem/';
        const key = editContactIdSchedueItem;
        const url = link + key;

        HttpCommon.put(url, {
            noOfSet: editFormDataScheduleItem.noOfSet,
            noOfRepetition: editFormDataScheduleItem.noOfRepetition,
            timeBySeconds: editFormDataScheduleItem.timeBySeconds,
            calAmount: editFormDataScheduleItem.calAmount,
            serviceId: editedValueService
        })
            .then((res) => {
                getScheduleItemData();
                setNewScheduleItemData(null);

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Schedule Item Updated Successfully',
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    },
                    width: 500
                });
            })
            .catch((error) => {
                console.log(error);

                Store.addNotification({
                    title: 'Fail !',
                    message: 'Fail!',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    },
                    width: 500
                });
            });

        setEditContctIdScheduleItem(null);
        setOpenDialog(false);
    };

    // Handling edit click
    const handleEditClickScheduleItem = (event, row) => {
        event.preventDefault();
        setEditContctIdScheduleItem(row.id);
        setOpenDialog(true);

        const formValues = {
            noOfSet: row.noOfSet,
            noOfRepetition: row.noOfRepetition,
            timeBySeconds: row.timeBySeconds,
            calAmount: row.calAmount,
            serviceId: row.serviceId
        };
        setEditFormDataScheduleItem(formValues);
    };
    const handleCancelClickScheduleItem = () => {
        setEditContctIdScheduleItem(null);
    };

    const handleDeleteSubmitScheduleItem = () => {
        HttpCommon.delete(`/api/scheduleItem/${editContactIdSchedueItem}`)
            .then((res) => {
                getScheduleItemData();
                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Schedule Item Deleted',
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    },
                    width: 500
                });
            })
            .catch((error) => {
                //  console.log(error);

                Store.addNotification({
                    title: 'Fail !',
                    message: error,
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    },
                    width: 500
                });
            });

        setEditContctIdScheduleItem(null);
        setOpenDialogDeleteScheduleItem(false);
    };

    const handleDeleteClickScheduleItem = (event, row) => {
        setEditContctIdScheduleItem(row.id);
        setOpenDialogDeleteScheduleItem(true);
    };

    const handleClose = () => {
        setEditContctIdScheduleItem(null);
        setOpenDialog(false);
        setOpenDialogDeleteScheduleItem(false);
    };

    const handleCloseScheduleItemAdd = () => {
        setEditContctId(null);
        setopenDialogScheduleItemAdd(false);
    };
    const [expireDate, setExpireDateT] = useState(null);

    return (
        <>
            {type === 'Manager' || type === 'Owner' ? (
                <>
                    <MainCard title="Schedule">
                        <Stack direction="row" spacing={2}>
                            <p>Enter Member Id to view schedule</p>
                            <TextField
                                required
                                onChange={handleShowSchedule}
                                margin="dense"
                                name="name"
                                inputProps={{ maxLength: 150 }}
                                type="number"
                            />
                            <Button
                                disableElevation
                                size="medium"
                                variant="contained"
                                color="secondary"
                                onClick={viewMemberSchedule}
                                disabled={disableSearch}
                            >
                                Search
                            </Button>
                        </Stack>
                    </MainCard>
                    <br />

                    <MainCard title="ScheduleItems" hidden={getSchedule}>
                        <AnimateButton>
                            <Button disableElevation size="medium" variant="contained" color="secondary" onClick={viewGoal}>
                                Show Profile
                            </Button>
                        </AnimateButton>
                        <div style={{ height: 5 }} />
                        <div style={{ height: 10 }} />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, backgroundColor: '#f3e5f5' }} size="small" aria-label="a dense table">
                                <TableHead sx={{ backgroundColor: '#512da8' }}>
                                    <TableRow>
                                        <TableCell align="center" sx={{ color: 'white' }}>
                                            Expire Date
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>
                                            Status
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>
                                            Duration
                                        </TableCell>
                                        <TableCell align="center" />
                                        <TableCell align="center" />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {scheduleData != null ? (
                                        scheduleData.map((row) => (
                                            <React.Fragment key={row.id}>
                                                {editContactId === row.id ? (
                                                    <></>
                                                ) : (
                                                    <>
                                                        <ReadOnlyRowScheduleManager
                                                            row={row}
                                                            handleEditClick={handleEditClick}
                                                            handleDialog={handleDialog}
                                                            handleDialogAdd={handleDialogAdd}
                                                            setScheduleId={setScheduleId}
                                                        />
                                                        <Dialog open={openDialogScheduleItem} onClose={handleCloseScheduleItem}>
                                                            <DialogTitle>ScheduleItems</DialogTitle>
                                                            <DialogContent>
                                                                <TableContainer component={Paper}>
                                                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell align="center">Activity</TableCell>
                                                                                <TableCell align="center">No of Sets</TableCell>
                                                                                <TableCell align="center">No of Repetitions</TableCell>
                                                                                <TableCell align="center">Time(Seconds)</TableCell>
                                                                                <TableCell align="center">Calories</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {scheduleItemData != null ? (
                                                                                scheduleItemData.map((row) => (
                                                                                    <React.Fragment key={row.id}>
                                                                                        {editContactIdSchedueItem === row.id ? (
                                                                                            <></>
                                                                                        ) : (
                                                                                            <>
                                                                                                <ReadOnlyRowScheduleItemManager
                                                                                                    row={row}
                                                                                                    handleEditClick={handleEditClick}
                                                                                                    handleDialog={handleDialog}
                                                                                                    handleDialogAdd={handleDialogAdd}
                                                                                                    setScheduleId={setScheduleId}
                                                                                                    setServiceId={setServiceId}
                                                                                                />
                                                                                            </>
                                                                                        )}
                                                                                    </React.Fragment>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleCloseScheduleItem}>Cancel</Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </>
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
                </>
            ) : (
                <>
                    <MainCard title="Schedule">
                        <Stack direction="row" spacing={2}>
                            <p>Enter Member Id to view schedule</p>
                            <TextField
                                required
                                onChange={handleShowSchedule}
                                margin="dense"
                                name="name"
                                inputProps={{ maxLength: 150 }}
                                type="number"
                            />
                            <Button
                                disableElevation
                                size="medium"
                                variant="contained"
                                color="secondary"
                                onClick={viewMemberSchedule}
                                disabled={disableSearch}
                            >
                                Search
                            </Button>
                        </Stack>
                    </MainCard>
                    <br />

                    <MainCard title="ScheduleItems" hidden={getSchedule}>
                        <AnimateButton>
                            <Button disableElevation size="medium" variant="contained" color="secondary" onClick={viewGoal}>
                                Show Profile
                            </Button>
                        </AnimateButton>
                        <div style={{ height: 5 }} />
                        <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                            <AnimateButton>
                                <Button disableElevation size="medium" variant="contained" color="secondary" onClick={executeScroll}>
                                    Add New Schedule
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <div style={{ height: 10 }} />

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, backgroundColor: '#f3e5f5' }} size="small" aria-label="a dense table">
                                <TableHead sx={{ backgroundColor: '#512da8' }}>
                                    <TableRow>
                                        <TableCell align="center" sx={{ color: 'white' }}>
                                            Expire Date
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>
                                            Status
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>
                                            Duration
                                        </TableCell>
                                        <TableCell align="center" />
                                        <TableCell align="center" />
                                        <TableCell align="right" />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {scheduleData != null ? (
                                        scheduleData.map((row) => (
                                            <React.Fragment key={row.id}>
                                                {editContactId === row.id ? (
                                                    <></>
                                                ) : (
                                                    <>
                                                        <ReadOnlyRowSchedule
                                                            row={row}
                                                            handleEditClick={handleEditClick}
                                                            handleDialog={handleDialog}
                                                            handleDialogAdd={handleDialogAdd}
                                                            setScheduleId={setScheduleId}
                                                            setExpireDate={setExpireDate}
                                                            handleDeleteClick={handleDeleteClick}
                                                        />
                                                        <Dialog open={openDialogScheduleItem} onClose={handleCloseScheduleItem}>
                                                            <DialogTitle>ScheduleItems</DialogTitle>
                                                            <DialogContent>
                                                                <TableContainer component={Paper}>
                                                                    <Table
                                                                        sx={{ minWidth: 650, backgroundColor: 'white' }}
                                                                        size="small"
                                                                        aria-label="a dense table"
                                                                    >
                                                                        <TableHead sx={{ backgroundColor: 'white' }}>
                                                                            <TableRow>
                                                                                <TableCell
                                                                                    align="center"
                                                                                    style={{ padding: '0px 12px 0px 0px' }}
                                                                                >
                                                                                    Activity
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    align="center"
                                                                                    style={{ padding: '0px 12px 0px 0px' }}
                                                                                >
                                                                                    No of Sets
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    align="center"
                                                                                    style={{ padding: '0px 12px 0px 0px' }}
                                                                                >
                                                                                    No of Repetitions
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    align="center"
                                                                                    style={{ padding: '0px 12px 0px 0px' }}
                                                                                >
                                                                                    Time(Seconds)
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    align="center"
                                                                                    style={{ padding: '0px 12px 0px 0px' }}
                                                                                >
                                                                                    Calories
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {scheduleItemData != null ? (
                                                                                scheduleItemData.map((row) => (
                                                                                    <React.Fragment key={row.id}>
                                                                                        {editContactIdSchedueItem === row.id ? (
                                                                                            <EditableRowScheduleItem
                                                                                                row={row}
                                                                                                editFormDataScheduleItem={
                                                                                                    editFormDataScheduleItem
                                                                                                }
                                                                                                handleEditFormChangeScheduleItem={
                                                                                                    handleEditFormChangeScheduleItem
                                                                                                }
                                                                                                handleEditFormSubmitScheduleItem={
                                                                                                    handleEditFormSubmitScheduleItem
                                                                                                }
                                                                                                handleCancelClickScheduleItem={
                                                                                                    handleCancelClickScheduleItem
                                                                                                }
                                                                                                setEditedValueService={
                                                                                                    setEditedValueService
                                                                                                }
                                                                                                serviceArray={serviceArray}
                                                                                            />
                                                                                        ) : (
                                                                                            <>
                                                                                                <ReadOnlyRowScheduleItem
                                                                                                    row={row}
                                                                                                    handleEditClickScheduleItem={
                                                                                                        handleEditClickScheduleItem
                                                                                                    }
                                                                                                    handleDialog={handleDialog}
                                                                                                    handleDialogAdd={handleDialogAdd}
                                                                                                    setScheduleId={setScheduleId}
                                                                                                    handleDeleteClickScheduleItem={
                                                                                                        handleDeleteClickScheduleItem
                                                                                                    }
                                                                                                />
                                                                                            </>
                                                                                        )}
                                                                                    </React.Fragment>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleCloseScheduleItem}>Cancel</Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </>
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

                    <MainCard title="Add New Schedule" hidden={getAddSchedule} ref={myRef}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid item lg={6}>
                                <DesktopDatePicker
                                    label="Expire Date"
                                    value={getExpireDate}
                                    inputFormat="MM/dd/yyyy"
                                    sx={{ width: 600 }}
                                    onChange={(newValue) => {
                                        setExpireDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                        </LocalizationProvider>
                        <Grid container direction="row" justifyContent="flex-end" spacing={3}>
                            <Grid item>
                                <Button
                                    disableElevation
                                    onClick={handleAddFormSubmitSchedule}
                                    size="medium"
                                    variant="contained"
                                    color="secondary"
                                    disabled={!getExpireDate}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </MainCard>

                    <Dialog open={openDialogEdit} onClose={handleCloseEdit}>
                        <DialogTitle>Edit Schedule</DialogTitle>
                        <DialogContent>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Grid item lg={6}>
                                    <DesktopDatePicker
                                        selected={new Date()}
                                        label="Expire Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={getExpireDate}
                                        sx={{ width: 600 }}
                                        onChange={(newValue) => {
                                            setExpireDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>
                            </LocalizationProvider>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseEdit}>Cancel</Button>
                            <Button onClick={handleEditFormSubmitSchedule}>Save</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openDialogScheduleItemAdd} onClose={handleCloseScheduleItemAdd}>
                        <DialogTitle>Add ScheduleItems</DialogTitle>
                        <DialogContent>
                            <Autocomplete
                                id="controllable-states-demo"
                                onChange={handleScheduleAdd}
                                options={serviceArray}
                                renderInput={(params) => (
                                    <TextField {...params} label="Activity" variant="outlined" fullWidth margin="dense" />
                                )}
                            />
                            <TextField
                                required
                                fullWidth
                                onChange={handlAddFormChangeScheduleItem}
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                label="No of Sets"
                                margin="dense"
                                name="noOfSet"
                            />
                            <TextField
                                required
                                fullWidth
                                onChange={handlAddFormChangeScheduleItem}
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                label="No of Repetitions"
                                margin="dense"
                                name="noOfRepetition"
                            />
                            <TextField
                                required
                                fullWidth
                                onChange={handlAddFormChangeScheduleItem}
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                label="Time(seconds)"
                                margin="dense"
                                name="timeBySeconds"
                            />
                            <TextField
                                required
                                fullWidth
                                onChange={handlAddFormChangeScheduleItem}
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                label="CalAmount"
                                margin="dense"
                                name="calAmount"
                            />

                            <Grid container direction="row" justifyContent="flex-end" spacing={3}>
                                <Grid item>
                                    <Button
                                        disableElevation
                                        onClick={handleAddFormSubmitScheduleItem}
                                        size="medium"
                                        variant="contained"
                                        color="secondary"
                                        disabled={addButton}
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseScheduleItemAdd}>Cancel</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openDialogDelete} onClose={handleClose}>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this schedule?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseEdit}>Cancel</Button>
                            <Button onClick={handleDeleteSubmit}>YES</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openDialogDeleteScheduleItem} onClose={handleClose}>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this scheduleItem?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleDeleteSubmitScheduleItem}>YES</Button>
                        </DialogActions>
                    </Dialog>
                    <div style={{ height: 50 }} />

                    <div style={{ height: 50 }} />
                </>
            )}
        </>
    );
}

export default Schedule;
