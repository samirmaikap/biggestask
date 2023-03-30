import useRequest from './useRequest';
import {useAppContext} from '../contexts/AppContext';

export const useScreenInfoQuery = () => {
    const request = useRequest();
    const {dispatch} = useAppContext();

    const getTerms = async () => {
        const response = await request.get('/info/terms');

        return response;
    };

    const getPrivacyPolicy = async () => {
        const response = await request.get('/info/privacy-policy');

        return response;
    };

    return {
        getTerms,
        getPrivacyPolicy,
    };
};
