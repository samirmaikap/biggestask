import {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';
import {apiInstance} from '../utils/service';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import useRequest from './useRequest';

function useAuthQuery() {
    const {state, dispatch} = useContext(AppContext);
    const request = useRequest();

    const login = async () => {
        const response = await request.post('/login', {
            email: 'meetdev0003dddd@gmail.com',
        });

        console.log('re', response);

        // if (response?.message) {
        //     toast.show('Something went wrong!');
        // }
        //
        // if (!response?.message) {
        //     dispatch({
        //         type: 'SET_USER',
        //         payload: response,
        //     });
        // }
    };

    const register = async (payload: any) => {
        const response = await request.post('/register', payload);
        console.log(response);
        if (response?.success) {
            dispatch({
                type: 'SET_USER',
                payload: response.data,
            });
        }
        return response;
    };

    const verifyOtp = async (payload: any) => {
        const response = await request.post('/otp/verify', payload);
        if (response?.success) {
            dispatch({
                type: 'SET_EMAIL_VERIFIED',
                payload: true,
            });
        }
        return response;
    };

    const sendOtp = async (payload: any) => {
        const response = await request.post('/otp/send', payload);
        if (response?.success) {
            dispatch({
                type: 'SET_EMAIL',
                payload: payload?.email,
            });
        }
        return response;
    };

    return {
        login,
        register,
        verifyOtp,
        sendOtp,
    };
}

export default useAuthQuery;
