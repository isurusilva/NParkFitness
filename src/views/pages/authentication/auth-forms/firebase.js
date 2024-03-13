// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
