import {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';

function useAuth() {
    const {state, dispatch} = useContext(AppContext);

    const login = () => {
        dispatch({
            type: 'SET_USER',
            payload: {name: 'Samir'},
        });

        console.log(state?.user);
    };

    const register = () => {};

    return {
        login,
        register,
    };
}

export default useAuth;
