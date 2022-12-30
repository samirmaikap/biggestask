import {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';
import useRequest from './useRequest';

const useInvitationQuery = () => {
    const {state, dispatch} = useContext(AppContext);
    const request = useRequest();

    const sendInvitation = async (payload: any) => {
        const response = await request.post('/invitations', payload);
        console.log('inv response', response);
        return response;
    };

    return {
        sendInvitation,
    };
};

export default useInvitationQuery;
