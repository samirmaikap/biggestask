import {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';
import {apiInstance} from '../utils/service';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import useRequest from './useRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useAuthQuery() {
    const {state, dispatch} = useContext(AppContext);
    const request = useRequest();

    const getMe = async () => {
        const response = await request.get('/me');
        if (!response?.error) {
            dispatch({
                type: 'SET_USER',
                payload: response,
            });
        }
        return response;
    };

    const login = async (payload: any) => {
        const response = await request.post('/login', payload);
        if (!response?.error) {
            if (response?.token) {
                console.log('response?.token', response?.token);
                await AsyncStorage.setItem(
                    'token',
                    JSON.stringify(response?.token),
                );
                dispatch({
                    type: 'SET_TOKEN',
                    payload: response?.token,
                });
            }
            dispatch({
                type: 'SET_USER',
                payload: response,
            });
            console.log('response?.token', response?.token);
        }
        console.log('re', response);
        return response;
    };

    const register = async (payload: any) => {
        console.log('payload', payload);
        const response = await request.post('/register', payload);
        console.log('register response', response);
        if (!response?.error) {
            if (response?.token) {
                await AsyncStorage.setItem(
                    'token',
                    JSON.stringify(response?.token),
                );
                dispatch({
                    type: 'SET_TOKEN',
                    payload: response?.token,
                });
            }
            dispatch({
                type: 'SET_USER',
                payload: response,
            });
            console.log('response?.token', response?.token);
        }
        return response;
    };

    const verifyOtp = async (payload: any) => {
        const response = await request.post('/otp/verify', payload);
        if (!response?.error) {
            dispatch({
                type: 'SET_EMAIL_VERIFIED',
                payload: true,
            });
        }
        return response;
    };

    const sendOtp = async (payload: any) => {
        console.log('payload?.email', payload?.email);
        const response = await request.post('/otp/send', payload);
        if (!response?.error) {
            dispatch({
                type: 'SET_EMAIL',
                payload: payload?.email,
            });
        }
        return response;
    };

    const logout = async () => {
        dispatch({
            type: 'UNSET_TOKEN',
            payload: null,
        });
    };

    return {
        login,
        register,
        verifyOtp,
        sendOtp,
        getMe,
        logout,
    };
}

export default useAuthQuery;
