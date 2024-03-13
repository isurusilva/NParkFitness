import React, { useState } from 'react';
import { Button, TextField, Stack, Grid, Box, Autocomplete } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
// import Chip from './Chip';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Label } from '@material-ui/icons';
import { Chip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import messages from 'utils/messages';

const FirstStep = ({ mealType, setMealType, items, setItems, amount, setAmount }) => {
    const [foodItem, setFoodItem] = useState();
    const [portionType, setPortionType] = useState('');

    // const [items, setItems] = useState([]);
    // const [amount, SetAmount] = useState();

    const handleDelete = (chipToDelete) => {
        setItems((items) => items.filter((chip) => chip.foodItem !== chipToDelete));
    };

    const handleAdd = () => {
        console.log(foodItem);
        if (foodItem !== undefined && foodItem !== '' && portionType !== null && portionType !== '') {
            const arr = items;
            arr.push({ foodItem, portionType });
            setItems(arr);
            // setItems([
            //     ...items,
            //     {
            //         foodItem
            //     }
            // ]);
            console.log(arr);
            setFoodItem('');
            setPortionType(null);
            console.log(items);
            console.log(foodItem);
        } else {
            messages.addMessage({ title: 'Error Occured!', msg: 'Enter All Data', type: 'danger' });
        }
    };

    const handleMealType = (event) => {
        console.log(event.target.value);
        setMealType(event.target.value);
    };

    const handlePortionType = (event) => {
        console.log(event.target.value);
        setPortionType(event.target.value);
    };

    const handleFoodItem = (event) => {
        console.log(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
        setFoodItem(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
    };

    const handleAmount = (event) => {
        console.log(event.target.value);
        setAmount(event.target.value);
    };

    return (
        <div>
            <div style={{ height: 10 }} />
            <Stack spacing={3} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                    <div style={{ height: '20px' }} />
                    <Grid item sm={12} xs={12} md={6} lg={2}>
                        <div style={{ textAlign: 'left' }}>Meal Type :</div>
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={4}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="meal-type-select-label">Meal Type</InputLabel>
                                <Select
                                    labelId="meal-type-select-label"
                                    id="meal-type-select"
                                    value={mealType}
                                    label="Meal Type"
                                    onChange={handleMealType}
                                >
                                    <MenuItem value="Breakfast">Breakfast</MenuItem>
                                    <MenuItem value="Lunch">Lunch</MenuItem>
                                    <MenuItem value="Dinner">Dinner</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={2}>
                        <div style={{ textAlign: 'left' }}>Calorie Amount for the Meal :</div>
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={4}>
                        <TextField
                            fullWidth
                            id="calories"
                            type="number"
                            label="Amount (cal)"
                            defaultValue={amount}
                            variant="outlined"
                            onChange={handleAmount}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={4}>
                        <TextField fullWidth id="food" label="Food Item" value={foodItem} variant="outlined" onChange={handleFoodItem} />
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={4}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="meal-type-select-label">Portion</InputLabel>
                                <Select
                                    labelId="meal-type-select-label"
                                    id="meal-type-select"
                                    value={portionType}
                                    label="Portion"
                                    onChange={handlePortionType}
                                >
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={4}>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<AddIcon />}
                            size="large"
                            onClick={handleAdd}
                            // disabled={disableSearch}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {items.length > 0 ? (
                        <Stack direction="row" spacing={1}>
                            {/* <Chip label={data} color="primary" size="small" onDelete={handleDelete} /> */}
                            {items.map((item) => (
                                <Chip
                                    color="secondary"
                                    key={item.foodItem}
                                    label={`${item.foodItem} - ${item.portionType}`}
                                    onDelete={() => handleDelete(item.foodItem)}
                                />
                            ))}
                        </Stack>
                    ) : (
                        <></>
                    )}
                </Grid>
            </Stack>
        </div>
    );
};

export default FirstStep;
