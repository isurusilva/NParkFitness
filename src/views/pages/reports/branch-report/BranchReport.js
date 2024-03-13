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
import SquareCard from '../trainer-report/SquareCard';
import SmallCard from '../trainer-report/SmallCard';
import BranchDetails from './BranchDetails';
import TotalGrowthBarChart from 'views/dashboard/dashboard-component/TotalGrowthBarChart';
import AttendanceChart from './AttendanceChart';
import ServiceCard from 'views/dashboard/dashboard-component/ServiceCard';

// assets

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
    page: {
        width: '21cm',
        minHeight: '29.7cm',
        padding: '2cm',
        margin: '1cm auto',
        border: '1px #D3D3D3 solid',
        borderRadius: '5px',
        background: 'white',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
    },
    mainCard: {
        // backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        // width: '800px',
        width: '21cm',
        // height: '29.7cm',
        // padding: '2cm',
        margin: '0.5cm auto',
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

const Report = ({
    branchData,
    memberCount,
    serviceCount,
    exMemberCount,
    trainerCount,
    managerCount,
    attendanceCount,
    incomeCount,
    rawPayment,
    serviceData
}) => {
    theme = useTheme();
    const classes = useStyles();
    console.log(serviceData);

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <>
            <SubCard
                className={classes.mainCard}
                sx={{
                    color: 'white',
                    maxWidth: 900,
                    minWidth: 100,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography
                    color={theme.palette.secondary.main}
                    style={{
                        textShadow: '0px 0px 5px #D0B7FF',
                        textAlign: 'center',
                        marginTop: '20px',
                        marginBottom: '0px'
                    }}
                    gutterBottom
                    variant="h3"
                >
                    Branch Report
                </Typography>
                <Typography variant="h5" fontSize="14px" textAlign="center" marginBottom="40px">
                    NPartFitness
                </Typography>
                <BranchDetails data={branchData} />
                <Grid container sx={{ mb: 2, mt: '2px' }} spacing={gridSpacing}>
                    <Grid item xs={4}>
                        <SquareCard title="Member Count" amount={memberCount} isPrimary icon="person" />
                    </Grid>
                    <Grid item xs={4}>
                        <SquareCard title="Trainers Count" amount={trainerCount} icon="trainer" />
                    </Grid>
                    <Grid item xs={4}>
                        <SquareCard title="Managers Count" amount={managerCount} isPrimary icon="manager" />
                    </Grid>
                    <Grid item xs={6}>
                        <SmallCard title="Expired Memberships" amount={exMemberCount} />
                    </Grid>
                    <Grid item xs={6}>
                        <SmallCard title="Services In Branch" amount={serviceCount} isPrimary />
                    </Grid>
                </Grid>
                <AttendanceChart data={attendanceCount.yearArr} />
                <TotalGrowthBarChart incomeData={incomeCount} rawData={rawPayment} />
                <div style={{ height: '10px' }} />
                <ServiceCard data={serviceData} />
            </SubCard>
        </>
    );
};

//= ===============================|| Payment Success Page ||================================//

const BranchReport = () => {
    const theme = useTheme();
    const classes = useStyles();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const componentRef = useRef(null);
    const [branchData, setBranchData] = React.useState(null);
    const [memberCount, setMemberCount] = React.useState();
    const [serviceCount, setServiceCount] = React.useState();
    const [exMemberCount, setExMemberCount] = React.useState();
    const [trainerCount, setTrainerCount] = React.useState();
    const [managerCount, setManagerCount] = React.useState();
    const [attendanceCount, setAttendanceCount] = React.useState();
    const [rawPayment, setRawPayment] = React.useState(0);
    const [incomeCount, setIncomeCount] = React.useState();
    const [serviceData, setServiceData] = React.useState();
    const [isDataLoading, setDataLoading] = React.useState(true);
    const [display, setDisplay] = React.useState('none');
    const { state } = useLocation();
    const branchId = state !== null ? state.branchId : 1;
    // const trainerId = 4;
    // const userId = 1;
    // const branchId = 1;

    function getManagerData() {
        // let arr = [];
        HttpCommon.get(`/api/branch/${branchId}`).then((response1) => {
            console.log(response1.data.data);
            setBranchData(response1.data.data);
            HttpCommon.get(`/api/serviceType/getServiceTypeByBranchId/${branchId}`).then((response2) => {
                console.log(response2.data.data);
                setServiceData(response2.data.data);
                HttpCommon.get(`api/dashboard/getManagerDashboardData/${branchId}`).then(async (response) => {
                    console.log(response.data.data);
                    console.log(response.data.data.staffCount);
                    setMemberCount(response.data.data.memberCount);
                    setServiceCount(response.data.data.serviceCount);
                    setExMemberCount(response.data.data.exMemberCount);

                    await Promise.all(
                        await response.data.data.staffCount.map((element) => {
                            if (element.type === 'Manager') {
                                setManagerCount(element.count);
                            } else if (element.type === 'Trainer') {
                                setTrainerCount(element.count);
                            }
                            return 0;
                        })
                    );

                    let body = {
                        chartMonthData: [],
                        chartYearData: [],
                        monthCount: 0,
                        yearCount: 0
                    };
                    if (response.data.data.attendanceCount !== null) {
                        const monthArr = [];
                        const yearArr = [];
                        let monthCount = 0;
                        let yearCount = 0;
                        await Promise.all(
                            response.data.data.attendanceCount.attendanceMonth.map((element) => {
                                monthCount += element.count;
                                return monthArr.push(element.count);
                            })
                        );
                        await Promise.all(
                            response.data.data.attendanceCount.attendanceYear.map((element) => {
                                yearCount += element.count;
                                return yearArr.push(element.count);
                            })
                        );

                        body = { monthArr, yearArr, monthCount, yearCount };
                    }

                    setAttendanceCount(body);
                    const incomeArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    await Promise.all(
                        response.data.data.incomeCount.map((element) => {
                            const month = parseInt(element.date.slice(5, 7), 10);
                            incomeArr[month - 1] = element.totalAmount;
                            return 0;
                        })
                    );
                    console.log(incomeArr);
                    setIncomeCount(incomeArr);

                    const rawCardPaymentArr = [[], [], [], [], [], [], [], [], [], [], [], []];
                    const rawCashPaymentArr = [[], [], [], [], [], [], [], [], [], [], [], []];
                    await Promise.all(
                        response.data.data.rawPaymentData.map((element) => {
                            const month = parseInt(element.date.slice(5, 7), 10);
                            if (element.method === 'cash') {
                                rawCashPaymentArr[month - 1].push(element);
                            } else {
                                rawCardPaymentArr[month - 1].push(element);
                            }
                            return 0;
                        })
                    );
                    console.log(rawCardPaymentArr);
                    console.log(rawCashPaymentArr);
                    setRawPayment({ rawCardPaymentArr, rawCashPaymentArr });

                    console.log('Is It Done2');

                    setDataLoading(false);
                    // setLoading(false);
                });
            });
        });
    }

    const handleDisplay = () => {
        setTimeout(() => {
            setDisplay('block');
            setDisplay('none');
            console.log('Done');
        }, 2000);
    };

    useEffect(async () => {
        setDataLoading(true);

        console.log(branchId);
        if (branchId !== undefined) {
            getManagerData();
        }
    }, []);

    return (
        <>
            {isDataLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '800px',
                        width: '100%'
                    }}
                >
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            ) : (
                <AuthWrapper1>
                    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
                        <Grid container xs={12} sm={12} md={8} lg={8} style={{ maxWidth: 900, minWidth: 100 }}>
                            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                                <Grid item sx={{ m: { xs: 2, sm: 6 }, mb: 0 }}>
                                    {/* <SubCard
                                        className={classes.mainCard}
                                        sx={{
                                            color: 'white',
                                            maxWidth: 900,
                                            minWidth: 100,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    > */}
                                    <Report
                                        branchData={branchData}
                                        memberCount={memberCount}
                                        serviceCount={serviceCount}
                                        exMemberCount={exMemberCount}
                                        trainerCount={trainerCount}
                                        managerCount={managerCount}
                                        attendanceCount={attendanceCount}
                                        incomeCount={incomeCount}
                                        rawPayment={rawPayment}
                                        serviceData={serviceData}
                                    />
                                    {/* </SubCard> */}
                                    <div style={{ textAlign: 'right' }}>
                                        <ReactToPrint
                                            documentTitle="Branch Report"
                                            trigger={() => (
                                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                                                    <AnimateButton>
                                                        <Button variant="contained" className={classes.button}>
                                                            Print Report
                                                        </Button>
                                                    </AnimateButton>
                                                </div>
                                            )}
                                            content={() => componentRef.current}
                                        />
                                        <div style={{ visibility: 'hidden' }}>
                                            <Typography variant="h5" fontSize="14px" textAlign="center" marginBottom="40px">
                                                Print Preview
                                            </Typography>
                                            <ComponentToPrint
                                                ref={componentRef}
                                                branchData={branchData}
                                                memberCount={memberCount}
                                                serviceCount={serviceCount}
                                                exMemberCount={exMemberCount}
                                                trainerCount={trainerCount}
                                                managerCount={managerCount}
                                                attendanceCount={attendanceCount}
                                                incomeCount={incomeCount}
                                                rawPayment={rawPayment}
                                                serviceData={serviceData}
                                                classes={classes}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                            <AuthFooter />
                        </Grid>
                    </Grid>
                </AuthWrapper1>
            )}
        </>
    );
};

export class ComponentToPrint extends React.PureComponent {
    render() {
        // const classes = this.props;
        const {
            branchData,
            memberCount,
            serviceCount,
            exMemberCount,
            trainerCount,
            managerCount,
            attendanceCount,
            incomeCount,
            rawPayment,
            serviceData,
            classes
        } = this.props;
        // console.log(this.props.centerPayData); // result: 'some_value'
        // console.log(this.props); // result: 'some_value'
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} sm={12} md={12}>
                        {/* <SubCard
                            className={classes.mainCard}
                            sx={{
                                color: 'white',
                                maxWidth: 900,
                                minWidth: 100,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        > */}
                        <div>
                            <Report
                                branchData={branchData}
                                memberCount={memberCount}
                                serviceCount={serviceCount}
                                exMemberCount={exMemberCount}
                                trainerCount={trainerCount}
                                managerCount={managerCount}
                                attendanceCount={attendanceCount}
                                incomeCount={incomeCount}
                                rawPayment={rawPayment}
                                serviceData={serviceData}
                            />
                        </div>
                        {/* </SubCard> */}
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default BranchReport;
