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
import TrainerDetails from './TrainerDetails';
import SquareCard from './SquareCard';
import SmallCard from './SmallCard';
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

const Report = ({ trainerData, memberCount, schedulePending, dietPending, scheduleMonthlyCount }) => {
    theme = useTheme();
    const classes = useStyles();
    console.log(trainerData);

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
                    Trainer Report
                </Typography>
                <Typography variant="h5" fontSize="14px" textAlign="center" marginBottom="40px">
                    NPartFitness
                </Typography>
                <TrainerDetails data={trainerData} />
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={4}>
                        <SquareCard title="Member Count" amount={memberCount} isPrimary icon="person" />
                    </Grid>
                    <Grid item xs={4}>
                        <SquareCard title="Pending Schedules" amount={schedulePending} icon="schedule" />
                    </Grid>
                    <Grid item xs={4}>
                        <SquareCard title="Pending Diet Plans" amount={dietPending} isPrimary icon="diet" />
                    </Grid>
                    <Grid item xs={6}>
                        <SmallCard title="Schedule Count For Month" amount={scheduleMonthlyCount} />
                    </Grid>
                    {trainerData.branch !== undefined ? (
                        <Grid item xs={6}>
                            <SmallCard title="Working Branch Name" amount={trainerData.branch.name} isPrimary />
                        </Grid>
                    ) : (
                        <Grid item xs={6}>
                            <SmallCard title="Working Branch Name" amount="Not Found" isPrimary />
                        </Grid>
                    )}
                </Grid>
            </SubCard>
        </>
    );
};

//= ===============================|| Payment Success Page ||================================//

const TrainerReport = () => {
    const theme = useTheme();
    const classes = useStyles();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const componentRef = useRef(null);
    const [trainerData, setTrainerData] = React.useState();
    const [serviceCount, setServiceCount] = React.useState(null);
    const [memberCount, setMemberCount] = React.useState(null);
    const [exMemberCount, setExMemberCount] = React.useState(null);
    const [dietData, setPendingDietCount] = React.useState(null);
    const [scheduleData, setPendingScheduleCount] = React.useState(null);
    const [scheduleMonthlyCount, setScheduleMonthlyCount] = React.useState(null);
    const [isDataLoading, setDataLoading] = React.useState(true);
    const [display, setDisplay] = React.useState('none');
    const { state } = useLocation();
    const trainerId = state !== null ? state.trainerId : 1;
    const branchId = state !== null ? state.branchId : 1;
    // const trainerId = 4;
    // const userId = 1;
    // const branchId = 1;
    function getTrainerDetails() {
        // let arr = [];
        HttpCommon.post(`/api/schedule/getScheduleCountByTrainerIdAndMonth/${trainerId}`, {
            month: new Date().toISOString().slice(0, 7)
        }).then((response1) => {
            console.log(response1.data.data);
            setScheduleMonthlyCount(response1.data.data);
            HttpCommon.get(`/api/user/${trainerId}`).then((response1) => {
                console.log(response1.data.data);
                setTrainerData(response1.data.data);
                if (response1.data.data === null) {
                    messages.addMessage({ title: 'Error Occured!', msg: 'Enter Trainer Id Cannot Found In Your Gym', type: 'danger' });
                }

                HttpCommon.post(`api/dashboard/getMemberDetails/${trainerId}`, { branchId }).then(async (response) => {
                    console.log(response.data.data);
                    setMemberCount(response.data.data.memberCount);
                    setServiceCount(response.data.data.serviceCount);
                    setExMemberCount(response.data.data.exMemberCount);
                    // setMemberData(response.data.data.memberData);

                    let tempScheduleCount = 0;
                    let tempDietCount = 0;
                    await Promise.all(
                        response.data.data.memberData.map((element) => {
                            if (!element.isDietAvailable) {
                                tempDietCount += 1;
                            }
                            if (element.scheduleExpireDate !== null) {
                                const d1 = Date.parse(element.scheduleExpireDate);
                                const today = new Date().toISOString().slice(0, 10);
                                console.log('element.scheduleExpireDate<today');
                                console.log(element.scheduleExpireDate < today);
                                if (element.scheduleExpireDate < today) {
                                    tempScheduleCount += 1;
                                }
                            } else {
                                tempScheduleCount += 1;
                            }
                            return 0;
                        })
                    );
                    setPendingDietCount(tempDietCount);
                    setPendingScheduleCount(tempScheduleCount);
                    if (response1.data.data.branchId !== null) {
                        HttpCommon.get(`/api/branch/${response1.data.data.branchId}`).then((response4) => {
                            console.log(response1.data.data);
                            console.log(trainerData);
                            const trainer = response1.data.data;
                            trainer.branch = response4.data.data;
                            setTrainerData(trainer);
                            console.log('Is It Done2');

                            setDataLoading(false);
                        });
                    } else {
                        console.log('Is It Done2');

                        setDataLoading(false);
                    }

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

        console.log(trainerId);
        if (trainerId !== undefined) {
            getTrainerDetails();
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
                                        trainerData={trainerData}
                                        memberCount={memberCount}
                                        schedulePending={scheduleData}
                                        dietPending={dietData}
                                        scheduleMonthlyCount={scheduleMonthlyCount}
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
                                                trainerData={trainerData}
                                                memberCount={memberCount}
                                                schedulePending={scheduleData}
                                                dietPending={dietData}
                                                scheduleMonthlyCount={scheduleMonthlyCount}
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
        const { trainerData, memberCount, schedulePending, dietPending, scheduleMonthlyCount, classes } = this.props;
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
                                trainerData={trainerData}
                                memberCount={memberCount}
                                schedulePending={schedulePending}
                                dietPending={dietPending}
                                scheduleMonthlyCount={scheduleMonthlyCount}
                            />
                        </div>
                        {/* </SubCard> */}
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default TrainerReport;
