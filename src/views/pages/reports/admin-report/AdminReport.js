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
import TotalGrowthBarChart from 'views/dashboard/dashboard-component/TotalGrowthBarChart';
import AttendanceChart from '../branch-report/AttendanceChart';
import PopularCard from 'views/dashboard/dashboard-component/PopularCard';
import SubTypeCard from 'views/dashboard/dashboard-component/SubTypeCard';

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

const Report = ({
    memberCount,
    serviceCount,
    exMemberCount,
    branchCount,
    inActiveBranchCount,
    trainerCount,
    managerCount,
    gymCount,
    incomeCount,
    subTypeData
}) => {
    theme = useTheme();
    const classes = useStyles();

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
                    Admin Report
                </Typography>
                <Typography variant="h5" fontSize="14px" textAlign="center" marginBottom="40px">
                    NPartFitness
                </Typography>
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
                    <Grid item xs={4}>
                        <SquareCard title="Active Members" amount={branchCount} icon="active" />
                    </Grid>
                    <Grid item xs={4}>
                        <SquareCard
                            title="InActive Members"
                            amount={inActiveBranchCount === undefined ? 0 : inActiveBranchCount}
                            isPrimary
                            icon="inactive"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SquareCard title="Service Count" amount={serviceCount} icon="service" />
                    </Grid>
                    <Grid item xs={6}>
                        <SmallCard title="Expired Memberships" amount={exMemberCount === undefined ? 0 : exMemberCount} />
                    </Grid>
                    <Grid item xs={6}>
                        <SmallCard title="Gym Count" amount={gymCount} isPrimary />
                    </Grid>
                </Grid>
                <TotalGrowthBarChart incomeData={incomeCount} />
                <div style={{ height: '10px' }} />
                <SubTypeCard data={subTypeData} />
            </SubCard>
        </>
    );
};

//= ===============================|| Payment Success Page ||================================//

const AdminReport = () => {
    const theme = useTheme();
    const classes = useStyles();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const componentRef = useRef(null);
    const [memberCount, setMemberCount] = React.useState();
    const [serviceCount, setServiceCount] = React.useState();
    const [exMemberCount, setExMemberCount] = React.useState();
    const [branchCount, setBranchCount] = React.useState();
    const [inActiveBranchCount, setInActiveBranchCount] = React.useState();
    const [trainerCount, setTrainerCount] = React.useState();
    const [managerCount, setManagerCount] = React.useState();
    const [gymCount, setGymCount] = React.useState();
    const [incomeCount, setIncomeCount] = React.useState();
    const [subTypeData, setSubTypeData] = React.useState();
    const [isDataLoading, setDataLoading] = React.useState(true);
    const [display, setDisplay] = React.useState('none');

    // const trainerId = 4;
    // const userId = 1;
    const gymId = 1;

    function getAdminDashboard() {
        // let arr = [];

        HttpCommon.get(`api/dashboard/getAdminDashboardData`).then(async (response) => {
            console.log(response.data.data);
            setServiceCount(response.data.data.serviceCount);
            setBranchCount(response.data.data.branchCount);
            setGymCount(response.data.data.gymCount);
            setSubTypeData(response.data.data.subscriptionType);

            await Promise.all(
                await response.data.data.branchCount.map((element) => {
                    if (element.isActive) {
                        setBranchCount(element.count);
                    } else {
                        setInActiveBranchCount(element.count);
                    }
                    return 0;
                })
            );

            let totalMemberCount = 0;
            await Promise.all(
                await response.data.data.memberCount.map((element) => {
                    totalMemberCount += element.count;
                    if (!element.isActive) {
                        setExMemberCount(element.count);
                    }
                    return 0;
                })
            );
            setMemberCount(totalMemberCount);

            await Promise.all(
                await response.data.data.userCount.map((element) => {
                    if (element.type === 'Manager') {
                        setManagerCount(element.count);
                    } else if (element.type === 'Trainer') {
                        setTrainerCount(element.count);
                    }
                    return 0;
                })
            );

            const incomeArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            await Promise.all(
                response.data.data.payment.map((element) => {
                    const month = parseInt(element.date.slice(5, 7), 10);
                    incomeArr[month - 1] = element.totalAmount;
                    return 0;
                })
            );
            console.log(incomeArr);
            setIncomeCount(incomeArr);
            console.log('Is It Done2');

            setDataLoading(false);
            // setLoading(false);
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
        getAdminDashboard();
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
                                        memberCount={memberCount}
                                        serviceCount={serviceCount}
                                        exMemberCount={exMemberCount}
                                        branchCount={branchCount}
                                        inActiveBranchCount={inActiveBranchCount}
                                        trainerCount={trainerCount}
                                        managerCount={managerCount}
                                        gymCount={gymCount}
                                        incomeCount={incomeCount}
                                        subTypeData={subTypeData}
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
                                                memberCount={memberCount}
                                                serviceCount={serviceCount}
                                                exMemberCount={exMemberCount}
                                                branchCount={branchCount}
                                                inActiveBranchCount={inActiveBranchCount}
                                                trainerCount={trainerCount}
                                                managerCount={managerCount}
                                                gymCount={gymCount}
                                                incomeCount={incomeCount}
                                                subTypeData={subTypeData}
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
            memberCount,
            serviceCount,
            exMemberCount,
            branchCount,
            inActiveBranchCount,
            trainerCount,
            managerCount,
            gymCount,
            incomeCount,
            subTypeData,
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
                                memberCount={memberCount}
                                serviceCount={serviceCount}
                                exMemberCount={exMemberCount}
                                branchCount={branchCount}
                                inActiveBranchCount={inActiveBranchCount}
                                trainerCount={trainerCount}
                                managerCount={managerCount}
                                gymCount={gymCount}
                                incomeCount={incomeCount}
                                subTypeData={subTypeData}
                            />
                        </div>
                        {/* </SubCard> */}
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default AdminReport;
