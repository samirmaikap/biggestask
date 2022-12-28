import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiInstance} from '../utils/service';

type InitialStateType = {
    loginInfo: any;
    tempEmail: any;
    tempEmailVerified: boolean;
    user: any;
};

const initialState = {
    loginInfo: {},
    user: {},
    tempEmail: '',
    tempEmailVerified: false,
};

const AppContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

const setLoginParams = (loginInfo: any) => {
    apiInstance.defaults.params.user_id = loginInfo?.user_id;
    apiInstance.defaults.params.type = loginInfo?.type;
    apiInstance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
};

const unsetLoginParams = () => {
    apiInstance.defaults.params.user_id = '';
};

function appReducer(prevState: any, action: {type: any; payload: any}) {
    switch (action.type) {
        case 'SET_LOGIN':
            setLoginParams(action.payload);
            return {
                ...prevState,
                loginInfo: action.payload,
            };
        case 'UNSET_LOGIN':
            unsetLoginParams();
            return {
                ...prevState,
                loginInfo: action.payload,
            };
        case 'SET_USER':
            setLoginParams(action.payload);
            return {
                ...prevState,
                user: action.payload,
            };
        case 'UNSET_USER':
            return {
                ...prevState,
                user: null,
            };
        case 'SET_EMAIL':
            return {
                ...prevState,
                tempEmail: action.payload,
            };
        case 'SET_EMAIL_VERIFIED':
            return {
                ...prevState,
                tempEmail: action.payload,
            };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

type Props = {
    children: React.ReactNode;
};

const AppProvider = (props: Props) => {
    const {children} = props;

    useEffect(() => {
        (async () => {
            try {
                const userFromStorage = await AsyncStorage.getItem('loginInfo');
                const loginInfo = userFromStorage
                    ? JSON.parse(userFromStorage)
                    : null;

                if (loginInfo) {
                    initialState.loginInfo = loginInfo;
                    dispatch({
                        type: 'SET_LOGIN',
                        payload: loginInfo,
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

export {AppContext, AppProvider};
