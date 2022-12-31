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

    const getJourney = async () => {
        const response = await request.get('/journey');
        console.log('journey response', response);
        if (!response?.error) {
            dispatch({
                type: 'SET_JOURNEY',
                payload: response,
            });

            dispatch({
                type: 'SET_PARENT_1',
                payload: response.parent_1,
            });

            dispatch({
                type: 'SET_PARENT_2',
                payload: response.parent_2,
            });

            dispatch({
                type: 'SET_SURROGATE',
                payload: response.surrogate,
            });
        }
    };

    return {
        getWeeklyUpdate,
        getJourney,
    };
};

export default useJourneyQuery;
