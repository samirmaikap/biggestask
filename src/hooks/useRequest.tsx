import {apiInstance} from '../utils/service';
import {err} from 'react-native-svg/lib/typescript/xml';

const useRequest = () => {
    const get = async (url: string) => {
        return await apiInstance
            .get(url)
            .then(res => res.data)
            .catch(e => {
                return parseResponse(e);
            });
    };

    const post = async (url: string, payload: any) => {
        return await apiInstance
            .post(url, payload, {
                headers: {},
            })
            .then(res => res.data)
            .catch(e => {
                return parseResponse(e);
            });
    };

    const upload = async (url: string, payload: any) => {
        return await apiInstance
            .post(url, payload)
            .then(res => console.log('red', res))
            .catch(e => {
                console.log('eeror', e);
            });
    };

    const put = async (url: string, payload: any) => {
        return await apiInstance
            .put(url, payload)
            .then(res => res.data)
            .catch(e => {
                return parseResponse(e);
            });
    };

    const remove = async (url: string) => {
        return await apiInstance
            .delete(url)
            .then(res => res.data)
            .catch(e => {
                return parseResponse(e);
            });
    };

    const parseResponse = (e: any) => {
        if (e?.response.status === 422) {
            const errors = Object.values(e?.response?.data.message).flat();
            return {
                error: true,
                message: errors[0],
                status: e?.response.status,
            };
        }

        return {
            ...e?.response?.data,
            status: e?.response.status,
        };
    };

    return {
        get,
        post,
        put,
        remove,
        upload,
    };
};

export default useRequest;
