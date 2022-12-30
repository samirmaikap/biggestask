import useRequest from './useRequest';
import {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';

const useContactQuery = () => {
    const request = useRequest();
    const {dispatch} = useContext(AppContext);

    const getContact = async () => {
        const response = await request.get('/contacts');
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
        if (!response?.error) {
            await getContact();
        }

        return response;
    };

    const updateContact = async (payload: any, contactId: number) => {
        const response = await request.post(`/contacts/${contactId}`, payload);
        if (!response?.error) {
            await getContact();
        }

        return response;
    };

    const deleteContact = async (contactId: number) => {
        const response = await request.remove(`/contacts/${contactId}`);
        if (!response?.error) {
            await getContact();
        }

        return response;
    };

    return {
        getContact,
        createContact,
        updateContact,
        deleteContact,
    };
};

export default useContactQuery;
