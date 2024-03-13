import React, { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// project imports
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const PaymentSuccess = Loadable(lazy(() => import('views/pages/subscription/PaymentSuccessPage')));
const MemberReport = Loadable(lazy(() => import('views/pages/reports/member-report/MemberReport')));
const TrainerReport = Loadable(lazy(() => import('views/pages/reports/trainer-report/TrainerReport')));
const BranchReport = Loadable(lazy(() => import('views/pages/reports/branch-report/BranchReport')));
const GymReport = Loadable(lazy(() => import('views/pages/reports/gym-report/GymReport')));
const PaymentReport = Loadable(lazy(() => import('views/pages/reports/payment-report/PaymentReport')));
const PariceView = Loadable(lazy(() => import('views/pages/subscription/component/PriceView')));
const AdminReport = Loadable(lazy(() => import('views/pages/reports/admin-report/AdminReport')));
const SubPaymentReport = Loadable(lazy(() => import('views/pages/reports/subPay-report/SubPaymentReport')));

// ===========================|| AUTHENTICATION ROUTING ||=========================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/login/login3',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        },
        {
            path: '/pages/paymentSuccess',
            element: <PaymentSuccess />
        },
        {
            path: '/pages/report/memberReport',
            element: <MemberReport />
        },
        {
            path: '/pages/report/trainerReport',
            element: <TrainerReport />
        },
        {
            path: '/pages/report/branchReport',
            element: <BranchReport />
        },
        {
            path: '/pages/report/gymReport',
            element: <GymReport />
        },
        {
            path: '/pages/report/paymentReport',
            element: <PaymentReport />
        },
        {
            path: '/pages/price',
            element: <PariceView />
        },
        {
            path: '/pages/report/subPaymentReport',
            element: <SubPaymentReport />
        },
        {
            path: '/pages/report/adminReport',
            element: <AdminReport />
        }
    ]
};

export default AuthenticationRoutes;
