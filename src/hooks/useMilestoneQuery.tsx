import useRequest from './useRequest';
import {useContext} from 'react';
import {useAppContext} from '../contexts/AppContext';

const useMilestoneQuery = () => {
    const request = useRequest();
    const {state, dispatch} = useAppContext();

    const getMilestones = async () => {
        const response = await request.get('/milestones');
        if (!response?.error) {
            dispatch({
                type: 'SET_MILESTONES',
                payload: response,
            });
        }
        return response;
    };

    const createMilestone = async (payload: any) => {
        const response = await request.post('/milestones', payload);
        return response;
    };

    const updateMilestone = async (payload: any, milestoneId: number) => {
        const response = await request.put(
            `/milestones/${milestoneId}`,
            payload,
        );

        return response;
    };

    const deleteMilestone = async (milestoneId: number) => {
        const response = await request.remove(`/milestones/${milestoneId}`);

        return response;
    };

    const resetMilestones = async (payload: any) => {
        const response = await request.post('/milestones/reset', payload);

        return response;
    };

    return {
        getMilestones,
        createMilestone,
        updateMilestone,
        deleteMilestone,
        resetMilestones,
    };
};

export default useMilestoneQuery;
