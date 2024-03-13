import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Grid,
    TextField,
    Autocomplete,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import MainCard from 'ui-component/cards/MainCard';
import MuiAlert from '@mui/material/Alert';
import HttpCommon from 'utils/http-common';
import SubscriptionTypeCard from './component/SubscriptionTypeCard';
import { useNavigate } from 'react-router';
import messages from 'utils/messages';

/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const statusChoise = [
    { label: 'Active', value: 'true' },
    { label: 'Not Active', value: 'false' }
];
const choice = [
    { label: 'Available', value: 'true' },
    { label: 'Not Available', value: 'false' }
];

function SubscriptionType() {
    const [subscriptionData, setSubscriptionData] = useState([]);
    const [userType, setUserType] = useState();
    const [contacts, setContacts] = React.useState();
    const navigate = useNavigate();

    const [editFormData, setEditFormData] = React.useState({
        type: '',
        description: '',
        gymCount: '',
        branchCount: '',
        amount: '',
        isActive: '',
        isCalAvailable: '',
        isDietAvailable: ''
    });
    const [editContactId, setEditContctId] = React.useState(null);

    // Autocomplete data
    const [status, setStatus] = React.useState();
    const [caloriecal, setCaloriecal] = React.useState();
    const [dietPlan, setDietPlan] = React.useState();

    // Handle Dialog
    const [openDialog, setOpenDialog] = React.useState(false);

    function getSubscriptionTypes() {
        HttpCommon.get('/api/subscriptionType/')
            .then((res) => {
                setSubscriptionData(res.data.data);
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
            getSubscriptionTypes();
        } else {
            unauthorizedlogin();
        }
    }, []);
    // Handeling Data entering to text feilds in Add New Subscription Type
    const handlAddFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...contacts };
        newFormData[fieldName] = fieldValue;

        setContacts(newFormData);
    };

    // Handeling Data entering to text feilds in Edit Subscription Type
    const handleEditFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    // Send New Subscription Type data to server
    const handleAddFormSubmit = () => {
        HttpCommon.post('/api/subscriptionType/', {
            type: contacts.type,
            description: contacts.description,
            amount: contacts.amount,
            gymCount: contacts.gymCount,
            branchCount: contacts.branchCount,
            isActive: status,
            isCalAvailable: caloriecal,
            isDietAvailable: dietPlan
        })
            .then((res) => {
                getSubscriptionTypes();
                messages.addMessage({ title: 'Successfully Done!', msg: 'New Subscription Type Added Successfully', type: 'success' });
            })
            .catch((error) => {
                messages.addMessage({ title: 'Fail !', msg: 'Fill all required Data', type: 'danger' });
            });
    };

    // Send Edited Subscription Type data to server
    const handleEditFormSubmit = () => {
        const link = '/api/subscriptionType/';
        const key = editContactId;
        const url = link + key;
        HttpCommon.put(url, {
            type: editFormData.type,
            description: editFormData.description,
            amount: editFormData.amount,
            gymCount: editFormData.gymCount,
            branchCount: editFormData.branchCount,
            isActive: status,
            isCalAvailable: caloriecal,
            isDietAvailable: dietPlan
        })
            .then((res) => {
                getSubscriptionTypes();
                messages.addMessage({ title: 'Successfully Done!', msg: 'Subscription Type Edited Successfully', type: 'success' });
            })
            .catch((error) => {
                messages.addMessage({ title: 'Fail !', msg: error, type: 'danger' });
            });

        setEditContctId(null);
        setOpenDialog(false);
    };

    // Handling edit click
    const handleEditClick = (event, row) => {
        setEditContctId(row.id);
        setOpenDialog(true);

        const formValues = {
            type: row.type,
            description: row.description,
            gymCount: row.gymCount,
            branchCount: row.branchCount,
            amount: row.amount
        };

        setEditFormData(formValues);
        setStatus(row.isActive);
        setCaloriecal(row.isCalAvailable);
        setDietPlan(row.isDietAvailable);
    };

    const handleClose = () => {
        setEditContctId(null);
        setOpenDialog(false);
    };

    const handleStatus = (event, value) => {
        setStatus(value.value);
    };

    const handleCalorieCal = (event, value) => {
        setCaloriecal(value.value);
    };

    const handleDietPlan = (event, value) => {
        setDietPlan(value.value);
    };

    // Create and get my reference in Add New Subscription type
    const myRef = useRef(null);

    // Scroll to myRef view
    const executeScroll = () => {
        myRef.current.scrollIntoView();
    };

    return (
        <>
            <MainCard title="Subscription Types">
                <Grid container spacing={2}>
                    {subscriptionData != null ? (
                        subscriptionData.map((row) => (
                            <React.Fragment key={row.id}>
                                {editContactId === row.id ? (
                                    <Dialog />
                                ) : (
                                    <Grid align="center" item xs={12} sm={6} md={6} lg={4}>
                                        <SubscriptionTypeCard
                                            row={row}
                                            handleEditClick={handleEditClick}
                                            getSubscriptionTypes={getSubscriptionTypes}
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

            <div style={{ height: 10 }} />

            <MainCard ref={myRef} title="Add New Type">
                <TextField
                    required
                    fullWidth
                    onChange={handlAddFormChange}
                    label="Type"
                    margin="dense"
                    name="type"
                    inputProps={{ maxLength: 255 }}
                />
                <TextField
                    required
                    fullWidth
                    onChange={handlAddFormChange}
                    label="Description"
                    multiline
                    rows={3}
                    margin="dense"
                    name="description"
                    inputProps={{ maxLength: 255 }}
                />
                <TextField
                    required
                    fullWidth
                    onChange={handlAddFormChange}
                    label="Gym Count"
                    margin="dense"
                    name="gymCount"
                    type="number"
                />
                <TextField
                    required
                    fullWidth
                    onChange={handlAddFormChange}
                    label="Branch Count"
                    margin="dense"
                    name="branchCount"
                    type="number"
                />
                <TextField required fullWidth onChange={handlAddFormChange} label="Amount" margin="dense" name="amount" type="number" />
                <Autocomplete
                    required
                    disablePortal
                    id="combo-box-demo"
                    onChange={handleStatus}
                    options={statusChoise}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Status" variant="outlined" fullWidth margin="dense" name="isActive" />
                    )}
                />

                <Autocomplete
                    required
                    disablePortal
                    id="combo-box-demo"
                    onChange={handleCalorieCal}
                    options={choice}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Calorie Calculator"
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            name="isCalAvailable"
                        />
                    )}
                />

                <Autocomplete
                    required
                    disablePortal
                    id="combo-box-demo"
                    onChange={handleDietPlan}
                    options={choice}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Diet Plan" variant="outlined" fullWidth margin="dense" name="isDietAvailable" />
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
                            disabled={!contacts}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </MainCard>

            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Edit Subscription Type</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter all * Requierd Data</DialogContentText>
                    <TextField
                        required
                        fullWidth
                        value={editFormData.type}
                        onChange={handleEditFormChange}
                        label="Type"
                        margin="dense"
                        name="type"
                        inputProps={{ maxLength: 255 }}
                    />
                    <TextField
                        required
                        fullWidth
                        value={editFormData.description}
                        onChange={handleEditFormChange}
                        label="Description"
                        multiline
                        rows={3}
                        margin="dense"
                        name="description"
                        inputProps={{ maxLength: 255 }}
                    />
                    <TextField
                        required
                        fullWidth
                        value={editFormData.gymCount}
                        onChange={handleEditFormChange}
                        label="Gym Count"
                        margin="dense"
                        name="gymCount"
                        type="number"
                    />
                    <TextField
                        required
                        fullWidth
                        value={editFormData.branchCount}
                        onChange={handleEditFormChange}
                        label="Branch Count"
                        margin="dense"
                        name="branchCount"
                        type="number"
                    />
                    <TextField
                        required
                        fullWidth
                        value={editFormData.amount}
                        onChange={handleEditFormChange}
                        label="Amount"
                        margin="dense"
                        name="amount"
                        type="number"
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        defaultValue={status ? statusChoise[0] : statusChoise[1]}
                        onChange={handleStatus}
                        options={statusChoise}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Status" variant="outlined" fullWidth margin="dense" name="isActive" />
                        )}
                    />

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        onChange={handleCalorieCal}
                        defaultValue={caloriecal ? choice[0] : choice[1]}
                        options={choice}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Calorie Calculator"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                name="isCalAvailable"
                            />
                        )}
                    />

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        defaultValue={dietPlan ? choice[0] : choice[1]}
                        onChange={handleDietPlan}
                        options={choice}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Diet Plan" variant="outlined" fullWidth margin="dense" name="isDietAvailable" />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEditFormSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
            <div style={{ height: 50 }} />
        </>
    );
}

export default SubscriptionType;
