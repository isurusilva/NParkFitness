import { TextField, Button, Box, InputLabel, Select, MenuItem } from '@material-ui/core';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import MuiPhoneNumber from 'material-ui-phone-number';
// import { Box } from '@material-ui/core';

const ThirdStep = ({ contactNo, street, lane, city, province, setContactNo, setStreet, setLane, setCity, setProvince }) => {
    const handleContactNo = (event) => {
        setContactNo(event.target.value);
    };
    const handleStreet = (event) => {
        setStreet(event.target.value);
    };
    const handleLane = (event) => {
        setLane(event.target.value);
    };
    const handleCity = (event) => {
        setCity(event.target.value);
    };
    const handlePrivince = (event) => {
        setProvince(event.target.value);
    };
    return (
        <div>
            <div style={{ height: 15 }} />
            {/* <MuiPhoneNumber
                defaultCountry="lk"
                value={contactNo}
                onChange={handleContactNo}
                variant="outlined"
                label="Contact No"
                required
                inputProps={{ maxLength: 12 }}
            /> */}
            <TextField
                required
                fullWidth
                value={contactNo}
                onChange={handleContactNo}
                label="Contact No"
                margin="dense"
                name="contactNo"
                // inputProps={{ maxLength: 255 }}
            />
            <TextField
                required
                fullWidth
                value={street}
                onChange={handleStreet}
                label="Street"
                margin="dense"
                name="street"
                inputProps={{ maxLength: 255 }}
            />
            <TextField
                required
                fullWidth
                value={lane}
                onChange={handleLane}
                label="Lane"
                margin="dense"
                name="lane"
                inputProps={{ maxLength: 255 }}
            />
            <TextField
                required
                fullWidth
                value={city}
                onChange={handleCity}
                label="City"
                margin="dense"
                name="city"
                inputProps={{ maxLength: 255 }}
            />
            <div style={{ height: 7 }} />
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="province-lable" required>
                        Province
                    </InputLabel>
                    <Select
                        labelId="province-lable"
                        id="province-select"
                        label="Province**"
                        value={province}
                        onChange={handlePrivince}
                        required
                    >
                        <MenuItem value="Central">Central</MenuItem>
                        <MenuItem value="Eastern">Eastern</MenuItem>
                        <MenuItem value="North Central">North Central</MenuItem>
                        <MenuItem value="Northern">Northern</MenuItem>
                        <MenuItem value="North Western">North Western</MenuItem>
                        <MenuItem value="Sabaragamuwa">Sabaragamuwa</MenuItem>
                        <MenuItem value="Southern">Southern</MenuItem>
                        <MenuItem value="Uva">Uva</MenuItem>
                        <MenuItem value="Western">Western</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
};

export default ThirdStep;
