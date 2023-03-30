import {useAppContext} from '../contexts/AppContext';
import useRequest from './useRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useAuthQuery() {
    const {state, dispatch} = useAppContext();
    const request = useRequest();

    const getMe = async () => {
        const response = await request
            .get('/me')
            .catch(e => console.log('e', e));
        if (!response?.error) {
            dispatch({
                type: 'SET_USER',
                payload: response,
            });
        }
        return response;
    };

    const updateMe = async (payload: any) => {
        const response = await request.put('/me', payload);
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
                await AsyncStorage.setItem(
                    'apiToken',
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
        }
        return response;
    };

    const register = async (payload: any) => {
        const response = await request.post('/register', payload);
        if (!response?.error) {
            if (response?.token) {
                await AsyncStorage.setItem(
                    'apiToken',
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
        const response = await request.post('/logout', {});
        if (!response?.error) {
            dispatch({
                type: 'UNSET_TOKEN',
                payload: null,
            });
            dispatch({
                type: 'SET_USER',
                payload: null,
            });
        }
    };

    const updateFrequency = async (payload: any) => {
        const response = await request.put('/me/frequency', payload);
        return response;
    };
    const updateShowPregnancy = async (payload: any) => {
        const response = await request.put('/me/show-pregnancy', payload);
        return response;
    };
    const updateFcmToken = async (fcmToken: any) => {
        const response = await request.put('/me/fcm-token', {
            fcm_token: fcmToken,
        });
        return response;
    };

    const updateTimezone = async (timezone: any) => {
        const response = await request.put('/me/timezone', {
            timezone: timezone,
        });
        return response;
    };

    const requestResetPassword = async (payload: any) => {
        const response = await request.post('/forget-password', payload);
        if (!response?.error) {
            dispatch({
                type: 'SET_EMAIL',
                payload: payload?.email,
            });
        }
        return response;
    };

    const changePassword = async (payload: any) => {
        const response = await request.post('/password-reset', payload);
        return response;
    };

    const deleteAccount = async () => {
        const response = await request.remove('/me');
        return response;
    };

    return {
        login,
        register,
        verifyOtp,
        sendOtp,
        getMe,
        logout,
        updateMe,
        updateFrequency,
        updateShowPregnancy,
        updateFcmToken,
        requestResetPassword,
        changePassword,
        updateTimezone,
        deleteAccount,
    };
}

export default useAuthQuery;
