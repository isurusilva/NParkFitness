import React, { useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Card, Button, Box, Divider, Grid, Stack, Typography, useMediaQuery, CardMedia } from '@material-ui/core';

// project imports
import AuthWrapper1 from '../../authentication/AuthWrapper1';
import AuthCardWrapper from '../../authentication/AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import SubCard from 'ui-component/cards/SubCard';
import { makeStyles, withStyles } from '@material-ui/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ReactToPrint from 'react-to-print';
import MuiTypography from '@material-ui/core/Typography';

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import HttpCommon from 'utils/http-common';
import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';

import { gridSpacing } from 'store/constant';
import EventIcon from '@mui/icons-material/Event';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import MapIcon from '@mui/icons-material/Map';
import Chart from 'react-apexcharts';

const useStyles = makeStyles((theme) => ({
    card: {
        // backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        width: '755px',
        // border: '5px solid #916BD8',
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
        // borderRadius: '0px!important'
        // '&:after': {
        //     content: '""',
        //     zIndex: 1,
        //     position: 'absolute',
        //     width: '1200px',
        //     height: '1500px',
        //     background: `linear-gradient(210.04deg, ${theme.palette.secondary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        //     // borderRadius: '50%',
        //     top: '-300px',
        //     right: '-250px'
        // },
        // '&:before': {
        //     content: '""',
        //     position: 'absolute',
        //     width: '1500px',
        //     height: '610px',
        //     background: `linear-gradient(275.9deg, ${theme.palette.secondary[800]} -50.02%, rgba(145, 107, 216, 0) 180.58%)`,
        //     borderRadius: '250%',
        //     top: '-500px',
        //     right: '-350px'
        // }
    },
    mainCard: {
        // backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        width: '800px',
        // border: '5px solid #916BD8',
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
        // borderRadius: '0px!important'
        // '&:after': {
        //     content: '""',
        //     zIndex: 1,
        //     position: 'absolute',
        //     width: '1200px',
        //     height: '1500px',
        //     background: `linear-gradient(210.04deg, ${theme.palette.secondary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        //     // borderRadius: '50%',
        //     top: '-300px',
        //     right: '-250px'
        // },
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
    button: {
        color: theme.palette.white,
        alignItems: 'right',
        marginTop: 20,
        backgroundColor: theme.palette.secondary.main,
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}));

let theme;

const CustomTypography = withStyles({
    root: {
        color: '#7E7676'
    }
})(MuiTypography);

const ShadowBox = ({ image, name }) => {
    theme = useTheme();

    return (
        <Card sx={{ height: 150, width: 150, mb: 3, boxShadow: 0 }}>
            <Box
                sx={{
                    height: 150,
                    width: 150,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 3,
                    bgcolor: theme.palette.primary.light,
                    color: theme.palette.grey[800]
                }}
            >
                {image !== null ? (
                    <CardMedia component="img" image={image} alt="green iguana" />
                ) : (
                    <MuiTypography style={{ fontSize: '40px' }} right variant="subtitle1">
                        {name}
                    </MuiTypography>
                )}
            </Box>
        </Card>
    );
};

const BMIChart = ({ size, data }) => {
    theme = useTheme();
    const classes = useStyles();
    console.log(data);
    const memberData = data;

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    // let attendance = [5, 8, 4, 3, 6, 9, 5];

    const [timeValue, setTimeValue] = React.useState(false);
    const [attendanceChart, setAttendanceChart] = React.useState([5, 8, 4, 3, 6, 9, 5]);
    // const [attendanceYearChart, setAttendanceYearChart] = React.useState();
    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };

    useEffect(async () => {
        if (data !== undefined) {
            const attendance = [];
            data.bodyDetails.forEach((element) => {
                if (element.height > 0 && element.weight > 0) {
                    const bmi = (element.weight * 10000) / (element.height * element.height);
                    attendance.push(bmi.toFixed(2));
                }
            });
            console.log(attendance);
            setAttendanceChart(attendance);
        }
    }, []);

    const chartYearData = {
        type: 'line',
        height: 200,
        options: {
            chart: {
                sparkline: {
                    enabled: true
                },
                animations: {
                    enabled: false
                },
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                }
            },
            title: {
                text: '',
                align: 'left',
                margin: 20,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: '#263238'
                }
            },
            dataLabels: {
                enabled: true,
                formatter: (val, opts) => val,
                textAnchor: 'middle',
                offsetX: 0,
                offsetY: -7,
                style: {
                    fontSize: '12px',
                    fontWeight: 'normal',
                    paddingTop: 50
                },
                background: {
                    enabled: true,
                    backgroundColor: 'red',
                    foreColor: '#fff',
                    borderRadius: 2,
                    padding: 4,
                    opacity: 0.9,
                    // borderWidth: 1,
                    // borderColor: '#fff',
                    margin: 20
                }
            },
            colors: ['#177CEE', '#66DA26', '#546E7A'],
            fill: {
                type: 'solid',
                opacity: 1
            },
            stroke: {
                curve: 'smooth',
                width: 4
            },
            yaxis: {},
            markers: {
                size: 5
            },
            grid: {
                padding: {
                    top: 20,
                    right: 40,
                    bottom: 20,
                    left: 20
                }
            },
            tooltip: {
                theme: 'dark',
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: () => 'BMI'
                    }
                },
                marker: {
                    strokeColors: '#fff',
                    strokeWidth: 2,
                    strokeOpacity: 0.9,
                    strokeDashArray: 0,
                    fillOpacity: 1,
                    size: 2,
                    shape: 'circle',
                    radius: 1,
                    offsetX: 0,
                    offsetY: 0
                }
            }
        },
        series: [
            {
                name: 'series1',
                data: attendanceChart
            }
        ]
    };

    return (
        <>
            <SubCard className={classes.card} sx={{ color: 'white', maxWidth: 900, minWidth: 100, marginBottom: '10px' }} title="BMI">
                <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                    <Grid align="center" item xs={12}>
                        <Chart {...chartYearData} />
                    </Grid>
                </Grid>
            </SubCard>
        </>
    );
};

export default BMIChart;
