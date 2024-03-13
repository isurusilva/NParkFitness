import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import IncomeCard from '../dashboard-component/IncomeCard';
import SmallDarkCard from '../dashboard-component/SmallDarkCard';
import AttendanceCard from '../dashboard-component/AttendanceCard';
import SmallLightCard from '../dashboard-component/SmallLightCard';
import PopularCard from '../dashboard-component/PopularCard';
// import PopularCard from '../Default/PopularCard';
// import TotalOrderLineChartCard from '../Default/TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../Default/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../Default/TotalIncomeLightCard';
import TotalGrowthBarChart from '../dashboard-component/TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

import HttpCommon from 'utils/http-common';
import { Store } from 'react-notifications-component';
import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';
import BlueCard from '../dashboard-component/BlueCard';
import SubTypeCard from '../dashboard-component/SubTypeCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// ===========================|| ADMIN DASHBOARD ||=========================== //
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const AdminDashboard = () => {
    const [isLoading, setLoading] = useState(false);
    const [isDataLoading, setDataLoading] = useState(true);
    const [memberCount, setMemberCount] = useState();
    const [serviceCount, setServiceCount] = useState();
    const [exMemberCount, setExMemberCount] = useState();
    const [branchCount, setBranchCount] = useState();
    const [inActiveBranchCount, setInActiveBranchCount] = useState();
    const [trainerCount, setTrainerCount] = useState();
    const [managerCount, setManagerCount] = useState();
    const [gymCount, setGymCount] = useState();
    const [incomeCount, setIncomeCount] = useState();
    const [subTypeData, setSubTypeData] = useState();
    const [rawPayment, setRawPayment] = useState(0);
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();

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

            const rawPaymentArr = [[], [], [], [], [], [], [], [], [], [], [], []];
            await Promise.all(
                response.data.data.rawPaymentData.map((element) => {
                    const month = parseInt(element.date.slice(5, 7), 10);
                    rawPaymentArr[month - 1].push(element);
                    return 0;
                })
            );
            console.log(rawPaymentArr);
            setRawPayment(rawPaymentArr);

            console.log('Is It Done2');

            setDataLoading(false);
            // setLoading(false);
        });
    }

    useEffect(() => {
        console.log('customization.token');
        console.log(customization.token);
        const type = localStorage.getItem('type');
        if (type !== 'Admin') {
            localStorage.clear();
            navigate('/', { replace: true });
        } else {
            getAdminDashboard();
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
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            ) : (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                <IncomeCard
                                    isLoading={isLoading}
                                    amount={memberCount === undefined ? 0 : memberCount}
                                    title="Total Member Count"
                                />
                            </Grid>
                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                <BlueCard isLoading={isLoading} amount={gymCount} title="Total Gym Count" />
                            </Grid>
                            <Grid item lg={4} md={12} sm={12} xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item sm={6} xs={12} md={6} lg={12}>
                                        <SmallDarkCard
                                            isLoading={isLoading}
                                            amount={`${branchCount} Branches`}
                                            title="Total Active Branch"
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={12} md={6} lg={12}>
                                        <SmallLightCard
                                            isLoading={isLoading}
                                            amount={`${exMemberCount === undefined ? 0 : exMemberCount} Membership`}
                                            title="Inactive Membership"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={4} lg={4}>
                                <SmallDarkCard
                                    isLoading={isLoading}
                                    amount={`${inActiveBranchCount === undefined ? 0 : inActiveBranchCount} Branches`}
                                    title="Total Inactive Branch"
                                />
                            </Grid>
                            <Grid item sm={6} xs={12} md={4} lg={4}>
                                <SmallLightCard isLoading={isLoading} amount={`${trainerCount} Trainers`} title="Total Trainers" />
                            </Grid>
                            <Grid item sm={6} xs={12} md={4} lg={4}>
                                <SmallDarkCard isLoading={isLoading} amount={`${managerCount} Managers`} title="Total Managers" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={8}>
                                <TotalGrowthBarChart isLoading={isLoading} incomeData={incomeCount} rawData={rawPayment} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item sm={6} xs={12} md={12} lg={12}>
                                        <SmallLightCard isLoading={isLoading} amount={`${serviceCount} Service`} title="Total Services" />
                                    </Grid>
                                </Grid>
                                <div style={{ height: '20px' }} />
                                <SubTypeCard isLoading={isLoading} data={subTypeData.slice(0, 5)} isViewAll />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default AdminDashboard;
