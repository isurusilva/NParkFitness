import React from 'react';
import { Button, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const SecondStep = ({ firstName, lastName, birthday, genderValue, setFirstName, setLastName, setBirthday, setGenderValue }) => {
    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastName = (event) => {
        setLastName(event.target.value);
    };
    const handleGender = (event) => {
        setGenderValue(event.target.value);
    };
    return (
        <div>
            <TextField
                required
                fullWidth
                value={firstName}
                onChange={handleFirstName}
                label="First Name"
                margin="dense"
                name="firstName"
                inputProps={{ maxLength: 255 }}
            />
            <TextField
                required
                fullWidth
                value={lastName}
                onChange={handleLastName}
                label="Last Name"
                margin="dense"
                name="lastName"
                inputProps={{ maxLength: 255 }}
            />
            <div style={{ height: 10 }} />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    required
                    label="Birthday"
                    value={birthday}
                    onChange={(newValue) => {
                        setBirthday(newValue.toLocaleDateString('en-CA'));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            <div style={{ height: 10 }} />

            <FormControl>
                <FormLabel id="gender">Gender</FormLabel>
                <RadioGroup row value={genderValue} onChange={handleGender}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default SecondStep;
