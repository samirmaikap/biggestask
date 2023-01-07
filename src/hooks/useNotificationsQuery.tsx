import useRequest from './useRequest';
import {useAppContext} from '../contexts/AppContext';

const useNotificationsQuery = () => {
    const request = useRequest();
    const {dispatch} = useAppContext();

    const getNotifications = async () => {
        const response = await request.get('/notifications');
        console.log('response', response);
        if (!response?.error) {
            dispatch({
                type: 'SET_NOTIFICATIONS',
                payload: response,
            });
        }
        return response;
    };

    const updateNotificationRead = async (notificationId: any) => {
        const response = await request.put(
            `/notifications/${notificationId}/read`,
            {},
        );

        return response;
    };

    return {getNotifications, updateNotificationRead};
};

export default useNotificationsQuery;
