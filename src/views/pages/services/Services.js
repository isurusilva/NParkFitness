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
    Autocomplete,
    Stack
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiAlert from '@mui/material/Alert';
import EditableRow from './component/EditableRowService';
import ReadOnlyRow from './component/ReadOnlyServiceRow';
import { Search } from '@material-ui/icons';
import HttpCommon from 'utils/http-common';
import { useNavigate } from 'react-router';
import messages from 'utils/messages';

/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const gymArray = [];
const bodyparts = ['ABS', 'Back', 'Biceps', 'Chest', 'Forearm', 'Hips', 'Legs', 'Shoulder', 'Triceps'];
const status = ['Availble', 'Not Available'];

function ServiceType() {
    const [userType, setUserType] = useState();
    const [serviceData, setServiceData] = useState([]);
    const [BranchId, setBranchId] = useState();
    const [branchArray, setBranchArray] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const [serviceStatus, setServiceStatus] = useState('');
    const [bodyPart, setBodyPart] = useState('');
    const [addButton, setAddButtonDisable] = useState(true);
    const [editableServiceName, setEditableServiceName] = useState();
    const [editableServiceStatus, setEditableServiceStatus] = useState(null);
    const [editableBodyPart, setEditableBodyPart] = useState(null);
    const [editServiceId, setEditServiceId] = useState(null);
    const [showTable, setShowTable] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [showAddServicesCard, setShowAddServicesCard] = useState(true);
    const [searchButtonDisable, setSearchButtonDisable] = useState(true);

    // Create and get my reference in Add New Subscription type
    const mainCard2Ref = useRef(null);
    const mainCard1Ref = useRef(null);
    const navigate = useNavigate();

    function unauthorizedlogin() {
        localStorage.clear();
        navigate('/', { replace: true });
    }

    function getGym() {
        gymArray.length = 0;
        HttpCommon.get(`/api/gym/getAllGymByUserId/${localStorage.getItem('userID')}`)
            .then((res) => {
                res.data.data.map((row) => gymArray.push({ label: row.name, value: row.id }));
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    }

    function getServices() {
        HttpCommon.get(`/api/user/${localStorage.getItem('userID')}`)
            .then((res) => {
                setBranchId(res.data.data.branchId);
                HttpCommon.get(`/api/serviceType/getServiceTypeByBranchId/${res.data.data.branchId}`)
                    .then((res) => {
                        setServiceData(res.data.data.serviceType);
                        setShowTable(false);
                        setShowButton(true);
                    })
                    .catch((err) => {
                        messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
                    });
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    }

    useEffect(() => {
        setUserType(localStorage.getItem('type'));
        if (localStorage.getItem('type') === 'Admin') {
            unauthorizedlogin();
        } else if (localStorage.getItem('type') === 'Owner') {
            getGym();
        } else if (localStorage.getItem('type') === 'Manager' || localStorage.getItem('type') === 'Trainer') {
            getServices();
        }
    }, []);

    const handleGymSelect = (event, newValue) => {
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

    const handleBranchSelect = (event, newValue) => {
        if (newValue !== null) {
            setBranchId(newValue.value);
            setSearchButtonDisable(false);
        }
    };

    const handleSearch = () => {
        HttpCommon.get(`/api/serviceType/getServiceTypeByBranchId/${BranchId}`)
            .then((res) => {
                setServiceData(res.data.data.serviceType);
                setShowButton(true);
                setShowTable(false);
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    };

    // Scroll to myRef view
    const executeScroll = () => {
        mainCard2Ref.current.scrollIntoView();
    };

    const addButtonClickExecuteScroll = () => {
        mainCard1Ref.current.scrollIntoView();
    };

    const handleServiceName = (event) => {
        setServiceName(event.target.value);
    };

    const handleServiceStatus = (event, newValue) => {
        setServiceStatus(newValue);
    };

    const handleBodyPart = (event, newValue) => {
        setBodyPart(newValue);
        if (serviceName !== '' && serviceStatus !== '') {
            setAddButtonDisable(false);
        }
    };

    const handleAddNewServices = () => {
        setShowAddServicesCard(false);
        executeScroll();
    };

    const handleAddFormSubmit = () => {
        HttpCommon.post('/api/serviceType/', {
            name: serviceName,
            status: serviceStatus,
            bodyPart,
            branchId: BranchId
        })
            .then((res) => {
                handleSearch();
                messages.addMessage({ title: 'Successfully Done!', msg: 'New Service Added Successfully', type: 'success' });
                setAddButtonDisable(true);
            })
            .catch((error) => {
                messages.addMessage({ title: 'Fail !', msg: 'Fill all required Data', type: 'danger' });
            });

        setServiceName('');
        setServiceStatus('');
        setBodyPart('');
        addButtonClickExecuteScroll();
    };

    const handleEditFormSubmit = () => {
        const link = '/api/serviceType/';
        const key = editServiceId;
        const url = link + key;
        HttpCommon.put(url, {
            name: editableServiceName,
            status: editableServiceStatus,
            bodyPart: editableBodyPart
        })
            .then((res) => {
                handleSearch();
                messages.addMessage({ title: 'Successfully Done!', msg: 'Service Edited Successfully', type: 'success' });
            })
            .catch((error) => {
                messages.addMessage({ title: 'Fail !', msg: error, type: 'danger' });
            });

        setEditServiceId(null);
    };

    const handleEditClick = (event, row) => {
        setEditServiceId(row.id);
        setEditableServiceName(row.name);
        setEditableServiceStatus(row.status);
        setEditableBodyPart(row.bodyPart);
    };

    const handleCancelClick = () => {
        setEditServiceId(null);
    };

    return (
        <>
            <MainCard title="Services" ref={mainCard1Ref}>
                <>
                    {userType === 'Owner' ? (
                        <>
                            <Stack direction="row" spacing={2}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={gymArray}
                                    onChange={handleGymSelect}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Gym" color="secondary" />}
                                />
                                {branchArray.length > 0 ? (
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo2"
                                        options={branchArray}
                                        onChange={handleBranchSelect}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Branch" color="secondary" />}
                                    />
                                ) : (
                                    <></>
                                )}

                                <Button
                                    variant="contained"
                                    startIcon={<Search />}
                                    size="medium"
                                    color="secondary"
                                    onClick={handleSearch}
                                    disabled={searchButtonDisable}
                                >
                                    Search
                                </Button>
                            </Stack>
                            <div style={{ height: 50 }} />
                        </>
                    ) : (
                        <></>
                    )}
                    {showButton === true ? (
                        <>
                            {userType !== 'Trainer' ? (
                                <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            size="medium"
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleAddNewServices}
                                        >
                                            Add New Service
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <></>
                    )}

                    <div style={{ height: 10 }} />
                    <TableContainer component={Paper} hidden={showTable}>
                        <Table sx={{ minWidth: 650, backgroundColor: '#f3e5f5' }} size="small" aria-label="a dense table">
                            <TableHead sx={{ backgroundColor: '#512da8' }}>
                                <TableRow>
                                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }}>
                                        Status
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }}>
                                        Body Part
                                    </TableCell>
                                    {userType !== 'Trainer' ? <TableCell align="right" /> : <></>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {serviceData != null ? (
                                    serviceData.map((row) => (
                                        <React.Fragment key={row.id}>
                                            {editServiceId === row.id ? (
                                                <EditableRow
                                                    editableServiceName={editableServiceName}
                                                    editableServiceStatus={editableServiceStatus}
                                                    editableBodyPart={editableBodyPart}
                                                    setEditableServiceName={setEditableServiceName}
                                                    setEditableServiceStatus={setEditableServiceStatus}
                                                    setEditableBodyPart={setEditableBodyPart}
                                                    handleCancelClick={handleCancelClick}
                                                    handleEditFormSubmit={handleEditFormSubmit}
                                                />
                                            ) : (
                                                <ReadOnlyRow
                                                    row={row}
                                                    handleEditClick={handleEditClick}
                                                    userType={userType}
                                                    handleSearch={handleSearch}
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
                </>
            </MainCard>
            <div style={{ height: 10 }} />
            {userType !== 'Trainer' ? (
                <MainCard title="Add New Service" ref={mainCard2Ref} hidden={showAddServicesCard}>
                    <TextField
                        required
                        fullWidth
                        value={serviceName}
                        onChange={handleServiceName}
                        label="Name"
                        margin="dense"
                        name="name"
                        color="secondary"
                    />

                    <Autocomplete
                        value={serviceStatus}
                        onChange={handleServiceStatus}
                        id="controllable-states-demo"
                        options={status}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Status"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                name="bodyPart"
                                color="secondary"
                            />
                        )}
                    />

                    <Autocomplete
                        value={bodyPart}
                        onChange={handleBodyPart}
                        id="controllable-states-demo"
                        options={bodyparts}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Body Part"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                name="bodyPart"
                                color="secondary"
                            />
                        )}
                    />

                    <Grid container direction="row" justifyContent="flex-end" spacing={3}>
                        <Grid item>
                            <Button
                                disableElevation
                                onClick={handleAddFormSubmit}
                                size="medium"
                                variant="contained"
                                color="secondary"
                                disabled={addButton}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </MainCard>
            ) : (
                <></>
            )}
            <div style={{ height: 50 }} />
        </>
    );
}

export default ServiceType;
