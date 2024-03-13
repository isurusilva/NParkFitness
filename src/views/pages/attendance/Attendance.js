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
    StepLable,
    Step,
    StepLabel,
    IconButton
} from '@material-ui/core';
import React, { useEffect, Fragment } from 'react';
import { Search, Edit, VisibilityOff } from '@material-ui/icons';
import MainCard from 'ui-component/cards/MainCard';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box } from '@material-ui/system';
import { Autocomplete, OutlinedInput, InputAdornment, Grid } from '@mui/material';
import HttpCommon from 'utils/http-common';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { gridSpacing } from 'store/constant';
import { styled } from '@mui/material/styles';
import { useTheme } from '@material-ui/core/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import messages from 'utils/messages';

const gymArray = [];
const steps = ['Sign Up', 'Personal Info', 'Contact Details'];

function Attendance() {
    const [selectedGymId, setSelectedGymId] = React.useState();
    const [branchId, setBranchId] = React.useState();
    const [employeeData, setEmployeeData] = React.useState([]);
    const [openViewMemberDialog, setViewMemberDialog] = React.useState(false);
    const [openAddNewMemberDialog, setOpenAddNewMemberDialog] = React.useState(false);

    const [employeeType, setEmployeeType] = React.useState('');

    const [branchArray, setBranchArray] = React.useState([]);
    const [editEmployeeId, setEditEmployeeId] = React.useState();
    const [attendItems, setAttendItems] = React.useState([]);

    const [startDate, setStartDate] = React.useState(new Date().toISOString().substring(0, 10));
    const [endDate, setEndDate] = React.useState(new Date().toISOString().substring(0, 10));
    const theme = useTheme();
    const userBranchId = 1;

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14
        }
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0
        }
    }));

    function getOwnerGyms() {
        const link = '/api/gym/getAllGymByUserId/';
        const key = localStorage.getItem('userID');
        const url = link + key;
        console.log(url);
        HttpCommon.get(url)
            .then((res) => {
                res.data.data.map((row) => gymArray.push({ label: row.name, value: row.id }));
                console.log(gymArray);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleGymSelect = (event, newValue) => {
        if (newValue !== null) {
            console.log(newValue.value);
            setSelectedGymId(newValue.value);

            const link = '/api/branch/getBranchByGymId/';
            const key = newValue.value;
            const url = link + key;
            console.log(url);
            HttpCommon.get(url)
                .then((res) => {
                    const tempArr = [];
                    res.data.data.forEach((element) => {
                        tempArr.push({ label: element.name, value: element.id });
                    });
                    setBranchArray(tempArr);
                    console.log(tempArr);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleBranchSelect = (event, newValue) => {
        if (newValue !== null) {
            setBranchId(newValue.value);
        }
    };

    const handleSearch = () => {
        console.log(branchId);
        console.log(startDate);
        console.log(endDate);
        HttpCommon.post('/api/attendance/getAllAttendanceByBranchAndDateRange', {
            startDate,
            branchId,
            endDate
        })
            .then((res) => {
                setEmployeeData(res.data.data);
                console.log(res.data.data);
                if (res.data.data.length < 1) {
                    messages.addMessage({ title: 'Error Occured!', msg: 'Attendance Not Found', type: 'danger' });
                }
            })
            .catch((err) => {
                console.log(err);
                messages.addMessage({ title: 'Error Occured!', msg: 'Attendance Cannot Found', type: 'danger' });
            });
    };

    const handleViewClick = (event, row) => {
        HttpCommon.get(`/api/attendItem/getAllAttendItemByAttendanceId/${row.id}`)
            .then((res) => {
                console.log(res.data.data);
                if (res.data.data !== [] && res.data.data !== undefined && res.data.data.length > 0) {
                    setAttendItems(res.data.data);
                    setViewMemberDialog(true);
                } else {
                    messages.addMessage({ title: 'Error Occured!', msg: 'Attend Details Not Found', type: 'danger' });
                }
            })
            .catch((err) => {
                console.log(err);
                messages.addMessage({ title: 'Error Occured!', msg: 'Attend Details Cannot Found', type: 'danger' });
            });
    };

    const handleCloseAddNewMember = () => {
        setOpenAddNewMemberDialog(false);
    };

    const handleCloseViewMember = () => {
        setViewMemberDialog(false);
    };

    useEffect(() => {
        if (userBranchId === undefined) {
            getOwnerGyms();
        } else {
            setBranchId(userBranchId);
        }
    }, []);

    return (
        <>
            <MainCard title="Attendance">
                <Grid container spacing={2}>
                    {userBranchId === undefined ? (
                        <>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={gymArray}
                                    onChange={handleGymSelect}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Gym" />}
                                />
                            </Grid>
                            <Grid align="center" item xs={6}>
                                {branchArray.length > 0 ? (
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo2"
                                        options={branchArray}
                                        onChange={handleBranchSelect}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Branch" />}
                                    />
                                ) : (
                                    <></>
                                )}
                            </Grid>
                        </>
                    ) : (
                        <></>
                    )}

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Grid item lg={6}>
                            <DesktopDatePicker
                                label="Start Date"
                                inputFormat="MM/dd/yyyy"
                                value={startDate}
                                sx={{ width: 600 }}
                                onChange={(newValue) => {
                                    setStartDate(newValue.toISOString().substring(0, 10));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item lg={6}>
                            <DesktopDatePicker
                                label="End Date"
                                inputFormat="MM/dd/yyyy"
                                value={endDate}
                                onChange={(newValue) => {
                                    setEndDate(newValue.toISOString().substring(0, 10));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    </LocalizationProvider>
                </Grid>

                <div style={{ height: 10 }} />

                <Button variant="contained" color="secondary" startIcon={<Search />} size="smaLL" onClick={handleSearch}>
                    Search
                </Button>

                <div style={{ height: 50 }} />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Attendance ID</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">In</TableCell>
                                <TableCell align="center">Out</TableCell>
                                <TableCell align="center">Member ID</TableCell>
                                <TableCell align="left" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeData != null ? (
                                employeeData.map((row) => <ReadOnlyRow row={row} handleViewClick={handleViewClick} />)
                            ) : (
                                <></>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>

            <Dialog open={openViewMemberDialog} onClose={handleCloseAddNewMember}>
                <DialogTitle>Attend Details</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>Owner can change only the type of member</DialogContentText> */}

                    <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                        <Grid align="center" item xs={12}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell style={{ marginLeft: '50px' }}>Activity</StyledTableCell>
                                            <StyledTableCell align="center">Repetitions</StyledTableCell>
                                            <StyledTableCell align="center">Set</StyledTableCell>
                                            <StyledTableCell align="center">Time (Seconds)</StyledTableCell>
                                            <StyledTableCell align="center">Done Percentage&nbsp;(%)</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {attendItems.map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell style={{ marginLeft: '50px' }} component="th" scope="row">
                                                    {row.scheduleItem.service.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{row.scheduleItem.noOfRepetition}</StyledTableCell>
                                                <StyledTableCell align="center">{row.scheduleItem.noOfSet}</StyledTableCell>
                                                <StyledTableCell align="center">{row.scheduleItem.timeBySeconds}</StyledTableCell>
                                                <StyledTableCell align="center">{row.donePercentage}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewMember}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

function ReadOnlyRow({ row, handleViewClick }) {
    const minutesToAdd = 330;
    const inDate = new Date(row.CreatedAt);
    const outDate = new Date(row.UpdatedAt);
    const futureinDate = new Date(inDate.getTime() + minutesToAdd * 60000);
    const futureOutDate = new Date(outDate.getTime() + minutesToAdd * 60000);
    return (
        <>
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{futureinDate.toISOString().slice(11, 16)}</TableCell>
                <TableCell align="center">{row.isTrue ? futureOutDate.toISOString().slice(11, 16) : 'Not Found'}</TableCell>
                <TableCell align="center">{row.membershipId}</TableCell>
                <TableCell align="center">
                    <AnimateButton>
                        <IconButton aria-label="edit" color="secondary" onClick={(event) => handleViewClick(event, row)}>
                            <VisibilityIcon />
                        </IconButton>
                    </AnimateButton>
                </TableCell>
            </TableRow>
        </>
    );
}

export default Attendance;
