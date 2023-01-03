import useRequest from './useRequest';
import {useContext} from 'react';
import {useAppContext} from '../contexts/AppContext';

const useContactQuery = () => {
    const request = useRequest();
    const {state, dispatch} = useAppContext();

    const getContacts = async () => {
        const response = await request.get('/contacts');
        console.log('getContacts', response);
        if (!response?.error) {
            dispatch({
                type: 'SET_CONTACTS',
                payload: response,
            });
        }
        return response;
    };

    const createContact = async (payload: any) => {
        const response = await request.post('/contacts', payload);

        return response;
    };

    const updateContact = async (payload: any, contactId: number) => {
        const response = await request.post(`/contacts/${contactId}`, payload);

        return response;
    };

    const deleteContact = async (contactId: number) => {
        const response = await request.remove(`/contacts/${contactId}`);

        return response;
    };

    return {
        getContacts,
        createContact,
        updateContact,
        deleteContact,
    };
};

export default useContactQuery;
