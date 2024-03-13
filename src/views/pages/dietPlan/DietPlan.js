import { Button, Stack, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, Step, StepLabel, Stepper } from '@material-ui/core';
import { TextField, Avatar } from '@mui/material';
import { React, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Search } from '@material-ui/icons';
import HttpCommon from 'utils/http-common';
import DietPlanCard from './component/DietPlanCard';
import MemberReport from '../reports/member-report/MemberReport';
import { useNavigate } from 'react-router-dom';
import FirstStep from './component/FirstStep';
import SecondStep from './component/SecondStep';
import ThirdStep from './component/ThirdStep';
import { Box } from '@material-ui/system';
import { makeStyles } from '@material-ui/styles';
import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';
import { useTheme } from '@material-ui/core/styles';
import WeightDetails from '../reports/member-report/WeightDetails';
import WeightChart from './component/WeightChart';
import messages from 'utils/messages';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const dietPlanArray = [];
const steps = ['Food Items', 'Diet Plan Suggestions', 'Diet Plan Details'];
const useStyles = makeStyles((theme) => ({
    dialog: {
        width: 800
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
    }
}));
function DietPlan() {
    const classes = useStyles();
    const theme = useTheme();

    const [memberId, setMemberId] = useState();
    const [dietPlanData, setDietPlanData] = useState([]);
    const [consumedCal, setConsumedCal] = useState(0);
    const [burnedCal, setBurnedCal] = useState(0);
    const [weightloss, setWeightloss] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [disableSearch, setDisableSearch] = useState(true);
    const [openAddNewDietPlanDialog, setOpenAddNewDietPlanDialog] = useState(false);
    const [openWeightPrediction, setOpenWeightPrediction] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [items, setItems] = useState([]);
    const [selectedFoodData, setSelectedFoodData] = useState([]);
    const [amount, setAmount] = useState();
    const [mealType, setMealType] = useState('');
    const [portionType, setPortionType] = useState('');
    const [exerciseCount, setExerciseCount] = useState('');
    const [monthCount, setMonthCount] = useState('');
    const [weightData, setWeightData] = useState([]);
    const [bodyWeight, setBodyWeight] = useState(0);

    const navigate = useNavigate();

    const handleMemberId = (event) => {
        console.log(event.target.value);
        setDisableSearch(false);
        setMemberId(event.target.value);
    };

    const handleExerciseCount = (event) => {
        console.log(event.target.value);
        setExerciseCount(event.target.value);
    };

    const handleConsumedCal = (event) => {
        console.log(event.target.value);
        setConsumedCal(event.target.value);
    };

    const handleBurnedCal = (event) => {
        console.log(event.target.value);
        setBurnedCal(event.target.value);
    };

    const handlMonthCount = (event) => {
        console.log(event.target.value);
        setMonthCount(event.target.value);
    };

    function getDietPlans() {
        const link = '/api/dietPlan/getDietPlanAndMealByMemberId/';
        const key = memberId;
        const url = link + key;
        HttpCommon.get(url)
            .then((res) => {
                console.log(res);
                console.log(res.data.data);
                setDietPlanData(res.data.data);
                setShowButton(true);

                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }

    function getBodyDetails() {
        HttpCommon.get(`/api/bodyDetails/getLatestBodyDetailsByMemberId/${memberId}`)
            .then((res) => {
                console.log(res);
                console.log(res.data.data);
                if (res.data.data.bodyDetails !== undefined && res.data.data.bodyDetails !== null) {
                    setBodyWeight(parseFloat(res.data.data.bodyDetails.weight));
                }
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }

    function getBurnAndConsumedCalories() {
        HttpCommon.get(`/api/dietPlan/getCalorieConsumeAndBurnByMemberId/${memberId}`)
            .then((res) => {
                console.log(res);
                console.log(res.data.data);
                setConsumedCal(res.data.data.consumedCal);
                setBurnedCal(res.data.data.burnedCal);
                setShowButton(true);

                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }

    const handleSearch = () => {
        setIsLoading(true);
        getDietPlans();
        getBurnAndConsumedCalories();
        getBodyDetails();
    };

    const handleCalculate = () => {
        if (consumedCal !== '' && burnedCal !== '' && exerciseCount !== '' && monthCount !== '') {
            const tempWeightloss =
                (parseInt(consumedCal, 10) * 30 - parseInt(burnedCal, 10) * 4 * parseInt(exerciseCount, 10)) *
                parseInt(monthCount, 10) *
                0.00013;
            setWeightloss(tempWeightloss.toFixed(2));
            let count = 0;
            const tempWeightData = [];
            while (count <= parseInt(monthCount, 10)) {
                const tempWeightchange =
                    (parseInt(consumedCal, 10) * 30 - parseInt(burnedCal, 10) * 4 * parseInt(exerciseCount, 10)) * count * 0.00013;
                console.log(bodyWeight + tempWeightchange);
                tempWeightData.push(parseFloat((bodyWeight + tempWeightchange).toFixed(2)));
                count += 1;
            }
            setWeightData(tempWeightData);
        }
    };

    const handleShowProfile = () => {
        // <MemberReport memberid={2} />;
        navigate('/pages/report/memberReport', { state: { memberid: memberId } });
        // window.open(url, '_blank', 'noopener,noreferrer')
    };

    const handleAddNewDietPlan = () => {
        setOpenAddNewDietPlanDialog(true);
    };

    const handleWeightPrediction = () => {
        setOpenWeightPrediction(true);
    };
    const handleCloseWeightPrediction = () => {
        setOpenWeightPrediction(false);
    };

    const handleCloseAddNewDietPlan = () => {
        setOpenAddNewDietPlanDialog(false);
    };

    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = (foodItems) => {
        console.log('step up');
        console.log(foodItems);
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => {
            switch (prevActiveStep) {
                case 0:
                    if (
                        prevActiveStep === 0 &&
                        mealType !== null &&
                        amount !== undefined &&
                        amount !== '' &&
                        items !== null &&
                        items.length > 0
                    ) {
                        prevActiveStep += 1;
                    } else {
                        messages.addMessage({ title: 'Error Occured!', msg: 'Enter All Data', type: 'danger' });
                    }
                    break;

                case 1:
                    if (prevActiveStep === 1 && foodItems !== null && foodItems !== undefined && foodItems.length > 0) {
                        prevActiveStep += 1;
                    } else {
                        messages.addMessage({ title: 'Error Occured!', msg: 'Please Select A Diet Plan Suggestion', type: 'danger' });
                    }
                    break;

                default:
                    prevActiveStep += 1;
                    break;
            }

            return prevActiveStep;
        });
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function showStep(step) {
        switch (step) {
            case 0:
                return (
                    <FirstStep
                        mealType={mealType}
                        setMealType={setMealType}
                        portionType={portionType}
                        setPortionType={setPortionType}
                        items={items}
                        setItems={setItems}
                        amount={amount}
                        setAmount={setAmount}
                    />
                );
            case 1:
                return (
                    <SecondStep
                        mealType={mealType}
                        setMealType={setMealType}
                        portionType={portionType}
                        setPortionType={setPortionType}
                        items={items}
                        setItems={setItems}
                        amount={amount}
                        setAmount={setAmount}
                        dietPlanData={dietPlanData}
                        selectedFoodData={selectedFoodData}
                        setSelectedFoodData={setSelectedFoodData}
                        handleNext={handleNext}
                    />
                );
            case 2:
                return (
                    <ThirdStep
                        mealType={mealType}
                        setMealType={setMealType}
                        portionType={portionType}
                        setPortionType={setPortionType}
                        items={items}
                        setItems={setItems}
                        amount={amount}
                        setAmount={setAmount}
                        selectedFoodData={selectedFoodData}
                        setSelectedFoodData={setSelectedFoodData}
                        memberId={memberId}
                        getDietPlans={getDietPlans}
                        setOpenAddNewDietPlanDialog={setOpenAddNewDietPlanDialog}
                        setActiveStep={setActiveStep}
                    />
                );
            default:
                return <></>;
        }
    }

    return (
        <>
            <MainCard title="Diet Plan">
                <Stack spacing={3}>
                    <Stack direction="row" spacing={2}>
                        <TextField id="member-id" label="Enter Member ID" variant="outlined" onChange={handleMemberId} />
                        <Button
                            variant="contained"
                            color="secondary"
                            type="number"
                            startIcon={<Search />}
                            size="large"
                            onClick={handleSearch}
                            disabled={disableSearch}
                        >
                            Search
                        </Button>
                    </Stack>

                    {showButton ? (
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" color="secondary" sx={{ background: '#f3e5f5' }} onClick={handleShowProfile}>
                                Show Profile
                            </Button>
                            <Button variant="outlined" color="secondary" sx={{ background: '#f3e5f5' }} onClick={handleWeightPrediction}>
                                Weight Prediction
                            </Button>
                            <Button variant="outlined" color="secondary" sx={{ background: '#f3e5f5' }} onClick={handleAddNewDietPlan}>
                                Add New Diet Plan
                            </Button>
                        </Stack>
                    ) : (
                        <></>
                    )}
                </Stack>
                <Grid container spacing={2}>
                    {dietPlanData != null ? (
                        dietPlanData.map((row) => (
                            <Grid align="center" item xs={12} sm={12} md={6} lg={6}>
                                <DietPlanCard dietPlanData={row} />
                            </Grid>
                        ))
                    ) : (
                        <></>
                    )}
                </Grid>
            </MainCard>
            {isLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '500px',
                        width: '100%'
                    }}
                >
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            ) : (
                <></>
            )}
            <Dialog fullWidth maxWidth="xl" open={openAddNewDietPlanDialog} onClose={handleCloseAddNewDietPlan}>
                <DialogTitle>Add New Diet Plan</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: 'error.main' }}>Enter all * Requierd Data</DialogContentText>
                    <div style={{ height: 10 }} />
                    <Box sx={{ width: '100%' }}>
                        <Stepper
                            style={{ width: '100%', align: 'center' }}
                            activeStep={activeStep}
                            orientation="horizontal"
                            alternativeLabel
                        >
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <div style={{ height: 20 }} />
                        {showStep(activeStep)}
                        {activeStep === steps.length ? (
                            <></>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleNext}>{activeStep === steps.length - 1 ? '' : 'Next'}</Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </DialogContent>
            </Dialog>
            <Dialog fullWidth maxWidth="md" open={openWeightPrediction} onClose={handleCloseWeightPrediction}>
                <DialogTitle>Weight Prediction</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText sx={{ color: 'error.main' }}>Enter all * Requierd Data</DialogContentText> */}
                    <div style={{ height: 10 }} />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid container alignItems="center" justifyContent="center" spacing={2}>
                            <Grid item sm={12} xs={12} md={3} lg={3}>
                                <div style={{ display: 'flex', alignItems: 'left' }}>
                                    <Avatar variant="rounded" className={classes.avatarFirst}>
                                        <Avatar variant="rounded" className={classes.avatarSecond} />
                                    </Avatar>
                                    <div style={{ textAlign: 'left' }}>Calorie Consumption :</div>
                                </div>
                            </Grid>
                            <Grid item sm={12} xs={12} md={3} lg={3}>
                                <TextField
                                    fullWidth
                                    id="exercise-count"
                                    label="Calorie (kcal)"
                                    variant="outlined"
                                    defaultValue={consumedCal}
                                    onChange={handleConsumedCal}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12} md={3} lg={3}>
                                <div style={{ display: 'flex', alignItems: 'left' }}>
                                    <Avatar variant="rounded" className={classes.avatarFirst}>
                                        <Avatar variant="rounded" className={classes.avatarSecond} />
                                    </Avatar>
                                    <div style={{ textAlign: 'left' }}>Calorie Burning :</div>
                                </div>
                            </Grid>
                            <Grid item sm={12} xs={12} md={3} lg={3}>
                                <TextField
                                    fullWidth
                                    id="exercise-count"
                                    label="Calorie (kcal)"
                                    variant="outlined"
                                    defaultValue={burnedCal}
                                    onChange={handleBurnedCal}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12} md={3} lg={3}>
                                <div style={{ display: 'flex', alignItems: 'left' }}>
                                    <Avatar variant="rounded" className={classes.avatarFirst}>
                                        <Avatar variant="rounded" className={classes.avatarSecond} />
                                    </Avatar>
                                    <div style={{ textAlign: 'left' }}>Weekly Exercise Count :</div>
                                </div>
                            </Grid>
                            <Grid item sm={12} xs={12} md={3} lg={3}>
                                <TextField
                                    fullWidth
                                    id="exercise-count"
                                    label="Exercise Count"
                                    variant="outlined"
                                    onChange={handleExerciseCount}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12} md={3} lg={3}>
                                <div style={{ display: 'flex', alignItems: 'left' }}>
                                    <Avatar variant="rounded" className={classes.avatarFirst}>
                                        <Avatar variant="rounded" className={classes.avatarSecond} />
                                    </Avatar>
                                    <div style={{ textAlign: 'left' }}>Month Count :</div>
                                </div>
                            </Grid>
                            <Grid item sm={12} xs={12} md={3} lg={3}>
                                <TextField
                                    fullWidth
                                    id="month-count"
                                    label="Enter Month Count"
                                    variant="outlined"
                                    onChange={handlMonthCount}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                        {weightData !== undefined && weightData.length > 0 ? (
                            <WeightChart data={weightData} weightLoss={weightloss} />
                        ) : (
                            <></>
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                        <Button variant="outlined" color="secondary" sx={{ background: '#f3e5f5' }} onClick={handleCalculate}>
                            Calculate
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default DietPlan;
