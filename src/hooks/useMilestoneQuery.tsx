import useRequest from './useRequest';
import {useContext} from 'react';
import {useAppContext} from '../contexts/AppContext';

const useMilestoneQuery = () => {
    const request = useRequest();
    const {state, dispatch} = useAppContext();

    const getMilestones = async () => {
        const response = await request.get('/milestones');
        console.log('getMilestones', response);
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
            await getMilestones();
        }

        return response;
    };

    const updateMilestone = async (payload: any, milestoneId: number) => {
        const response = await request.post(
            `/milestones/${milestoneId}`,
            payload,
        );
        if (!response?.error) {
            await getMilestones();
        }

        return response;
    };

    const deleteMilestone = async (milestoneId: number) => {
        const response = await request.remove(`/milestones/${milestoneId}`);
        if (!response?.error) {
            await getMilestones();
        }

        return response;
    };

    return {
        getMilestones,
        createMilestone,
        updateMilestone,
        deleteMilestone,
    };
};

export default useMilestoneQuery;
