import useRequest from './useRequest';
import {useContext} from 'react';
import {useAppContext} from '../contexts/AppContext';

const useJourneyQuery = () => {
    const request = useRequest();
    const {state, dispatch} = useAppContext();

    const getWeeklyUpdate = async () => {
        const response = await request.get('/journey/week');
        console.log('getWeeklyUpdate', response);
        if (!response?.error) {
            dispatch({
                type: 'SET_WEEKLY_UPDATE',
                payload: response,
            });
        }
        return response;
    };

    return {
        getWeeklyUpdate,
    };
};

export default useJourneyQuery;
