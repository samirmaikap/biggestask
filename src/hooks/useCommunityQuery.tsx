import useRequest from './useRequest';
import {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';

const useCommunityQuery = () => {
    const request = useRequest();
    const {dispatch} = useContext(AppContext);

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
        if (!response?.error) {
            await getCommunities();
        }

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
