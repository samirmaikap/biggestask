import useRequest from './useRequest';

const usePlaceSearchQuery = () => {
    const request = useRequest();

    const searchPlaces = async (terms: string) => {
        const response = await request.get(`/places?search=${terms}`);
        return response;
    };

    return {
        searchPlaces,
    };
};

export default usePlaceSearchQuery;
