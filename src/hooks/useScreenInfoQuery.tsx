import useRequest from './useRequest';
import {useAppContext} from '../contexts/AppContext';

export const useScreenInfoQuery = () => {
    const request = useRequest();
    const {dispatch} = useAppContext();

    const getTerms = async () => {
        const response = await request.get('/info/terms');
        console.log('res', response);

        return response;
    };

    const getPrivacyPolicy = async () => {
        const response = await request.get('/info/privacy-policy');
        console.log('res', response);

        return response;
    };

    return {
        getTerms,
        getPrivacyPolicy,
    };
};
