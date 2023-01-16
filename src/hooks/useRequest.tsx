import {apiInstance} from '../utils/service';

const useRequest = () => {
    const get = async (url: string) => {
        return await apiInstance
            .get(url)
            .then(res => res.data)
            .catch(e => {
                console.log('check error in get', e);
                console.log('check error in get url', url);
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
                console.log('check error in post', e);
                console.log('check error in post url', url);
                return parseResponse(e);
            });
    };

    const upload = async (url: string, payload: any) => {
        return await apiInstance
            .post(url, payload)
            .then(res => console.log('red', res))
            .catch(e => {
                console.log('check error in upload', e);
                console.log('check error in upload url', url);
                console.log('eeror', e);
            });
    };

    const put = async (url: string, payload: any) => {
        return await apiInstance
            .put(url, payload)
            .then(res => res.data)
            .catch(e => {
                console.log('check error in put', e);
                console.log('check error in put url', url);
                return parseResponse(e);
            });
    };

    const remove = async (url: string) => {
        return await apiInstance
            .delete(url)
            .then(res => res.data)
            .catch(e => {
                console.log('check error in remove', e);
                console.log('check error in remove url', url);
                return parseResponse(e);
            });
    };

    const parseResponse = (e: any) => {
        console.log('error occured', e);
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
            status: e?.response && e?.response.status ? e?.response.status : e,
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
