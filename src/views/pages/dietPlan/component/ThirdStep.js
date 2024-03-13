import { TextField, Button, Box, InputLabel, Select, MenuItem, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import MuiPhoneNumber from 'material-ui-phone-number';
import { IconFileAnalytics } from '@tabler/icons';
// import { Box } from '@material-ui/core';
import { Avatar } from '@mui/material';
import { Store } from 'react-notifications-component';
import axios from 'axios';
import HttpCommon from 'utils/http-common';
import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';
import messages from 'utils/messages';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};
// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        paddingTop: '20px',
        background: 'white',
        marginTop: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        boxShadow: theme.shadows[3],
        position: 'relative',
        '&:hover': {
            boxShadow: theme.shadows[8]
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '1500px',
            height: '610px',
            background: `linear-gradient(275.9deg, ${theme.palette.secondary[800]} -50.02%, rgba(145, 107, 216, 0) 180.58%)`,
            borderRadius: '250%',
            top: '-530px',
            right: '-530px'
        }
    },
    mainCard: {
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        width: '21cm',
        margin: '0.5cm auto',
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '1500px',
            height: '610px',
            background: `linear-gradient(275.9deg, ${theme.palette.secondary[800]} -50.02%, rgba(145, 107, 216, 0) 180.58%)`,
            borderRadius: '250%',
            top: '-500px',
            right: '-350px'
        }
    },
    tagLine: {
        color: theme.palette.grey[900],
        opacity: 0.6
    },
    avatarFirst: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '20px',
        marginRight: '10px',
        height: '20px',
        width: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    avatarSecond: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: '20px',
        height: '8px',
        width: '8px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        color: theme.palette.white,
        backgroundColor: theme.palette.secondary.main,
        marginBottom: -10,
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}));

const calorieInstance = axios.create({
    baseURL: 'https://api.calorieninjas.com/v1',
    timeout: 10000,
    headers: { 'X-Api-Key': '6RwQbquEzm9YBP6n/M5AVA==Nv6Oh56eUK2Oc1lv' }
});

const ThirdStep = ({
    mealType,
    setMealType,
    portionType,
    setPortionType,
    items,
    setItems,
    amount,
    setAmount,
    selectedFoodData,
    setSelectedFoodData,
    memberId,
    getDietPlans,
    setOpenAddNewDietPlanDialog,
    setActiveStep
}) => {
    const classes = useStyles();
    console.log('selectedFoodData');
    console.log(selectedFoodData);
    const [isDataLoading, setDataLoading] = useState(false);

    const handleFoodChange = (index) => (event) => {
        const list = [...selectedFoodData];
        list[index].name = event.target.value;
        setSelectedFoodData(list);
    };

    const handleAmountChange = (index) => (event) => {
        const list = [...selectedFoodData];
        list[index].amount = event.target.value;
        setSelectedFoodData(list);
    };

    const handleCalorieChange = (index) => (event) => {
        const list = [...selectedFoodData];
        list[index].calorie = event.target.value;
        setSelectedFoodData(list);
    };

    const handleSave = async () => {
        console.log('Save');
        let isVaild = true;
        await Promise.all(
            selectedFoodData.map((element) => {
                if (
                    element.name === '' ||
                    element.name === ' ' ||
                    element.name === undefined ||
                    element.amount === '' ||
                    element.amount === 0 ||
                    element.amount < 0.5 ||
                    element.amount === undefined ||
                    element.calorie === '' ||
                    element.calorie === 0 ||
                    element.calorie < 0.5 ||
                    element.calorie === undefined
                ) {
                    isVaild = false;
                } else {
                    element.name = element.name.charAt(0).toUpperCase() + element.name.slice(1);
                }
                return 0;
            })
        );
        if (selectedFoodData.length > 0 && isVaild) {
            setDataLoading(true);

            HttpCommon.post(`/api/dietPlan/createDietAndMealItem`, {
                memberId,
                mealType,
                mealData: selectedFoodData
            }).then((response) => {
                console.log(response.data.data);
                if (response.data.success) {
                    getDietPlans();
                    setOpenAddNewDietPlanDialog(false);
                    setSelectedFoodData([]);
                    setItems([]);
                    setActiveStep(0);
                    setAmount();
                    setMealType('');
                    messages.addMessage({ title: 'Saved!', msg: 'Diet Plan Uploaded', type: 'success' });

                    // window.location.reload(false);
                } else {
                    messages.addMessage({ title: 'Error!', msg: 'Diet Plan Not Created', type: 'danger' });
                }
                setDataLoading(false);
            });
        } else {
            messages.addMessage({ title: 'Error!', msg: 'Please enter some food items', type: 'danger' });
        }
    };

    const handleRemove = (index) => (event) => {
        const list = [...selectedFoodData];
        list.splice(index, 1);
        setSelectedFoodData(list);
    };

    const handleAddClick = () => {
        setSelectedFoodData([...selectedFoodData, { name: '', amount: '', calorie: '' }]);
    };

    const handleVerify = (index) => (event) => {
        const list = [...selectedFoodData];
        console.log(list);
        console.log(list[index]);
        calorieInstance.get(`/nutrition?query=${list[index].amount} g ${list[index].name}`).then(async (response) => {
            console.log(response.data);
            if (response.data.items.length === 0) {
                messages.addMessage({ title: 'Error Occured!', msg: 'Enter Foods Cannot Find', type: 'danger' });

                // setIsLoading(false);
            } else {
                const list = [...selectedFoodData];
                list[index].calorie = response.data.items[0].calories;
                setSelectedFoodData(list);
            }
        });
    };

    // const handlechange = () => {
    //     console.log('Hello');
    // };

    return (
        <>
            {isDataLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            ) : (
                <div style={{ paddingLeft: 40, paddingRight: 40 }}>
                    <div style={{ height: 20 }} />
                    {selectedFoodData !== undefined ? (
                        <>
                            {selectedFoodData.map((element, index) => (
                                <>
                                    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                                        <Grid container justifyContent="center" alignItems="center" direction="row" spacing={1}>
                                            <Grid item sm={10} xs={10} md={4} lg={4}>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Avatar style={{ marginRight: 40 }} variant="rounded" className={classes.avatarFirst}>
                                                        <Avatar variant="rounded" className={classes.avatarSecond} />
                                                    </Avatar>
                                                    <TextField
                                                        style={{ marginRight: 40 }}
                                                        fullWidth
                                                        id="outlined-basic"
                                                        label="Food"
                                                        variant="outlined"
                                                        value={element.name.charAt(0).toUpperCase() + element.name.slice(1)}
                                                        onChange={handleFoodChange(index)}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item sm={12} xs={12} md={4} lg={4}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="Amount (g)"
                                                    type="number"
                                                    variant="outlined"
                                                    value={element.amount}
                                                    onChange={handleAmountChange(index)}
                                                />
                                            </Grid>
                                            <Grid item sm={12} xs={12} md={2} lg={2}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="Calorie (cal)"
                                                    type="number"
                                                    variant="outlined"
                                                    value={element.calorie}
                                                    onChange={handleCalorieChange(index)}
                                                />
                                            </Grid>
                                            <Grid item sm={12} xs={12} md={1} lg={1}>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={handleVerify(index)}
                                                    // disabled={disableSearch}
                                                >
                                                    Verify
                                                </Button>
                                            </Grid>
                                            <Grid item sm={12} xs={12} md={1} lg={1}>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={handleRemove(index)}
                                                    // disabled={disableSearch}
                                                >
                                                    Remove
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <div style={{ height: 40 }} />
                                </>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '60px' }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    onClick={handleAddClick}
                                    // disabled={disableSearch}
                                >
                                    Add Item
                                </Button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={handleSave}
                                    // disabled={disableSearch}
                                >
                                    Save Plan
                                </Button>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </>
    );
};

export default ThirdStep;
