import React from 'react';
import { Button, TextField, Box, Select, MenuItem } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const FirstStep = ({
    userType,
    setEmail,
    setPassword,
    setConfirmPassword,
    setEmployeeType,
    email,
    password,
    confirmPassword,
    employeeType
}) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEmployeeType = (event) => {
        setEmployeeType(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: '52ch' }} variant="outlined">
                <TextField
                    required
                    fullWidth
                    value={email}
                    onChange={handleEmail}
                    label="Email"
                    margin="dense"
                    name="email"
                    inputProps={{ maxLength: 255 }}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePassword}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Confirm Password"
                />
            </FormControl>
            {/* {userType !== 'Owner' ? (
                <FormControl sx={{ m: 1, width: '25ch' }}>
                    <InputLabel id="type-select-lable" required>
                        Type
                    </InputLabel>
                    <Select labelId="type-select-lable" id="type-select" value={employeeType} label="Type**" onChange={handleEmployeeType}>
                        {userType === 'Admin' ? (
                            <MenuItem value="Admin">Admin</MenuItem>
                        ) : (
                            <>
                                {userType === 'Manager' ? (
                                    <MenuItem value="Trainer">Trainer</MenuItem>
                                ) : (
                                    <>
                                        <MenuItem value="Manager">Manager</MenuItem>
                                        <MenuItem value="Trainer">Trainer</MenuItem>
                                    </>
                                )}
                            </>
                        )}
                    </Select>
                </FormControl>
            ) : (
                <></>
            )} */}
        </div>
    );
};

export default FirstStep;
