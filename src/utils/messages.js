import { Store } from 'react-notifications-component';

const Message = ({ title, msg, type }) => {
    console.log(msg);
    Store.addNotification({
        title,
        message: msg,
        type,
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 2500,
            onScreen: true
        },
        width: 500
    });
};

const addMessage = ({ title, msg, type }) =>
    Store.addNotification({
        title,
        message: msg,
        type,
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 2500,
            onScreen: true
        },
        width: 500
    });

export default { Message, addMessage };
