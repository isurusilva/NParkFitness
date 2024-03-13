import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

// material-ui
import { makeStyles, useTheme, withStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Card,
    Grid,
    TextField,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    useMediaQuery
} from '@material-ui/core';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import MuiTypography from '@material-ui/core/Typography';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import MapIcon from '@mui/icons-material/Map';

import { purple, grey } from '@mui/material/colors';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

import {
    IconBrandTinder,
    IconToolsKitchen2,
    IconListCheck,
    IconBellRinging,
    IconPhoneCall,
    IconCash,
    IconBuildingCommunity,
    IconBrandCodesandbox,
    IconBuildingArch,
    IconUsers,
    IconReportAnalytics,
    IconReceipt,
    IconFlame,
    IconDroplet,
    IconEgg
} from '@tabler/icons';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import HttpCommon from 'utils/http-common';
import { useNavigate } from 'react-router-dom';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Store } from 'react-notifications-component';

import { getDatabase, ref, onValue } from 'firebase/database';
import axios from 'axios';

import Vegetable from 'assets/images/broccoli.png';
import Wheat from 'assets/images/wheat.png';
import Banana from 'assets/images/banana.png';
import Salt from 'assets/images/salt.png';
import Protein from 'assets/images/protein.png';
import Fire from 'assets/images/fire.png';
import Fat from 'assets/images/trans-fat.png';
import Sugar from 'assets/images/sugar.png';
import Bad from 'assets/images/bad.png';

import Chart from 'react-apexcharts';

import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';
import messages from 'utils/messages';
//= =============================|| SAMPLE PAGE ||==============================//
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const useStyles = makeStyles((theme) => ({
    card: {
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(210.04deg, ${theme.palette.primary.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
            borderRadius: '50%',
            top: '-30px',
            right: '-120px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(140.9deg, ${theme.palette.primary.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
            borderRadius: '50%',
            top: '-160px',
            right: '-60px'
        }
    },
    content: {
        padding: '16px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '20px',
        marginRight: '10px',
        height: '25px',
        width: '25px',
        padding: '2px'
        // border: '2px solid',
        // borderColor: theme.palette.secondary.dark
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
    secondary: {
        color: theme.palette.grey[500]
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    },
    listChipError: {
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        height: '24px',
        padding: '0 6px',
        marginRight: '5px'
    },
    listChipWarning: {
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.secondary.light,
        height: '24px',
        padding: '0 6px'
    },
    listChipSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: '24px',
        padding: '0 6px'
    },
    listChipDefault: {
        color: theme.palette.grey[500],
        backgroundColor: theme.palette.grey[200],
        height: '24px',
        padding: '0 6px'
    }
}));

const CalorieCalculator = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    // const classes = useStyles();
    const [plan, setPlan] = React.useState('');
    const [calorieData, setCalorieData] = React.useState();
    const [analizeData, setAnalizeData] = React.useState();
    const [pieChartData, setPieChartData] = React.useState([44, 55, 41, 17, 15]);
    const [searchText, setSearchText] = React.useState();
    const [isDataLoading, setDataLoading] = React.useState(false);

    const calorieInstance = axios.create({
        baseURL: 'https://api.calorieninjas.com/v1',
        timeout: 10000,
        headers: { 'X-Api-Key': '6RwQbquEzm9YBP6n/M5AVA==Nv6Oh56eUK2Oc1lv' }
    });

    const chartPieData = {
        type: 'donut',
        height: 300,
        width: `${matchDownMD ? 400 : 500}`,
        options: {
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: false,
                /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
                formatter: (val) => val.toFixed(2).concat('%'),
                dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45
                }
            },
            plotOptions: {
                pie: {
                    customScale: 1,
                    donut: {
                        size: '65%',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '22px',
                                fontFamily: `'Poppins', sans-serif`,
                                fontWeight: 600,
                                color: undefined,
                                offsetY: -10,
                                formatter: (val) => val
                            },
                            value: {
                                show: true,
                                fontSize: '30px',
                                fontFamily: `'Poppins', sans-serif`,
                                fontWeight: 600,
                                color: undefined,
                                offsetY: 16,
                                formatter: (val) => parseFloat(val).toFixed(2)
                            },
                            total: {
                                show: false,
                                showAlways: false,
                                label: 'Total',
                                fontSize: '30px',
                                fontFamily: `'Poppins', sans-serif`,
                                fontWeight: '600',
                                color: '#373d3f',
                                formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                            }
                        }
                    }
                }
            },

            labels: ['Suger', 'Fat', 'Cholesterol', 'Carbohydrate', 'Protein']
        },
        series: pieChartData
    };

    function getCalorieData() {
        setDataLoading(true);
        calorieInstance.get(`/nutrition?query=${searchText}`).then(async (response) => {
            const pieChartArr = [];
            const tempAnalizeData = {
                calorie: 0,
                suger: 0,
                fat: 0,
                cholesterol: 0,
                carbohydrate: 0,
                protein: 0
            };
            console.log(response.data.items);
            setCalorieData(response.data.items);

            if (response.data.items.length < 1) {
                messages.addMessage({ title: 'Error Occured!', msg: 'Enter Foods Cannot Find', type: 'danger' });

                setDataLoading(false);
            } else {
                await Promise.all(
                    response.data.items.map((element) => {
                        tempAnalizeData.calorie += element.calories;
                        tempAnalizeData.suger += element.sugar_g;
                        tempAnalizeData.fat += element.fat_total_g;
                        tempAnalizeData.cholesterol += element.cholesterol_mg;
                        tempAnalizeData.carbohydrate += element.carbohydrates_total_g;
                        tempAnalizeData.protein += element.protein_g;
                        return 0;
                    })
                );
                setAnalizeData(tempAnalizeData);
                console.log(tempAnalizeData);

                pieChartArr.push(tempAnalizeData.suger);
                pieChartArr.push(tempAnalizeData.fat);
                pieChartArr.push(tempAnalizeData.cholesterol);
                pieChartArr.push(tempAnalizeData.carbohydrate);
                pieChartArr.push(tempAnalizeData.protein);

                setPieChartData(pieChartArr);
                setDataLoading(false);
            }
        });
    }

    const handleChangeText = (event) => {
        console.log(event.target.value);
        setSearchText(event.target.value);
    };

    /*
box model - suger
flame - calorie
droplet - fat
fiber - ripple
egg - protein
    */

    useEffect(async () => {
        // getCalorieData();
    }, []);
    return (
        <Grid spacing={gridSpacing}>
            <SubCard>
                <Grid container alignItems="center" justifyContent="start" spacing={gridSpacing}>
                    <Grid item direction="row" xs={12} sm={6} md={3} lg={3}>
                        <MuiTypography minWidth={10} right variant="subtitle1">
                            Enter Food Amount and Name For Search :
                        </MuiTypography>
                        {/* <TextField id="outlined-basic" variant="outlined" /> */}

                        {/* <Typography className={classes.subHeading}>MembershipID :</Typography> */}
                    </Grid>
                    <Grid align="left" item xs={12} sm={6} md={6} lg={6}>
                        <TextField id="outlined-basic" fullWidth variant="outlined" onChange={handleChangeText} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Button
                            style={{ maxWidth: '100px', minWidth: '100px' }}
                            color="secondary"
                            variant="contained"
                            onClick={getCalorieData}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </SubCard>
            <div style={{ height: '20px' }} />

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
                <>
                    {analizeData !== undefined ? (
                        <>
                            <SubCard title="Food Analysis">
                                <Grid
                                    container
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={gridSpacing}
                                    paddingX={matchDownMD ? 0 : 10}
                                >
                                    <Grid
                                        item
                                        alignItems="center"
                                        justifyContent="center"
                                        direction="column"
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        marginLeft={matchDownMD ? 10 : 0}
                                    >
                                        <div>
                                            <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                <Avatar variant="rounded" src={Fire} className={classes.avatar} />
                                                <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                    <Typography variant="h5">Calorie</Typography>
                                                </Grid>
                                                <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                    <Typography variant="h5">{analizeData.calorie.toFixed(2)} cal</Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div>
                                            <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                <Avatar variant="rounded" src={Sugar} className={classes.avatar} />
                                                <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                    <Typography variant="h5">Suger</Typography>
                                                </Grid>
                                                <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                    <Typography variant="h5">{analizeData.suger} g</Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div>
                                            <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                <Avatar variant="rounded" src={Bad} className={classes.avatar} />
                                                <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                    <Typography variant="h5">Cholesterol</Typography>
                                                </Grid>
                                                <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                    <Typography variant="h5">{analizeData.cholesterol} mg</Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div>
                                            <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                <Avatar variant="rounded" src={Wheat} className={classes.avatar} />
                                                <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                    <Typography variant="h5">Carbohydrate</Typography>
                                                </Grid>
                                                <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                    <Typography variant="h5">{analizeData.carbohydrate} g</Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div>
                                            <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                <Avatar variant="rounded" src={Protein} className={classes.avatar} />
                                                <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                    <Typography variant="h5">Protein</Typography>
                                                </Grid>
                                                <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                    <Typography variant="h5">{analizeData.protein} g</Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        {/* <TextField id="outlined-basic" variant="outlined" /> */}

                                        {/* <Typography className={classes.subHeading}>MembershipID :</Typography> */}
                                    </Grid>
                                    <Grid align="left" item xs={12} sm={12} md={12} lg={6}>
                                        <Chart {...chartPieData} />;
                                    </Grid>
                                </Grid>
                            </SubCard>
                            <div style={{ height: '20px' }} />
                        </>
                    ) : (
                        <></>
                    )}
                    {calorieData !== undefined && calorieData.length > 0 ? (
                        <SubCard title="Food Items">
                            <Grid container spacing={gridSpacing}>
                                <>
                                    {calorieData.map((element) => (
                                        <Grid item xs={12} sm={12} md={12} lg={4}>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Avatar variant="rounded" className={classes.avatarFirst}>
                                                        <Avatar variant="rounded" className={classes.avatarSecond} />
                                                    </Avatar>
                                                    <Typography variant="h5">
                                                        Food is {element.name.charAt(0).toUpperCase() + element.name.slice(1)}
                                                    </Typography>
                                                    <div style={{ width: 20 }} />
                                                    <Avatar variant="rounded" className={classes.avatarFirst}>
                                                        <Avatar variant="rounded" className={classes.avatarSecond} />
                                                    </Avatar>
                                                    <Typography variant="h5">Amount is {element.serving_size_g} g</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <div>
                                                        <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                            <Avatar variant="rounded" src={Fire} className={classes.avatar} />
                                                            <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">Calorie</Typography>
                                                            </Grid>
                                                            <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">{element.calories} cal</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                            <Avatar variant="rounded" src={Wheat} className={classes.avatar} />
                                                            <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">Carbohydrates</Typography>
                                                            </Grid>
                                                            <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">{element.carbohydrates_total_g} g</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                            <Avatar variant="rounded" src={Fat} className={classes.avatar} />
                                                            <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">Fat</Typography>
                                                            </Grid>
                                                            <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">{element.fat_total_g} g</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                            <Avatar variant="rounded" src={Banana} className={classes.avatar} />
                                                            <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">Protein</Typography>
                                                            </Grid>
                                                            <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">{element.potassium_mg} mg</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                            <Avatar variant="rounded" src={Salt} className={classes.avatar} />
                                                            <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">Sodium</Typography>
                                                            </Grid>
                                                            <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">{element.sodium_mg} mg</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                            <Avatar variant="rounded" src={Protein} className={classes.avatar} />
                                                            <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">Protein</Typography>
                                                            </Grid>
                                                            <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">{element.protein_g} g</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                            <Avatar variant="rounded" src={Vegetable} className={classes.avatar} />
                                                            <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">Fiber</Typography>
                                                            </Grid>
                                                            <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">{element.fiber_g} g</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                            <Avatar variant="rounded" src={Sugar} className={classes.avatar} />
                                                            <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">Suger</Typography>
                                                            </Grid>
                                                            <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">{element.sugar_g} g</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    <div>
                                                        <Grid container direction="row" alignItems="center" xs={12} mb={2}>
                                                            <Avatar variant="rounded" src={Bad} className={classes.avatar} />
                                                            <Grid item direction="row" alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">Cholesterol</Typography>
                                                            </Grid>
                                                            <Grid item alignItems="center" xs={5} sm={5} md={4} lg={5}>
                                                                <Typography variant="h5">{element.cholesterol_mg} mg</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Grid>
                                    ))}
                                </>
                            </Grid>
                        </SubCard>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </Grid>
    );
};

export default CalorieCalculator;
