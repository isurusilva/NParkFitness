import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import IncomeCard from '../dashboard-component/IncomeCard';
import SmallDarkCard from '../dashboard-component/SmallDarkCard';
import AttendanceCard from '../dashboard-component/AttendanceCard';
import SmallLightCard from '../dashboard-component/SmallLightCard';
import ServiceCard from '../dashboard-component/ServiceCard';
// import PopularCard from '../Default/PopularCard';
import TotalOrderLineChartCard from '../Default/TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../Default/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../Default/TotalIncomeLightCard';
import TotalGrowthBarChart from '../dashboard-component/TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

import HttpCommon from 'utils/http-common';
import { Store } from 'react-notifications-component';

import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';
import messages from 'utils/messages';
import { useNavigate } from 'react-router';
// ===========================|| DEFAULT DASHBOARD ||=========================== //

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const ManagerDashboard = () => {
    const [isLoading, setLoading] = useState(false);
    const [isDataLoading, setDataLoading] = useState(true);
    const [memberCount, setMemberCount] = useState(0);
    const [serviceCount, setServiceCount] = useState(0);
    const [exMemberCount, setExMemberCount] = useState(0);
    const [trainerCount, setTrainerCount] = useState(0);
    const [managerCount, setManagerCount] = useState(0);
    const [attendanceCount, setAttendanceCount] = useState();
    const [incomeCount, setIncomeCount] = useState();
    const [rawPayment, setRawPayment] = useState(0);
    const [serviceData, setServiceData] = useState();
    const navigate = useNavigate();

    // const branchId = 1;

    function getManagerDashboard() {
        // let arr = [];
        const userId = localStorage.getItem('userID');
        HttpCommon.get(`/api/user/${userId}`).then((response0) => {
            console.log(response0.data.data);
            const { branchId } = response0.data.data;
            if (branchId > 0) {
                HttpCommon.get(`/api/serviceType/getServiceTypeByBranchId/${branchId}`).then((response1) => {
                    console.log(response1.data.data);
                    setServiceData(response1.data.data);
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
            } else {
                const incomeArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                setIncomeCount(incomeArr);
                const body = {
                    chartMonthData: [],
                    chartYearData: [],
                    monthCount: 0,
                    yearCount: 0
                };

                setAttendanceCount(body);
                messages.addMessage({ title: 'Error Occured!', msg: 'User is not registered to a branch.', type: 'danger' });
                setDataLoading(false);
            }
        });
    }

    useEffect(() => {
        const type = localStorage.getItem('type');
        if (type !== 'Manager') {
            localStorage.clear();
            navigate('/', { replace: true });
        } else {
            getManagerDashboard();
        }
    }, []);

    useEffect(() => {
        console.log('Is It Done');
    }, [incomeCount]);

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
                                <IncomeCard isLoading={isLoading} amount={memberCount} title="Total Member Count" />
                            </Grid>
                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                <AttendanceCard isLoading={isLoading} data={attendanceCount} />
                            </Grid>
                            <Grid item lg={4} md={12} sm={12} xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item sm={6} xs={12} md={6} lg={12}>
                                        <SmallDarkCard
                                            isLoading={isLoading}
                                            amount={`${serviceCount} Services`}
                                            title="Total Services In Branch"
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={12} md={6} lg={12}>
                                        <SmallLightCard
                                            isLoading={isLoading}
                                            amount={`${exMemberCount} Membership`}
                                            title="Total Expired Memberships"
                                        />
                                    </Grid>
                                </Grid>
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
                                        <SmallDarkCard
                                            isLoading={isLoading}
                                            amount={`${trainerCount} Trainers`}
                                            title="Total Trainers In Branch"
                                        />
                                    </Grid>
                                    <Grid item sm={6} xs={12} md={12} lg={12}>
                                        <SmallLightCard
                                            isLoading={isLoading}
                                            amount={`${managerCount} Managers`}
                                            title="Total Managers In Branch"
                                        />
                                    </Grid>
                                </Grid>
                                <div style={{ height: '20px' }} />
                                <ServiceCard isLoading={isLoading} data={{ serviceType: serviceData.serviceType.slice(0, 5) }} isViewAll />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default ManagerDashboard;
