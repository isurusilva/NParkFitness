import {
    Autocomplete,
    Button,
    IconButton,
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Search } from '@material-ui/icons';
import HttpCommon from 'utils/http-common';
import Paper from '@mui/material/Paper';
import { TableBody } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import { useNavigate } from 'react-router';
import messages from 'utils/messages';

const gymArray = [];

const Membership = () => {
    const [userType, setUserType] = useState();
    const [branchArray, setBranchArray] = useState([]);
    const [branchId, setBranchId] = useState();
    const [isDataAvailable, setIsDataAvailable] = useState(true);
    const [memberData, setMemberData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [memberId, setMemberId] = useState(null);
    const [membershipActivation, setMembershipActivation] = useState(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [viewMember, setViewMember] = useState({});
    const navigate = useNavigate();

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

    function getBranchMembers() {
        HttpCommon.get(`/api/user/${localStorage.getItem('userID')}`)
            .then((res) => {
                setBranchId(res.data.data.branchId);
                const link2 = '/api/membership/getAllMembershipByBranchId/';
                const key2 = res.data.data.branchId;
                const url2 = link2 + key2;
                HttpCommon.get(url2)
                    .then((res) => {
                        setIsDataAvailable(false);

                        setMemberData(res.data.data.memberData);
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
        if (localStorage.getItem('type') === 'Owner') {
            getGym();
        } else if (localStorage.getItem('type') === 'Manager' || localStorage.getItem('type') === 'Trainer') {
            getBranchMembers();
        } else if (localStorage.getItem('type') === 'Admin') {
            unauthorizedlogin();
        }
    }, []);

    const handleGymSelect = (event, newValue) => {
        if (newValue !== null) {
            const link = '/api/branch/getBranchByGymId/';
            const key = newValue.value;
            const url = link + key;
            HttpCommon.get(url)
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
        }
    };

    const handleSearch = () => {
        const link = '/api/membership/getAllMembershipByBranchId/';
        const key = branchId;
        const url = link + key;
        HttpCommon.get(url)
            .then((res) => {
                console.log(res.data.data.memberData);
                setIsDataAvailable(false);
                setMemberData(res.data.data.memberData);
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    };

    function checkDate(type, expDate) {
        const today = new Date();
        const weekBeforExpireDate = new Date(expDate);
        weekBeforExpireDate.setDate(weekBeforExpireDate.getDate() - 7);

        let isInBetween = false;
        if (type === 'Ex') {
            isInBetween = moment(today).isSameOrAfter(expDate);
        } else {
            isInBetween = moment(today).isBetween(weekBeforExpireDate, expDate);
        }

        return isInBetween;
    }

    const handleIsActiveSubmit = () => {
        const link = '/api/membership/';
        const url = link + memberId;
        HttpCommon.put(url, {
            isActive: !membershipActivation
        })
            .then((res) => {
                setDialogOpen(false);
                handleSearch();
            })
            .catch((error) => {
                messages.addMessage({ title: 'Fail !', msg: error, type: 'danger' });
            });

        setMemberId(null);
        setMembershipActivation(null);
    };

    const handleViewButtonClick = (event, row) => {
        setMemberId(row.id);
        setViewMember(row);
        setViewDialogOpen(true);
    };

    const handleButtonClick = (event, row) => {
        setMemberId(row.id);
        setMembershipActivation(row.isActive);
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setViewDialogOpen(false);
    };

    const handleShowProfile = () => {
        navigate('/pages/report/memberReport', { state: { memberid: memberId } });
    };

    return (
        <>
            {localStorage.getItem('type') === 'Owner' ? (
                <MainCard title="Members">
                    <Stack spacing={2}>
                        <Autocomplete
                            disablePortal
                            id="gyms"
                            options={gymArray}
                            onChange={handleGymSelect}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Gym" color="secondary" />}
                        />
                        <Autocomplete
                            disablePortal
                            id="branchs"
                            options={branchArray}
                            onChange={handleBranchSelect}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Branch" color="secondary" />}
                        />
                        <Stack direction="row">
                            <Button variant="contained" color="secondary" startIcon={<Search />} size="smaLL" onClick={handleSearch}>
                                Search
                            </Button>
                        </Stack>
                    </Stack>
                </MainCard>
            ) : (
                <></>
            )}

            <div style={{ height: 10 }} />
            <MainCard hidden={isDataAvailable} title="Members">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, backgroundColor: '#f3e5f5' }} arial-label="member table">
                        <TableHead sx={{ backgroundColor: '#512da8' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white' }}>Id</TableCell>
                                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>
                                    Expire Date
                                </TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>
                                    Contact No
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {memberData !== null ? (
                                memberData.map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.user.firstName.concat(' ', row.user.lastName)}
                                        </TableCell>
                                        {checkDate('Ex', row.expireDate) === true ? (
                                            <Tooltip title="Expierd" arrow>
                                                <TableCell align="center" sx={{ color: 'red' }}>
                                                    {row.expireDate.toString().slice(0, 10)}
                                                </TableCell>
                                            </Tooltip>
                                        ) : (
                                            <>
                                                {checkDate('Between', row.expireDate) === true ? (
                                                    <Tooltip title="Will Expire within a week" placement="bottom" arrow>
                                                        <TableCell align="center" sx={{ color: '#E7BF1E' }}>
                                                            {row.expireDate.toString().slice(0, 10)}
                                                        </TableCell>
                                                    </Tooltip>
                                                ) : (
                                                    <>
                                                        <TableCell align="center">{row.expireDate.toString().slice(0, 10)}</TableCell>
                                                    </>
                                                )}
                                            </>
                                        )}
                                        <TableCell align="center">{row.user.contactNo}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                aria-label="edit"
                                                color="secondary"
                                                size="large"
                                                onClick={(event) => handleViewButtonClick(event, row)}
                                            >
                                                <VisibilityIcon fontSize="inherit" />
                                            </IconButton>
                                            {userType !== 'Trainer' ? (
                                                <>
                                                    {row.isActive === true ? (
                                                        <Button
                                                            style={{ width: '75px' }}
                                                            variant="outlined"
                                                            size="small"
                                                            color="error"
                                                            onClick={(event) => handleButtonClick(event, row)}
                                                        >
                                                            Deactive
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            style={{ width: '75px' }}
                                                            variant="outlined"
                                                            size="small"
                                                            color="secondary"
                                                            onClick={(event) => handleButtonClick(event, row)}
                                                        >
                                                            Active
                                                        </Button>
                                                    )}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <></>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>
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
                    <Button onClick={handleIsActiveSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={viewDialogOpen} onClose={handleClose} fullWidth>
                <div>
                    <DialogTitle id="scroll-dialog-title">Member Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="scroll-dialog-description">
                            <Stack spacing={3}>
                                <Stack>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Name"
                                        type="text"
                                        value={
                                            viewMember.user !== undefined ? (
                                                viewMember.user.firstName.concat(' ', viewMember.user.lastName)
                                            ) : (
                                                <></>
                                            )
                                        }
                                        fullWidth
                                        variant="outlined"
                                        inputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Gender"
                                        type="text"
                                        value={viewMember.user !== undefined ? viewMember.user.gender : <></>}
                                        fullWidth
                                        variant="outlined"
                                        inputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Email"
                                        type="text"
                                        value={viewMember.user !== undefined ? viewMember.user.email : <></>}
                                        fullWidth
                                        variant="outlined"
                                        inputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Contact No"
                                        type="text"
                                        value={viewMember.user !== undefined ? viewMember.user.contactNo : <></>}
                                        fullWidth
                                        variant="outlined"
                                        inputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Address"
                                        type="text"
                                        value={
                                            viewMember.user !== undefined ? (
                                                viewMember.user.street.concat(', ', viewMember.user.lane, ', ', viewMember.user.city)
                                            ) : (
                                                <></>
                                            )
                                        }
                                        fullWidth
                                        variant="outlined"
                                        inputProps={{ readOnly: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Membership Description"
                                        type="text"
                                        value={viewMember.user !== undefined ? viewMember.membershipType.description : <></>}
                                        fullWidth
                                        variant="outlined"
                                        inputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Membership Duration"
                                        type="text"
                                        value={viewMember.user !== undefined ? viewMember.membershipType.periodInMonths : <></>}
                                        fullWidth
                                        variant="outlined"
                                        inputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Expire Date"
                                        type="text"
                                        value={viewMember.expireDate}
                                        fullWidth
                                        variant="outlined"
                                        inputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="TrainerNeeded"
                                        type="text"
                                        value={viewMember.trainerNeeded === true ? 'Yes' : 'No'}
                                        fullWidth
                                        variant="outlined"
                                        inputProps={{ readOnly: true }}
                                    />
                                </Stack>
                            </Stack>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleShowProfile}>Show Profile</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
};

export default Membership;
