import {apiInstance} from '../utils/service';

const useRequest = () => {
    const get = async (url: string) => {
        return await apiInstance
            .get(url)
            .then(res => res.data)
            .catch(e => {
                return {
                    ...e?.response?.data,
                    status: e?.response.status,
                };
            });
    };

    const post = async (url: string, payload: any) => {
        return await apiInstance
            .post(url, payload)
            .then(res => res.data)
            .catch(e => {
                return {
                    ...e?.response?.data,
                    status: e?.response.status,
                };
            });
    };

    const put = async (url: string, payload: any) => {
        return await apiInstance
            .put(url, payload)
            .then(res => res.data)
            .catch(e => {
                return {
                    ...e?.response?.data,
                    status: e?.response.status,
                };
            });
    };

    const remove = async (url: string) => {
        return await apiInstance
            .delete(url)
            .then(res => res.data)
            .catch(e => {
                return {
                    ...e?.response?.data,
                    status: e?.response.status,
                };
            });
    };

    return {
        get,
        post,
        put,
        remove,
    };
};

export default useRequest;
