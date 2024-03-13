// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

function dashboardRoute() {
    const type = localStorage.getItem('type');
    switch (type) {
        case 'Admin':
            return {
                id: 'default',
                title: 'Admin Dashboard',
                type: 'item',
                url: '/pages/dashboard/admin',
                icon: icons.IconDashboard,
                breadcrumbs: false
            };
        case 'Owner':
            return {
                id: 'owner',
                title: 'Owner Dashboard',
                type: 'item',
                url: '/pages/dashboard/owner',
                icon: icons.IconDashboard,
                breadcrumbs: false
            };
        case 'Manager':
            return {
                id: 'manager',
                title: 'Manager Dashboard',
                type: 'item',
                url: '/pages/dashboard/manager',
                icon: icons.IconDashboard,
                breadcrumbs: false
            };
        case 'Trainer':
            return {
                id: 'trainer',
                title: 'Trainer Dashboard',
                type: 'item',
                url: '/pages/dashboard/trainer',
                icon: icons.IconDashboard,
                breadcrumbs: false
            };
        default:
            return {
                id: 'trainer',
                title: 'Trainer Dashboard',
                type: 'item',
                url: '/pages/dashboard/trainer',
                icon: icons.IconDashboard,
                breadcrumbs: false
            };
    }
}

const dashboard = () => {
    // const type = localStorage.getItem('type');
    // console.log('type');
    // console.log(type);
    const dashboard = {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'group',
        children: [dashboardRoute()]
    };
    return dashboard;
};

// const dashboard = {
//     id: 'dashboard',
//     title: 'Dashboard',
//     type: 'group',
//     children: [dashboardRoute()]
// };

export default dashboard;
