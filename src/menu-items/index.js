import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';

// ===========================|| MENU ITEMS ||=========================== //

const menuItems = () => {
    // const type = localStorage.getItem('type');
    // console.log('type');
    // console.log(type);
    const menuItems = {
        items: [dashboard(), pages()]
    };
    return menuItems;
};
// const menuItems = {
//     items: [dashboard(), pages]
// };

export default menuItems;
