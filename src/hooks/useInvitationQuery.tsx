import {useContext} from 'react';
import {useAppContext} from '../contexts/AppContext';
import useRequest from './useRequest';

const useInvitationQuery = () => {
    const {state, dispatch} = useAppContext();
    const request = useRequest();

    const sendInvitation = async (payload: any) => {
        const response = await request.post('/invitations', payload);
        return response;
    };

    return {
        sendInvitation,
    };
};

export default useInvitationQuery;
