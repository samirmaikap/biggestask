import React, {createContext, useContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiInstance} from '../utils/service';

type InitialStateType = {
    isFirstLoad: boolean;
    authToken: any;
    tempEmail: any;
    tempEmailVerified: boolean;
    user: any;
    questions: any;
    milestones: any;
    communities: any;
    weeklyUpdate: any;
    contacts: any;
};

const initialState = {
    isFirstLoad: false,
    authToken: null,
    user: null,
    tempEmail: null,
    tempEmailVerified: false,
    questions: null,
    milestones: null,
    communities: null,
    weeklyUpdate: null,
    contacts: null,
};

const AppContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => {},
});

const setLoginParams = async (token: any) => {
    apiInstance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    apiInstance.defaults.headers.common.Authorization = token
        ? `Bearer ${token}`
        : null;
};

const unsetLoginParams = async () => {
    await AsyncStorage.removeItem('token');
};

function appReducer(prevState: any, action: {type: any; payload: any}) {
    switch (action.type) {
        case 'SET_FIRST_LOAD':
            return {
                ...prevState,
                isFirstLoad: action.payload,
            };
        case 'SET_TOKEN':
            setLoginParams(action.payload);
            return {
                ...prevState,
                authToken: action.payload,
            };
        case 'UNSET_TOKEN':
            unsetLoginParams();
            return {
                ...prevState,
                authToken: null,
            };
        case 'SET_USER':
            console.log('set user called', action.payload);
            return {
                ...prevState,
                user: action.payload,
            };
        case 'SET_EMAIL':
            return {
                ...prevState,
                tempEmail: action.payload,
            };
        case 'SET_EMAIL_VERIFIED':
            return {
                ...prevState,
                tempEmailVerified: action.payload,
            };
        case 'setCommunities':
            console.log('update....communties', action.payload);
            return {
                ...prevState,
                communities: action.payload,
            };
        case 'SET_CONTACTS':
            return {
                ...prevState,
                contacts: action.payload,
            };
        case 'SET_WEEKLY_UPDATE':
            return {
                ...prevState,
                weeklyUpdate: action.payload,
            };
        case 'SET_MILESTONES':
            return {
                ...prevState,
                milestones: action.payload,
            };
        case 'SET_QUESTIONS':
            return {
                ...prevState,
                questions: action.payload,
            };
        default:
            return prevState;
    }
}

type Props = {
    children: React.ReactNode;
};

export const AppProvider = (props: Props) => {
    const {children} = props;

    useEffect(() => {
        (async () => {
            try {
                const tokenFromStorage = await AsyncStorage.getItem('apiToken');
                const authToken = tokenFromStorage
                    ? JSON.parse(tokenFromStorage)
                    : null;

                if (authToken) {
                    dispatch({
                        type: 'SET_TOKEN',
                        payload: authToken,
                    });
                }
            } catch (e) {
                console.warn(e);
            }
        })();
    }, []);

    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
export default AppContext;
