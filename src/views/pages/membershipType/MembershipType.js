import { Button, Dialog, Grid, Stack, Autocomplete, TextField, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import HttpCommon from 'utils/http-common';
import { Search } from '@material-ui/icons';
import MembershipTypeCard from './component/MembershipTypeCard';
import { useNavigate } from 'react-router';
import messages from 'utils/messages';
import MainCard from 'ui-component/cards/MainCard';

const gyms = [];
const statusChoise = [
    { label: 'Active', value: 'true' },
    { label: 'Not Active', value: 'false' }
];
const MembershipType = () => {
    const [userType, setUserType] = useState();
    const [gymId, setGymId] = useState();
    const [membershipTypeData, setMembershipTypeData] = useState([]);
    const [editMembershipId, setEditMembershipId] = useState(null);
    const [formData, setFormData] = useState();
    const [editFormData, setEditFormData] = useState({
        type: '',
        description: '',
        periodInMonths: '',
        amount: ''
    });
    const [status, setStatus] = useState();
    const [addNewMembershipTypeDialog, setAddNewMembershipTypeDialog] = useState(false);
    const [editMembershipTypeDialog, setEditMembershipTypeDialog] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);
    const [searchButtonDisable, setSearchButtonDisable] = useState(true);
    const navigate = useNavigate();

    function getGym() {
        gyms.length = 0;
        HttpCommon.get(`/api/gym/getAllGymByUserId/${localStorage.getItem('userID')}`).then((res) => {
            res.data.data.map((row) => gyms.push({ label: row.name, value: row.id }));
        });
    }

    function showDataToManager() {
        HttpCommon.get(`/api/user/${localStorage.getItem('userID')}`)
            .then((res) => {
                HttpCommon.get(`/api/branch/${res.data.data.branchId}`)
                    .then((res) => {
                        HttpCommon.get(`/api/membershipType/getMembershipTypeByGymId/${res.data.data.gymId}`)
                            .then((res) => {
                                console.log(res);
                                console.log(res.data.data.membershipType);
                                setMembershipTypeData(res.data.data.membershipType);
                                setShowAddButton(true);
                            })
                            .catch((err) => {
                                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
                            });
                    })
                    .catch((err) => {
                        messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
                    });
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    }

    function unauthorizedlogin() {
        localStorage.clear();
        navigate('/', { replace: true });
    }

    useEffect(() => {
        setUserType(localStorage.getItem('type'));
        if (localStorage.getItem('type') === 'Admin') {
            unauthorizedlogin();
        } else if (localStorage.getItem('type') === 'Owner') {
            getGym();
        } else if (localStorage.getItem('type') === 'Manager') {
            showDataToManager();
        } else if (localStorage.getItem('type') === 'Trainer') {
            unauthorizedlogin();
        }
    }, []);

    const handleGymSelect = (event, newValue) => {
        if (newValue !== null) {
            console.log(newValue);
            setGymId(newValue.value);
            setSearchButtonDisable(false);
        }
    };

    const handleSearch = () => {
        console.log(gymId);
        HttpCommon.get(`/api/membershipType/getMembershipTypeByGymId/${gymId}`)
            .then((res) => {
                console.log(res);
                console.log(res.data.data.membershipType);
                setMembershipTypeData(res.data.data.membershipType);
                setShowAddButton(true);
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    };

    const handlAddFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...formData };
        newFormData[fieldName] = fieldValue;
        setFormData(newFormData);
    };

    const handleStatusChange = (event, newValue) => {
        setStatus(newValue.value);
    };

    const handleAddClick = () => {
        const url = '/api/membershipType/';
        HttpCommon.post(url, {
            type: formData.membershipType,
            description: formData.description,
            isActive: status,
            amount: formData.amount,
            periodInMonths: formData.duration,
            gymId
        })
            .then(() => {
                if (userType === 'Owner') {
                    handleSearch();
                } else if (userType === 'Manager') {
                    showDataToManager();
                }
                setAddNewMembershipTypeDialog(false);
                messages.addMessage({ title: 'Successfully Added!', msg: 'New membership type added to the data base.', type: 'success' });
            })
            .catch((err) => {
                messages.addMessage({ title: 'fail !', msg: err, type: 'danger' });
            });
    };

    const handleEditClick = (event, row) => {
        setEditMembershipId(row.id);
        setEditMembershipTypeDialog(true);

        const formValues = {
            type: row.type,
            description: row.description,
            periodInMonths: row.periodInMonths,
            amount: row.amount
        };

        setStatus(row.isActive);
        setEditFormData(formValues);
    };
    const handleEditFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleEditSubmitClick = () => {
        HttpCommon.put(`/api/membershipType/${editMembershipId}`, {
            type: editFormData.type,
            description: editFormData.description,
            isActive: status,
            periodInMonths: editFormData.periodInMonths,
            amount: editFormData.amount,
            gymId
        })
            .then((res) => {
                handleSearch();
                console.log(res);
                messages.addMessage({ title: 'Successfully Done!', msg: 'Membership Type Edited Successfully', type: 'success' });
            })
            .catch((error) => {
                messages.addMessage({ title: 'Fail !', msg: error, type: 'danger' });
            });

        setEditMembershipId(null);
        setEditMembershipTypeDialog(false);
    };

    const handleAddMembershipTypeButton = () => {
        setAddNewMembershipTypeDialog(true);
    };
    const handleCloseDialog = () => {
        setEditMembershipId(null);
        setAddNewMembershipTypeDialog(false);
        setEditMembershipTypeDialog(false);
    };
    const handleType = (event, newValue) => {
        setFormData.type(newValue);
    };
    const handledescription = (event, newValue) => {
        setFormData.description(newValue);
    };
    const handleDuration = (event, newValue) => {
        setFormData.periodInMonths(newValue);
    };
    const handleAmount = (event, newValue) => {
        setFormData.amount(newValue);
    };

    return (
        <>
            <MainCard title="Membership Types">
                {userType === 'Owner' ? (
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <Autocomplete
                                disablePortal
                                id="gyms"
                                options={gyms}
                                onChange={handleGymSelect}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Gym" color="secondary" />}
                            />
                            <Button
                                size="medium"
                                variant="contained"
                                color="secondary"
                                startIcon={<Search />}
                                onClick={handleSearch}
                                disabled={searchButtonDisable}
                            >
                                Search
                            </Button>
                        </Stack>
                        {showAddButton === true ? (
                            <Grid container justifyContent="flex-end">
                                <Button size="medium" variant="contained" color="secondary" onClick={handleAddMembershipTypeButton}>
                                    Add New Membership Type
                                </Button>
                            </Grid>
                        ) : (
                            <></>
                        )}
                    </Stack>
                ) : (
                    <></>
                )}
                <div style={{ height: 10 }} />
                <Grid container spacing={2}>
                    {membershipTypeData !== null ? (
                        membershipTypeData.map((row) => (
                            <React.Fragment key={row.id}>
                                {editMembershipId === row.id ? (
                                    <Dialog />
                                ) : (
                                    <Grid align="center" item xs={12} sm={6} md={6} lg={4}>
                                        <MembershipTypeCard
                                            row={row}
                                            handleEditClick={handleEditClick}
                                            userType={userType}
                                            handleSearch={handleSearch}
                                        />
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <></>
                    )}
                </Grid>
            </MainCard>

            <Dialog open={addNewMembershipTypeDialog} onClose={handleCloseDialog}>
                <DialogTitle>Membership Type Details</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        label="Membership Type"
                        margin="dense"
                        name="membershipType"
                        onChange={handlAddFormChange}
                        inputProps={{ maxLength: 255 }}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Description"
                        margin="dense"
                        name="description"
                        onChange={handlAddFormChange}
                        inputProps={{ maxLength: 255 }}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Duration in Months"
                        margin="dense"
                        name="duration"
                        onChange={handlAddFormChange}
                        type="number"
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        onChange={handleStatusChange}
                        options={statusChoise}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Status" variant="outlined" fullWidth margin="dense" name="status" />
                        )}
                    />
                    <TextField required fullWidth label="Amount" margin="dense" name="amount" onChange={handlAddFormChange} type="number" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleAddClick}>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={editMembershipTypeDialog} onClose={handleCloseDialog}>
                <DialogTitle>Membership Type Details</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        label="Type"
                        value={editFormData.type}
                        margin="dense"
                        name="type"
                        onChange={handleEditFormChange}
                        inputProps={{ maxLength: 255 }}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Description"
                        value={editFormData.description}
                        margin="dense"
                        name="description"
                        onChange={handleEditFormChange}
                        inputProps={{ maxLength: 255 }}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Duration in Months"
                        value={editFormData.periodInMonths}
                        margin="dense"
                        name="periodInMonths"
                        onChange={handleEditFormChange}
                        type="number"
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        defaultValue={status ? statusChoise[0] : statusChoise[1]}
                        onChange={handleStatusChange}
                        options={statusChoise}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Status" variant="outlined" fullWidth margin="dense" name="status" />
                        )}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Amount"
                        value={editFormData.amount}
                        margin="dense"
                        name="amount"
                        onChange={handleEditFormChange}
                        type="number"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleEditSubmitClick}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default MembershipType;
