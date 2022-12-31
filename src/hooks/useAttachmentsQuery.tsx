import useRequest from './useRequest';
import {useContext} from 'react';
import {useAppContext} from '../contexts/AppContext';

const useAttachmentsQuery = () => {
    const request = useRequest();
    const {state, dispatch} = useAppContext();

    const uploadImage = async (formData: any) => {
        return await request.post('/attachments', formData);
    };

    return {uploadImage};
};

export default useAttachmentsQuery;
