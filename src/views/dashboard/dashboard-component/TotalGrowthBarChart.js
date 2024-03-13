import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Grid, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
// import chartData from './chart-data/total-growth-bar-chart';

const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ===========================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||=========================== //

const TotalGrowthBarChart = ({ isLoading, incomeData, rawData }) => {
    const [value, setValue] = React.useState('year');
    const [isloading, setIsloading] = React.useState(false);
    const [isCardAvailable, setIsCardAvailable] = React.useState(false);
    const [chartValues, setChartValue] = React.useState(incomeData);
    const [categoryValues, setCategoryValue] = React.useState([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]);
    const theme = useTheme();
    const month = parseInt(new Date().toISOString().slice(5, 7), 10);
    const date = parseInt(new Date().toISOString().slice(8, 10), 10);
    let rawMonthArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let rawCardMonthArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const rawHourArr = [0, 0, 0, 0, 0, 0, 0, 0];
    const rawCardHourArr = [0, 0, 0, 0, 0, 0, 0, 0];
    const dateArr = [];

    console.log(incomeData);
    console.log(rawData);

    async function filterMonthRawData() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
        console.log(daysInCurrentMonth);
        rawMonthArr = rawMonthArr.slice(0, daysInCurrentMonth);
        rawCardMonthArr = rawCardMonthArr.slice(0, daysInCurrentMonth);
        let index = 0;
        while (index < daysInCurrentMonth) {
            const dateString = (index + 1).toString();
            dateArr.push(dateString);
            index += 1;
        }

        if (rawData !== null || rawData.length > 0) {
            if (rawData.rawCardPaymentArr !== undefined) {
                // setIsCardAvailable(true);
                await Promise.all(
                    rawData.rawCardPaymentArr[month - 1].map((element) => {
                        const day = parseInt(element.date.slice(8, 10), 10);
                        rawCardMonthArr[day - 1] += parseFloat(element.amount);
                        return 0;
                    })
                );
                await Promise.all(
                    rawData.rawCashPaymentArr[month - 1].map((element) => {
                        const day = parseInt(element.date.slice(8, 10), 10);
                        rawMonthArr[day - 1] += parseFloat(element.amount);
                        return 0;
                    })
                );
                await Promise.all(
                    rawData.rawCardPaymentArr[month - 1].map((element) => {
                        const day = parseInt(element.date.slice(8, 10), 10);
                        const elementMonth = parseInt(element.date.slice(5, 7), 10);
                        const elementTime = parseInt(element.CreatedAt.slice(11, 13), 10) + 5;
                        if (month === elementMonth && date === day) {
                            if (elementTime >= 0 && elementTime < 3) {
                                rawCardHourArr[0] += parseFloat(element.amount);
                            } else if (elementTime >= 3 && elementTime < 6) {
                                rawCardHourArr[1] += parseFloat(element.amount);
                            } else if (elementTime >= 6 && elementTime < 9) {
                                rawCardHourArr[2] += parseFloat(element.amount);
                            } else if (elementTime >= 9 && elementTime < 12) {
                                rawCardHourArr[3] += parseFloat(element.amount);
                            } else if (elementTime >= 12 && elementTime < 15) {
                                rawCardHourArr[4] += parseFloat(element.amount);
                            } else if (elementTime >= 15 && elementTime < 18) {
                                rawCardHourArr[5] += parseFloat(element.amount);
                            } else if (elementTime >= 18 && elementTime < 21) {
                                rawCardHourArr[6] += parseFloat(element.amount);
                            } else if (elementTime >= 21 && elementTime < 24) {
                                rawCardHourArr[7] += parseFloat(element.amount);
                            }
                        }
                        return 0;
                    })
                );
                await Promise.all(
                    rawData.rawCashPaymentArr[month - 1].map((element) => {
                        const day = parseInt(element.date.slice(8, 10), 10);
                        const elementMonth = parseInt(element.date.slice(5, 7), 10);
                        const elementTime = parseInt(element.CreatedAt.slice(11, 13), 10) + 5;
                        if (month === elementMonth && date === day) {
                            if (elementTime >= 0 && elementTime < 3) {
                                rawHourArr[0] += parseFloat(element.amount);
                            } else if (elementTime >= 3 && elementTime < 6) {
                                rawHourArr[1] += parseFloat(element.amount);
                            } else if (elementTime >= 6 && elementTime < 9) {
                                rawHourArr[2] += parseFloat(element.amount);
                            } else if (elementTime >= 9 && elementTime < 12) {
                                rawHourArr[3] += parseFloat(element.amount);
                            } else if (elementTime >= 12 && elementTime < 15) {
                                rawHourArr[4] += parseFloat(element.amount);
                            } else if (elementTime >= 15 && elementTime < 18) {
                                rawHourArr[5] += parseFloat(element.amount);
                            } else if (elementTime >= 18 && elementTime < 21) {
                                rawHourArr[6] += parseFloat(element.amount);
                            } else if (elementTime >= 21 && elementTime < 24) {
                                rawHourArr[7] += parseFloat(element.amount);
                            }
                        }
                        return 0;
                    })
                );
                console.log(rawMonthArr);
                console.log(rawCardMonthArr);
                console.log(rawHourArr);
                console.log(rawCardHourArr);
            } else {
                await Promise.all(
                    rawData[month - 1].map((element) => {
                        const day = parseInt(element.date.slice(8, 10), 10);
                        rawMonthArr[day - 1] += parseFloat(element.amount);
                        return 0;
                    })
                );
                await Promise.all(
                    rawData[month - 1].map((element) => {
                        const day = parseInt(element.date.slice(8, 10), 10);
                        const elementMonth = parseInt(element.date.slice(5, 7), 10);
                        const elementTime = parseInt(element.CreatedAt.slice(11, 13), 10) + 5;
                        if (month === elementMonth && date === day) {
                            if (elementTime >= 0 && elementTime < 3) {
                                rawHourArr[0] += parseFloat(element.amount);
                            } else if (elementTime >= 3 && elementTime < 6) {
                                rawHourArr[1] += parseFloat(element.amount);
                            } else if (elementTime >= 6 && elementTime < 9) {
                                rawHourArr[2] += parseFloat(element.amount);
                            } else if (elementTime >= 9 && elementTime < 12) {
                                rawHourArr[3] += parseFloat(element.amount);
                            } else if (elementTime >= 12 && elementTime < 15) {
                                rawHourArr[4] += parseFloat(element.amount);
                            } else if (elementTime >= 15 && elementTime < 18) {
                                rawHourArr[5] += parseFloat(element.amount);
                            } else if (elementTime >= 18 && elementTime < 21) {
                                rawHourArr[6] += parseFloat(element.amount);
                            } else if (elementTime >= 21 && elementTime < 24) {
                                rawHourArr[7] += parseFloat(element.amount);
                            }
                        }
                        return 0;
                    })
                );
                console.log(rawMonthArr);
                console.log(rawHourArr);
            }
        }
    }

    const { primary } = theme.palette.text;
    const grey200 = theme.palette.grey[200];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;
    const grey500 = theme.palette.grey[500];
    let totalGrowth = 0;
    if (incomeData !== undefined && incomeData.length > 0) {
        totalGrowth = incomeData[month - 1];
    }

    const chartData = {
        height: 480,
        type: 'bar',
        options: {
            chart: {
                id: 'bar-chart',
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%'
                }
            },
            xaxis: {
                type: 'category',
                categories: categoryValues
            },
            legend: {
                show: true,
                fontSize: '14px',
                fontFamily: `'Roboto', sans-serif`,
                position: 'bottom',
                offsetX: 20,
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 8
                }
            },
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true
            }
        },
        series: [
            {
                name: 'Income',
                data: chartValues
            }
        ]
    };

    const handleChange = async (data) => {
        setValue(data);
        setIsloading(true);
        await filterMonthRawData();

        switch (data) {
            case 'year':
                setChartValue([...incomeData]);
                setCategoryValue(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
                break;
            case 'month':
                setCategoryValue([...dateArr]);
                if (rawData.rawCardPaymentArr !== undefined) {
                    const tempArr = [];
                    tempArr.push(rawMonthArr);
                    tempArr.push(rawCardMonthArr);
                    setChartValue(tempArr);
                } else {
                    setChartValue([...rawMonthArr]);
                }

                break;
            case 'today':
                setCategoryValue([
                    '12A.M - 3A.M',
                    '3A.M - 6A.M',
                    '6A.M - 9A.M',
                    '9A.M - 12P.M',
                    '12P.M - 3P.M',
                    '3P.M - 6P.M',
                    '6P.M - 9P.M',
                    '9P.M - 12A.M'
                ]);
                if (rawData.rawCardPaymentArr !== undefined) {
                    const tempArr = [];
                    tempArr.push(rawHourArr);
                    tempArr.push(rawCardHourArr);
                    setChartValue(tempArr);
                } else {
                    setChartValue([...rawHourArr]);
                }
                break;
            default:
                setChartValue(incomeData);
                setCategoryValue(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
                break;
        }
        setIsloading(false);
        console.log(chartValues);
    };
    // React.useEffect(() => {
    //     console.log('Starting');
    //     filterMonthRawData();
    // }, []);

    React.useEffect(() => {
        console.log('chartValues');
        console.log(chartValues);
        console.log(categoryValues);
        const chartValueArr = [];
        const chartCategoryValuesArr = [];
        console.log(rawData);
        if (rawData !== undefined && rawData.rawCardPaymentArr !== undefined && value !== 'year') {
            chartValueArr.push({
                name: 'Cash',
                data: chartValues[0]
            });
            chartValueArr.push({
                name: 'Card',
                data: chartValues[1]
            });
            // chartCategoryValuesArr.push(categoryValues);
            // chartCategoryValuesArr.push(categoryValues);
        } else {
            chartValueArr.push({
                name: 'Income',
                data: chartValues
            });
            // chartCategoryValuesArr.push(categoryValues);
        }
        console.log(chartValueArr);
        const newChartData = {
            ...chartData.options,
            colors: [secondaryMain, primaryDark, secondaryMain, secondaryLight],
            xaxis: {
                type: 'category',
                categories: categoryValues,
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: grey200
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            },
            series: chartValueArr
        };

        // do not load chart when loading
        if (!isLoading && !isloading) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
        }
    }, [
        secondaryMain,
        primaryDark,
        secondaryMain,
        secondaryLight,
        primary,
        grey200,
        isLoading,
        isloading,
        grey500,
        categoryValues,
        chartValues,
        value
    ]);

    return (
        <>
            {isLoading && isloading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Total Growth</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">Rs {totalGrowth}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={value}
                                        onChange={(e) => handleChange(e.target.value)}
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
