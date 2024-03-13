import axios from 'axios';
import { useSelector } from 'react-redux';
import { store } from '../store/index';
import { Navigate } from 'react-router-dom';
import React, { Component } from 'react';
import { Store } from 'react-notifications-component';
import Message from 'utils/messages';

// const { token } = store.getState();

// // const token = customization.token;
// console.log('token');
// console.log(token);
// console.log(store.getState().token);
const instance = axios.create({
    // baseURL: 'http://node-env.eba-pakmdcpw.us-east-2.elasticbeanstalk.com/',
    baseURL: 'https://npark-fitness-backend.herokuapp.com/',
    // baseURL: 'http://localhost:3005',
    // baseURL: "http://192.168.1.24:3005",
    timeout: 30000,
    headers: {
        // 'Access-Control-Allow-Origin' : '*',
        // Authorization: `Bearer ${token}`,
        'Content-type': 'application/json'
    }
});

instance.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        const token = localStorage.getItem('token');
        // console.log('token');
        // console.log(token);
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        // Do something with request error
        console.log(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // console.log(response);
        console.log(response.status);
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log(error);
        console.log(error.response);
        if (error.response !== undefined && error.response.status === 402) {
            console.log('error');
            window.location = '/';
        } else {
            let msg = 'Cannot find the Server';
            if (error.response.data !== undefined && error.response.data.message !== undefined) {
                msg = error.response.data.message;
            }
            Message.addMessage({ title: 'Error was Occured!', msg, type: 'danger' });
        }
        return Promise.reject(error);
    }
);

export default instance;
