import React, {createContext, useContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type InitialStateType = {
    user: any;
};

const initialState = {
    user: {},
};

const AppContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

function appReducer(prevState: any, action: {type: any; payload: any}) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...prevState,
                user: action.payload,
            };
        case 'UNSET_USER':
            return {
                ...prevState,
                user: null,
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
                const userFromStorage = await AsyncStorage.getItem('user');
                const user = userFromStorage
                    ? JSON.parse(userFromStorage)
                    : null;

                if (user) {
                    initialState.user = user;
                    dispatch({
                        type: 'SET_USER',
                        payload: user,
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
