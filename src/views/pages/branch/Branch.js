/* eslint-disable prettier/prettier */
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
    Stack,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiAlert from '@mui/material/Alert';
import HttpCommon from 'utils/http-common';
import { useNavigate } from 'react-router';
import messages from 'utils/messages';

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import ReadOnlyRowBranch from './component/ReadOnlyRowBranch';
import useId from '@material-ui/utils/useId';
import ReadOnlyRowBranchAdmin from './component/ReadOnlyRowBranchAdmin';
/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const provinceArray = ['Western', 'Southern', 'Central', 'Nouthern', 'Eastern', 'North Central', 'Uva', 'Sabaragamuwa', 'North Western'];
const activeStatusArray = ['true', 'false'];
// const gymArray = [];
const gymArrayAll = [];
// const possibleGymsArray = [];

function Branch() {
    const [gymArray, setGymArray] = useState([]);
    const [getPossibleGymArray, setPossibleGymArray] = useState([]);
    const [addButton, setAddButtonDisable] = useState(true);
    const [showAdd, setShowAdd] = useState(true);
    const [showAddBranch,setShowAddBranch] = useState(true);

    const [branchData, setBranchData] = useState([]);
    const [getSubscriptionData,setSubscriptionData] = React.useState();
    const [branchCountToUser,getBranchCountToUser] = React.useState();
    const [getBranchCount,setBranchCount] = React.useState();
    const navigate = useNavigate();

    function unauthorizedlogin() {
        localStorage.clear();
        navigate('/', { replace: true });
    }

    
    // get all branch
   const getAllBranch = () => {
        HttpCommon.get('/api/branch/')
            .then((res) => {
                setBranchData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getAllBranch();
    }, []);

    const [getGymId, setGymId] = useState();
    const handleBranchDetails = (event,newValue) => {
            setGymId(newValue.value);
           setShowAddBranch(true);
           setShowAdd(true)
    };

    // get gym by gym id
    const [getGymByGymId, setGymByGymId] = useState([]);

    // get branches by gym id
    const [branchByGymData, setBranchByGymData] = useState([]);

    const getBranch = () => {
        const link1 = 'api/gym/';
        const id = getGymId;
        const url1 = link1 + id;
        if(getGymId !== undefined){
        // console.log(url1);
        HttpCommon.get(url1)
            .then((res) => {
                setGymByGymId(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        const link2 = 'api/branch/getBranchByGymId/';
        const url2 = link2 + id;
        // console.log(url2);
        HttpCommon.get(url2)
            .then((res) => {
                setBranchByGymData(res.data.data);
                setShowAddBranch(false);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    };
    useEffect(() => {
        getBranch();
    }, []);

    // push all gyms to gym array
    const [userId, setUserId] = useState();
    const [type, setType] = useState();
    const getBranchToView = () => {
        const userId = localStorage.getItem('userID');
        const type = localStorage.getItem('type');
        setUserId(userId);
        setType(type);

        const link1 = '/api/gym/getAllGymByUserId/';
        const id = userId;
        const url1 = link1+id;
       // console.log(url1);
        if(userId !== undefined){
        HttpCommon.get(url1)
            .then(async(res) => {
                const tempArr = [];
                await Promise.all(
                    res.data.data.map((row) => tempArr.push({ label: row.name, value: row.id }))
                );
                setGymArray(tempArr);
                // res.data.data.map((row) => gymArray.push({ label: row.name, value: row.id }));
            })
            .catch((err) => {
                console.log(err);
            });
        }
        const link2 = '/api/subscription/getSubscriptionByUserId/';
        const url2 = link2+id;
        // console.log(url2);
        if(userId !== undefined){
            HttpCommon.get(url2)
                .then(res => {
                   // console.log(res.data);
                    setSubscriptionData(res.data.data.subscriptionTypeId)
                })
                .catch(err => {
                    // console.log(err);
                });
            }
    
    };
    useEffect(() => {
        getBranchToView();
    },[])

    const [getBranchId,setBranchId]=React.useState();
    const [getBranchManager,setBranchManager] = React.useState([]);
    const [getBranchNameManager,setBranchNameManager] = React.useState([]);
    const [getBranchIsActiveManager,setBranchIsActiveManager] = React.useState([]);
    const [getBranchLaneManager,setBranchLaneManager] = React.useState([]);
    const [getBranchStreetManager,setBranchStreetManager] = React.useState([]);
    const [getBranchCityManager,setBranchCityManager] = React.useState([]);
    const [getBranchProvinceManager,setBranchProvinceManager] = React.useState([]);

    const getManagerBranchId = () => {
        const userId = localStorage.getItem('userID');
        const type = localStorage.getItem('type');
        setUserId(userId);
        setType(type);
        const link = '/api/user/'
        const id = userId;
        const url = link+id;
        // console.log(url);
        if(userId !== undefined){
        HttpCommon.get(url)
            .then((res) => {
                setBranchId(res.data.data.branchId);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
    useEffect(() => {
        getManagerBranchId();
    },[]) 
    const handleShowProfile = () => {
        navigate('/pages/report/branchReport', { state: { branchId: getBranchId } });
    };

    // get branch by branchId
    const viewBranchDataManager = () => {
        const link = 'api/branch/'
        const id=getBranchId
        const url=link+id
        if(getBranchId !== undefined && getBranchId != null){
            console.log(url);
        HttpCommon.get(url)
        .then((res) => {
            setBranchNameManager(res.data.data.name);
            setBranchStreetManager(res.data.data.street);
            setBranchLaneManager(res.data.data.lane);
            setBranchCityManager(res.data.data.city);
            setBranchProvinceManager(res.data.data.province);
            setBranchIsActiveManager(res.data.data.isActive);
        })
        .catch((err) => {
           // console.log(err);
        });
    }
    }
    useEffect(() => {
        viewBranchDataManager();
    },[getBranchId])

    useEffect(() => {
        setType(localStorage.getItem('type'));
        if (localStorage.getItem('type') === 'Owner') {
            getBranchToView();
        }else if (localStorage.getItem('type') === 'Admin'){
            getAllBranch();
        }else if (localStorage.getItem('type') === 'Manager') {
            viewBranchDataManager();
        }else {
            unauthorizedlogin();
        }
    }, []);
    /* useEffect(() => {
        const userId = localStorage.getItem('UserId');
        const type = localStorage.getItem('type');
        setUserId(userId);
        setType(type);

        HttpCommon.get('/api/gym')
            .then((res) => {
                res.data.data.map((row) => gymArrayAll.push({ label: row.name, value: row.id }));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []); */

    const branchCountByUser = () => {
        const link = '/api/branch/getBranchCountByGymId/';
        const id = getGymId;
        const url = link +id;
        if(branchByGymData !== undefined && getGymId !== undefined){
        // console.log(url);
        HttpCommon.get(url)
        .then(res => {
           // console.log(res.data);
            getBranchCountToUser(res.data.data);
            // console.log(branchCountToUser);
        })
        .catch(err => {
            console.log(err);
        });
    }
    }
    useEffect(() => {
        branchCountByUser();
    },[branchByGymData,getGymId]);
    

    
    // get subscription type by id
    const gymCount = () => {
        const link = '/api/subscriptionType/';
        const id = getSubscriptionData;
        const url = link+id;
        if(getSubscriptionData !== undefined){
        HttpCommon.get(url)
            .then(res => {
               // console.log(res.data);
                setBranchCount(res.data.data.branchCount)
               // console.log(getBranchCount)
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
    useEffect(() => {
        gymCount();
    }, [getSubscriptionData]);

    const [newBranchData, setNewBranchData] = React.useState();

    const [editFormDataBranch, setEditFormDataBranch] = React.useState({
        name: '',
        street: '',
        lane: '',
        city: '',
        province: '',
        gymId: '',
        isActive: ''
    });

    const [editContactIdBranch, setEditContctIdBranch] = React.useState(null);

    // dialog box
    const [openDialog, setOpenDialog] = React.useState(false);

    // provinces & isActive autocomplete values
    const [getNameBranch, setNameBranch] = useState(null);
    const [getStreet, setStreet] = useState(null);
    const [getLane, setLane] = useState(null);
    const [getCity, setCity] = useState(null);
    const [proviceName, setProvince] = useState(null);
    const [getGymName,setGymName] = useState(null);
    const [ActiveStatus, setIsActive] = useState(null);

    const handleBranchName = (event) => {
        setNameBranch(event.target.value);
    };
    const handlestreet = (event) => {
        setStreet(event.target.value);
    };
    const handleLane = (event) => {
        setLane(event.target.value);
    };
    const handleCity = (event) => {
        setCity(event.target.value);
    };
    const handleProvince = (event,newValue) => {
        setProvince(newValue);
        if (getNameBranch != null && getStreet != null && getLane != null && getCity != null &&  getGymId != null) {
            setAddButtonDisable(false);
        }
    };
    const handleGym = (event,newValue) => {
        setGymName(newValue.value);
    };
    /* const handleIsActive = (event,newValue) => {
        setIsActive(newValue);
        if (getNameBranch != null && getStreet != null && getLane != null && getCity != null && proviceName != null && getGymId != null) {
            setAddButtonDisable(false);
        }
    }; */

    /* //  Add New Branch
    const handlAddFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...newBranchData };
        newFormData[fieldName] = fieldValue;

        setNewBranchData(newFormData);
        console.log(newBranchData);
    }; */

    // Send New branch data to server
    const handleAddFormSubmit = () => {
        if(parseInt(branchCountToUser, 10) >= parseInt(getBranchCount, 10)){
            setShowAdd(true);
            Store.addNotification({
                title: 'Fail to add new gym!',
                message: 'Your branch count exceeded',
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
        }else{
        console.log(newBranchData);
        HttpCommon.post('/api/branch/', {
            name: getNameBranch,
            street: getStreet,
            lane: getLane,
            city: getCity,
            province: proviceName,
            gymId: getGymId,
            isActive: true
        })
            .then((res) => {
                getBranch();
                setNewBranchData(null);

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'New Branch Added Successfully',
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
                setNewBranchData(null);
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
        }
        setNameBranch( "");
        setStreet(" ");
        setLane(" ");
        setCity(" ");
        setProvince(null);
        setIsActive(null);
        setShowAdd(true);
    };
    // Data entering to text feilds in Edit branch details
    const handleEditFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...editFormDataBranch };
        newFormData[fieldName] = fieldValue;

        setEditFormDataBranch(newFormData);
       // console.log('after type edit data');
       // console.log(editFormDataBranch);
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [editedValueProvince, setEditedValueProvince] = useState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [editedValueActive, setEditedValueActive] = useState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [editedValueGym, setEditedValueGym] = useState();

    // Send Edited branch data to server
    const handleEditFormSubmit = () => {
        const link = '/api/branch/';
        const key = editContactIdBranch;
        const url = link + key;
        console.log(url);
        console.log(editContactIdBranch);
        if(editedValueActive !== undefined && editedValueActive === "false"){
            console.log(editedValueActive);
            HttpCommon.get(`/api/user/removeAllStaffByBranchId/${editContactIdBranch}`)
        }
        HttpCommon.put(url, {
            name: editFormDataBranch.name,
            street: editFormDataBranch.street,
            lane: editFormDataBranch.lane,
            city: editFormDataBranch.city,
            province: editedValueProvince,
            gymId: editedValueGym,
            isActive: editedValueActive
        })
            .then((res) => {
                getBranch();
                getBranchToView();
                setNewBranchData(null);

                messages.addMessage({ title: 'Deleted', msg: 'Branch Updated Successfully', type: 'success' });

            })
            .catch((error) => {
                // console.log(error);

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

        setEditContctIdBranch(null);
        setOpenDialog(false);
    
    };
    const handleEditFormSubmitManager = () => {
        const link = '/api/branch/';
        const key = getBranchId;
        const url = link + key;
        if(getBranchIsActiveManager !== undefined && getBranchIsActiveManager === "false"){
            console.log(getBranchIsActiveManager);
            HttpCommon.get(`/api/user/removeAllStaffByBranchId/${getBranchId}`)
        }

        HttpCommon.put(url, {
            name: getBranchNameManager,
            street: getBranchStreetManager,
            lane: getBranchLaneManager,
            city: getBranchCityManager,
            province: getBranchProvinceManager,
            isActive: getBranchIsActiveManager
        })
            .then((res) => {
                setNewBranchData(null);

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Branch Updated Successfully',
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

      //  setBranchId(null);
        setOpenDialog(false);
    };

    // Handling edit click
    const handleEditClick = (event, row) => {
        event.preventDefault();
        setEditContctIdBranch(row.id);
        setOpenDialog(true);

        const formValues = {
            name: row.name,
            street: row.street,
            lane: row.lane,
            city: row.city,
            province: row.province,
            gymId: row.gymId,
            isActive: row.isActive
        };
        setEditFormDataBranch(formValues);
    };

    const handleClose = () => {
        setEditContctIdBranch(null);
        setOpenDialog(false);
    };

    const myRef = useRef(null);

     // Scroll to myRef view
     const executeScroll = () => {
        if(parseInt(branchCountToUser, 10) >= parseInt(getBranchCount, 10)){
            setShowAdd(true);
            Store.addNotification({
                title: 'Fail to add new gym! ',
                message: 'Your Branch count exceeded, Use new subscription',
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
        }else{
            setShowAdd(false);
            myRef.current.scrollIntoView();
        }
    };


    const handleEditGym = (event,newValue) => {
        setGymId(newValue.value);
        setEditedValueGym(newValue.value);
    }
   /* const getGymsPossible = () => {
        const link = '/api/gym/getAllGymByUserId/';
        const id = userId;
        const url = link+id;

        HttpCommon.get(url)
            .then((res) => {
                if(parseInt(branchCountToUser, 10) < parseInt(getBranchCount, 10)){
                     res.data.data.map((row) => possibleGymsArray.push({ label: row.name, value: row.id }));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getGymsPossible();
    },[getGymId,branchByGymData]) */

    return (
        <>
         {type === 'Admin' ? (
             <><MainCard title="Gym">
                    <div style={{ height: 10 }} />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, backgroundColor: '#f3e5f5' }} size="small" aria-label="a dense table">
                            <TableHead sx={{ backgroundColor: '#512da8' }}>
                                <TableRow>
                                <TableCell align="center" sx={{ color: 'white' }}>BranchName</TableCell>
                                            <TableCell align="center" sx={{ color: 'white' }}>Street</TableCell>
                                            <TableCell align="center" sx={{ color: 'white' }}>Lane</TableCell>
                                            <TableCell align="center" sx={{ color: 'white' }}>City</TableCell>
                                            <TableCell align="center" sx={{ color: 'white' }}>Province</TableCell>
                                            <TableCell align="center" sx={{ color: 'white' }}>isActive</TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {branchData != null ? (
                                    branchData.map((row) => (
                                        <React.Fragment key={row.id}>
                                            {editContactIdBranch === row.id ? (
                                                <Dialog />
                                            ) : (
                                                <ReadOnlyRowBranchAdmin row={row} />
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
            <></>
        )}
            {type === 'Manager' ? (
                <MainCard title="Branch">
                    <Button variant="contained" color="secondary" onClick={handleShowProfile}>
                            Show Branch
                        </Button>
                        <div style={{ height: 5 }} />

                     <TextField
                                required
                                fullWidth
                                value={getBranchNameManager}
                                onChange={(event, newValue) => {
                                    setBranchNameManager(event.target.value);
                                }}                                
                                label="Branch Name"
                                margin="dense"
                                name="name"
                                inputProps={{ maxLength: 255 }}
                            />
                            <TextField
                                required
                                fullWidth
                                value={getBranchStreetManager}
                                onChange={(event, newValue) => {
                                    setBranchStreetManager(event.target.value);
                                }}
                                label="Street"
                                margin="dense"
                                name="street"
                                inputProps={{ maxLength: 255 }}
                            />

                            <TextField
                                required
                                fullWidth
                                value={getBranchLaneManager}
                                onChange={(event, newValue) => {
                                    setBranchLaneManager(event.target.value);
                                }}
                                label="Lane"
                                margin="dense"
                                name="lane"
                                inputProps={{ maxLength: 255 }}
                            />

                            <TextField
                                required
                                fullWidth
                                value={getBranchCityManager}
                                onChange={(event, newValue) => {
                                    setBranchCityManager(event.target.value);
                                }}
                                label="City"
                                margin="dense"
                                name="city"
                                inputProps={{ maxLength: 255 }}
                            />
                             <Autocomplete
                                value={getBranchProvinceManager}
                                onChange={(event, newValue) => {
                                    setBranchProvinceManager(newValue);
                                }}
                                id="controllable-states-demo"
                                options={provinceArray}
                                renderInput={(params) => (
                                    <TextField {...params} label="Province" variant="outlined" fullWidth margin="dense" name="Province" />
                                )}
                            />
                            <Autocomplete
                                value={getBranchIsActiveManager}
                                onChange={(event, newValue) => {
                                    setBranchIsActiveManager(newValue);
                                }}
                                id="controllable-states-demo"
                                options={activeStatusArray}
                                renderInput={(params) => (
                                    <TextField {...params} label="isActive" variant="outlined" fullWidth margin="dense" name="isActive" />
                                )}
                            />
                             <Button
                            disableElevation
                            onClick={handleEditFormSubmitManager}
                            size="medium"
                            variant="contained"
                            color="secondary"
                        >
                            Save
                        </Button>
                   

                </MainCard>
            ) : (
                <></>
            )}
                {type === 'Owner' ? (
                    <><MainCard title="Branch">
                        <Stack direction="row" spacing={2}>
                            <Autocomplete
                                disablePortal
                                id="controllable-states-demo"
                                options={gymArray}
                                onChange={handleBranchDetails}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Select Gym" />} />
                            <Button variant="contained" onClick={getBranch} size="medium" color="secondary">
                                Search
                            </Button>
                        </Stack>
                    </MainCard><div style={{ height: 5 }} /><MainCard title="Add New Branch" hidden={showAddBranch}>
                            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        size="medium"
                                        variant="contained"
                                        color="secondary"
                                        onClick={executeScroll}
                                    >
                                        Add New Branch
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <div style={{ height: 10 }} />
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650, backgroundColor: '#f3e5f5' }} size="small" aria-label="a dense table">
                                    <TableHead sx={{ backgroundColor: '#512da8' }}>
                                        <TableRow>
                                            <TableCell align="center" sx={{ color: 'white' }}>BranchName</TableCell>
                                            <TableCell align="center" sx={{ color: 'white' }}>Street</TableCell>
                                            <TableCell align="center" sx={{ color: 'white' }}>Lane</TableCell>
                                            <TableCell align="center" sx={{ color: 'white' }}>City</TableCell>
                                            <TableCell align="center" sx={{ color: 'white' }}>Province</TableCell>
                                            <TableCell align="center" sx={{ color: 'white' }}>isActive</TableCell>

                                            <TableCell align="right" />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {branchByGymData != null ? (
                                            branchByGymData.map((row) => (
                                                <React.Fragment key={row.id}>
                                                    {editContactIdBranch === row.id ? (
                                                        <Dialog />
                                                    ) : (
                                                        <ReadOnlyRowBranch row={row} handleEditClick={handleEditClick} />
                                                    )}
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MainCard><div style={{ height: 10 }} /><MainCard title="Add New Branch" hidden={showAdd} ref={myRef}>
                            <TextField
                                required
                                fullWidth
                                value={getNameBranch}
                                onChange={handleBranchName}
                                label="Branch"
                                margin="dense"
                                name="name"
                                color="secondary" />
                            <TextField
                                required
                                fullWidth
                                value={getStreet}
                                onChange={handlestreet}
                                label="Street"
                                margin="dense"
                                name="street"
                                color="secondary" />
                            <TextField
                                required
                                fullWidth
                                value={getLane}
                                onChange={handleLane}
                                label="Lane"
                                margin="dense"
                                name="lane"
                                color="secondary" />
                            <TextField
                                required
                                fullWidth
                                value={getCity}
                                onChange={handleCity}
                                label="City"
                                margin="dense"
                                name="city"
                                color="secondary" />

                            <Autocomplete
                                required
                                id="controllable-states-demo"
                                value={proviceName}
                                onChange={handleProvince}
                                options={provinceArray}
                                renderInput={(params) => <TextField {...params} label="Province" variant="outlined" fullWidth margin="dense" name="province" />} />
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
                        </MainCard><Dialog open={openDialog} onClose={handleClose}>
                            <DialogTitle>Edit Branch</DialogTitle>
                            <DialogContent>
                                <TextField
                                    required
                                    fullWidth
                                    value={editFormDataBranch.name}
                                    onChange={handleEditFormChange}
                                    label="Branch Name"
                                    margin="dense"
                                    name="name"
                                    inputProps={{ maxLength: 255 }} />

                                <TextField
                                    required
                                    fullWidth
                                    value={editFormDataBranch.street}
                                    onChange={handleEditFormChange}
                                    label="Street"
                                    margin="dense"
                                    name="street"
                                    inputProps={{ maxLength: 255 }} />

                                <TextField
                                    required
                                    fullWidth
                                    value={editFormDataBranch.lane}
                                    onChange={handleEditFormChange}
                                    label="Lane"
                                    margin="dense"
                                    name="lane"
                                    inputProps={{ maxLength: 255 }} />

                                <TextField
                                    required
                                    fullWidth
                                    value={editFormDataBranch.city}
                                    onChange={handleEditFormChange}
                                    label="City"
                                    margin="dense"
                                    name="city"
                                    inputProps={{ maxLength: 255 }} />

                                <Autocomplete
                                    value={editFormDataBranch.province}
                                    onChange={(event, newValue) => {
                                        setEditedValueProvince(newValue);
                                    } }
                                    id="controllable-states-demo"
                                    options={provinceArray}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Province" variant="outlined" fullWidth margin="dense" name="Province" />
                                    )} />
                                <Autocomplete
                                    value={editFormDataBranch.isActive}
                                    onChange={(event, newValue) => {
                                        setEditedValueActive(newValue);
                                    } }
                                    id="controllable-states-demo"
                                    options={activeStatusArray}
                                    renderInput={(params) => (
                                        <TextField {...params} label="isActive" variant="outlined" fullWidth margin="dense" name="isActive" />
                                    )} />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleEditFormSubmit}>Save</Button>
                            </DialogActions>
                        </Dialog><div style={{ height: 50 }} /></>
            ):(
                <></>
            )}
            </>
    );
}

export default Branch;
