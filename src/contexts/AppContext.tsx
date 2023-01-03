import React, {createContext, useContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiInstance} from '../utils/service';

type InitialStateType = {
    isFirstLoad: boolean;
    authToken: any;
    tempEmail: any;
    tempEmailVerified: boolean;
    user: any;
    surrogateQuestions: any;
    parentQuestions: any;
    milestones: any;
    communities: any;
    weeklyUpdate: any;
    contacts: any;
    journey: any;
    parent1: any;
    parent2: any;
    surrogate: any;
    nextMilestone: any;
};

const initialState = {
    isFirstLoad: false,
    authToken: null,
    user: null,
    tempEmail: null,
    tempEmailVerified: false,
    parentQuestions: [],
    surrogateQuestions: [],
    milestones: [],
    communities: [],
    weeklyUpdate: null,
    contacts: [],
    journey: null,
    parent1: null,
    parent2: null,
    surrogate: null,
    nextMilestone: {},
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
        case 'SET_JOURNEY':
            return {
                ...prevState,
                journey: action.payload,
            };
        case 'SET_PARENT_1':
            return {
                ...prevState,
                parent1: action.payload,
            };
        case 'SET_PARENT_2':
            return {
                ...prevState,
                parent2: action.payload,
            };
        case 'SET_SURROGATE':
            return {
                ...prevState,
                surrogate: action.payload,
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
        case 'SET_COMMUNITIES':
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
        case 'SET_PARENT_QUESTIONS':
            return {
                ...prevState,
                parentQuestions: action.payload,
            };
        case 'SET_SURROGATE_QUESTIONS':
            return {
                ...prevState,
                surrogateQuestions: action.payload,
            };
        case 'SET_NEXT_MILESTONE':
            return {
                ...prevState,
                nextMilestone: action.payload,
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
