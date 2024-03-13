import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// ===========================|| APP ||=========================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    // TODO: Replace with your app's Firebase project configuration
    const firebaseConfig = {
        apiKey: 'AIzaSyDqSwxdurpJuoKWgGufwGKzU69EWr4TirQ',
        authDomain: 'gymapp-955fe.firebaseapp.com',
        databaseURL: 'https://gymapp-955fe-default-rtdb.firebaseio.com',
        projectId: 'gymapp-955fe',
        storageBucket: 'gymapp-955fe.appspot.com',
        messagingSenderId: '996560333790',
        appId: '1:996560333790:web:e15c5129a3bc4630a70b4f',
        measurementId: 'G-42E22Y0NJC'
    };

    const app = initializeApp(firebaseConfig);

    // Get a reference to the database service
    const database = getDatabase(app);

    return (
        <div className="app-container">
            <ReactNotifications />
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </div>
    );
};

export default App;
