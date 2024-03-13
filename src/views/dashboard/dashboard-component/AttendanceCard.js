import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Button, Grid, Typography } from '@material-ui/core';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

import ChartDataMonth from '../Default/chart-data/total-order-month-line-chart';
import ChartDataYear from '../Default/chart-data/total-order-year-line-chart';

// assets
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.primary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&>div': {
            position: 'relative',
            zIndex: 5
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.primary[800],
            borderRadius: '50%',
            zIndex: 1,
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            zIndex: 1,
            width: '210px',
            height: '210px',
            background: theme.palette.primary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    content: {
        padding: '20px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.primary[800],
        color: '#fff',
        marginTop: '8px'
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.primary[200]
    },
    avatarCircle: {
        ...theme.typography.smallAvatar,
        cursor: 'pointer',
        backgroundColor: theme.palette.primary[200],
        color: theme.palette.primary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    }
}));

// ===========================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||=========================== //

const AttendanceCard = ({ isLoading, data }) => {
    const classes = useStyles();
    console.log(data);
    console.log(data.monthArr);
    console.log(data.yearArr);

    let monthArr = [5, 8, 4, 3, 6, 9, 5];
    let yearArr = [5, 8, 4, 3, 6, 9, 5];
    if (data !== undefined) {
        monthArr = data.monthArr;
        yearArr = data.yearArr;
    }

    const [timeValue, setTimeValue] = React.useState(false);
    // const [attendanceMonthChart, setAttendanceMonthChart] = React.useState();
    // const [attendanceYearChart, setAttendanceYearChart] = React.useState();
    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };

    const chartMonthData = {
        type: 'line',
        height: 90,
        options: {
            chart: {
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ['#fff'],
            fill: {
                type: 'solid',
                opacity: 1
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            yaxis: {
                show: false,
                min: 0
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
                        formatter: () => 'Attendance'
                    }
                },
                marker: {
                    show: false
                },
                grid: {
                    padding: {
                        top: 7,
                        right: 10,
                        bottom: 5,
                        left: 10
                    }
                }
            }
        },
        series: [
            {
                name: 'series1',
                data: monthArr
            }
        ]
    };

    const chartYearData = {
        type: 'line',
        height: 90,
        options: {
            chart: {
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ['#fff'],
            fill: {
                type: 'solid',
                opacity: 1
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            yaxis: {
                show: false,
                min: 0
            },
            markers: {
                size: 3
            },
            grid: {
                padding: {
                    top: 7,
                    right: 10,
                    bottom: 5,
                    left: 10
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
                        formatter: () => 'Attendance'
                    }
                },
                marker: {
                    show: false
                }
            }
        },
        series: [
            {
                name: 'series1',
                data: yearArr
            }
        ]
    };

    // useEffect(() => {

    // }, []);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Avatar variant="rounded" className={classes.avatar}>
                                        <LocalMallOutlinedIcon fontSize="inherit" />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Button
                                        disableElevation
                                        variant={timeValue ? 'contained' : 'string'}
                                        size="small"
                                        onClick={(e) => handleChangeTime(e, true)}
                                    >
                                        Month
                                    </Button>
                                    <Button
                                        disableElevation
                                        variant={!timeValue ? 'contained' : 'string'}
                                        size="small"
                                        onClick={(e) => handleChangeTime(e, false)}
                                    >
                                        Year
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 0.75 }}>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            {timeValue ? (
                                                <Typography className={classes.cardHeading}>{data.monthCount}</Typography>
                                            ) : (
                                                <Typography className={classes.cardHeading}>{data.yearCount}</Typography>
                                            )}
                                        </Grid>
                                        <Grid item>
                                            <Avatar className={classes.avatarCircle}>
                                                <ArrowDownwardIcon fontSize="inherit" className={classes.circleIcon} />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className={classes.subHeading}>Total Attendance</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {data !== undefined ? (
                                    <Grid item xs={6}>
                                        {timeValue ? <Chart {...chartMonthData} /> : <Chart {...chartYearData} />}
                                    </Grid>
                                ) : (
                                    <></>
                                )}
                                {/* <Grid item xs={6}>
                                    {timeValue ? <Chart {...data.chartMonthData} /> : <Chart {...data.chartYearData} />}
                                </Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

AttendanceCard.propTypes = {
    isLoading: PropTypes.bool
};

export default AttendanceCard;
