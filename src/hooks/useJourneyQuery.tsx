import useRequest from './useRequest';
import {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';

const useJourneyQuery = () => {
    const request = useRequest();
    const {dispatch} = useContext(AppContext);

    const getWeeklyUpdate = async () => {
        const response = await request.get('/journey/week');
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
