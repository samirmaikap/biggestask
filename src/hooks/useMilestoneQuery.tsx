import useRequest from './useRequest';
import {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';

const useMilestoneQuery = () => {
    const request = useRequest();
    const {dispatch} = useContext(AppContext);

    const getMilestone = async () => {
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
        if (!response?.error) {
            await getMilestone();
        }

        return response;
    };

    const updateMilestone = async (payload: any, milestoneId: number) => {
        const response = await request.post(
            `/milestones/${milestoneId}`,
            payload,
        );
        if (!response?.error) {
            await getMilestone();
        }

        return response;
    };

    const deleteMilestone = async (milestoneId: number) => {
        const response = await request.remove(`/milestones/${milestoneId}`);
        if (!response?.error) {
            await getMilestone();
        }

        return response;
    };

    return {
        getMilestone,
        createMilestone,
        updateMilestone,
        deleteMilestone,
    };
};

export default useMilestoneQuery;
