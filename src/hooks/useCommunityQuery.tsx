import useRequest from './useRequest';
import {useAppContext} from '../contexts/AppContext';
import {useEffect} from 'react';

const useCommunityQuery = () => {
    const request = useRequest();
    const {state, dispatch} = useAppContext();

    const getCommunities = async () => {
        const response = await request.get('/communities');
        if (!response?.error) {
            dispatch({
                type: 'SET_COMMUNITIES',
                payload: response,
            });
        }
        return response;
    };

    const createCommunities = async (payload: any) => {
        const response = await request.post('/communities', payload);
        // if (!response?.error) {
        //     console.log('get comms....');
        //     await getCommunities();
        // }

        return response;
    };

    const updateCommunities = async (payload: any, communityId: number) => {
        const response = await request.post(
            `/communities/${communityId}`,
            payload,
        );
        if (!response?.error) {
            await getCommunities();
        }

        return response;
    };

    const deleteCommunities = async (communityId: number) => {
        const response = await request.remove(`/communities/${communityId}`);
        if (!response?.error) {
            await getCommunities();
        }

        return response;
    };

    return {
        getCommunities,
        createCommunities,
        updateCommunities,
        deleteCommunities,
    };
};

export default useCommunityQuery;
