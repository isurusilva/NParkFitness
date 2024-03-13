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
import MemberDetails from './MemberDetails';
import WeightDetails from './WeightDetails';
import AttendDetails from './AttendDetails';
import ScheduleDetails from './ScheduleDetails';
import DietDetails from './DietDetails';
import GoalDetails from './GoalDetails';
import BMIChart from './BMIChart';
import messages from 'utils/messages';

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

const Report = ({ size, memberData, weightData, attendanceData, scheduleData, dietData, goalData }) => {
    theme = useTheme();
    const classes = useStyles();
    console.log(memberData);

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
                    Member Report
                </Typography>
                <Typography variant="h5" fontSize="14px" textAlign="center" marginBottom="40px">
                    NPartFitness
                </Typography>
                {memberData !== undefined && memberData !== null ? <MemberDetails data={memberData} /> : <></>}
                {goalData !== undefined && goalData !== null ? <GoalDetails data={goalData} /> : <></>}
                {scheduleData !== undefined && scheduleData !== null ? <ScheduleDetails data={scheduleData} /> : <></>}
                {weightData !== undefined && weightData !== null ? <WeightDetails data={weightData} /> : <></>}
                {weightData !== undefined && weightData !== null ? <BMIChart data={weightData} /> : <></>}
                {attendanceData !== undefined && attendanceData !== null ? <AttendDetails data={attendanceData} /> : <></>}
                {dietData !== undefined && dietData !== null ? <DietDetails data={dietData} /> : <></>}

                {/* <MemberDetails data={memberData} />
                <GoalDetails data={goalData} />
                <ScheduleDetails data={scheduleData} />
                <WeightDetails data={weightData} />
                <BMIChart data={weightData} />
                <AttendDetails data={attendanceData} />
                <DietDetails data={dietData} /> */}
            </SubCard>
        </>
    );
};

//= ===============================|| Payment Success Page ||================================//

const MemberReport = ({ memberid }) => {
    const theme = useTheme();
    const classes = useStyles();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const componentRef = useRef(null);
    const [memberData, setMemberData] = React.useState(null);
    const [weightData, setWeightData] = React.useState(null);
    const [attendanceData, setAttendanceData] = React.useState(null);
    const [dietData, setDietData] = React.useState(null);
    const [goalData, setGoalData] = React.useState(null);
    const [scheduleData, setScheduleData] = React.useState(null);
    const [isDataLoading, setDataLoading] = React.useState(true);
    const [display, setDisplay] = React.useState('none');
    const { state } = useLocation();
    const memberId = state !== null ? state.memberid : 1;
    function getMemberDetails() {
        // let arr = [];
        HttpCommon.get(`/api/payment/getAllPaymentByMemberId/${memberId}`).then((response) => {
            console.log(response.data.data);
            setMemberData(response.data.data);
            const { userId } = response.data.data.member;

            HttpCommon.get(`/api/bodyDetails/getBodyDetailsByUserId/${userId}`).then((response) => {
                if (response.data.data !== undefined && response.data.data.bodyDetails.length > 8) {
                    response.data.data.bodyDetails = response.data.data.bodyDetails.slice(-8);
                }
                console.log(response.data.data);
                setWeightData(response.data.data);

                HttpCommon.post(`/api/attendance/getAttendanceByMemberIdAndMonth`, {
                    date: new Date().toISOString().slice(0, 7),
                    membershipId: memberId
                }).then((response) => {
                    console.log(response.data.data);
                    setAttendanceData(response.data.data);

                    HttpCommon.get(`/api/dietPlan/getDietPlanAndMealByUserId/${userId}`).then((response) => {
                        console.log(response.data.data);
                        setDietData(response.data.data);

                        HttpCommon.get(`/api/goal/getGoalByMemberId/${memberId}`).then((response) => {
                            console.log(response.data.data);
                            setGoalData(response.data.data);

                            HttpCommon.post(`/api/attendItem/getAllAttendItemByMemberIdAndDate/`, {
                                date: new Date().toISOString().slice(0, 10),
                                membershipId: memberId
                            }).then((response) => {
                                console.log(response.data.data);

                                if (response.data.data.attendItem.length === 0) {
                                    HttpCommon.get(`/api/scheduleItem/getScheduleItemByMemberId/${memberId}`).then((response) => {
                                        console.log(response.data.data);
                                        setScheduleData(response.data.data);
                                        setDataLoading(false);
                                    });
                                } else {
                                    setScheduleData(response.data.data);
                                    setDataLoading(false);
                                }
                            });
                        });
                    });
                });
            });
            setDataLoading(false);

            if (response.data.data.member === null) {
                messages.addMessage({ title: 'Error Occured!', msg: 'Enter Member Id Cannot Found In Your Gym', type: 'danger' });
            }
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

        console.log(memberId);
        if (memberId !== undefined) {
            getMemberDetails();
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
                                        size={12}
                                        memberData={memberData}
                                        weightData={weightData}
                                        attendanceData={attendanceData}
                                        scheduleData={scheduleData}
                                        dietData={dietData}
                                        goalData={goalData}
                                    />
                                    {/* </SubCard> */}
                                    <div style={{ textAlign: 'right' }}>
                                        <ReactToPrint
                                            documentTitle="Member Report"
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
                                                memberData={memberData}
                                                weightData={weightData}
                                                attendanceData={attendanceData}
                                                scheduleData={scheduleData}
                                                dietData={dietData}
                                                goalData={goalData}
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
        const { memberData, weightData, attendanceData, scheduleData, dietData, goalData, classes } = this.props;
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
                                memberData={memberData}
                                weightData={weightData}
                                attendanceData={attendanceData}
                                scheduleData={scheduleData}
                                dietData={dietData}
                                goalData={goalData}
                            />
                        </div>
                        {/* </SubCard> */}
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default MemberReport;
