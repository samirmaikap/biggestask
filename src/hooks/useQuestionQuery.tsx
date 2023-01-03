import useRequest from './useRequest';
import {useContext} from 'react';
import {useAppContext} from '../contexts/AppContext';

const useQuestionQuery = () => {
    const request = useRequest();
    const {state, dispatch} = useAppContext();

    const getParentQuestions = async () => {
        const response = await request.get('/questions/parent');
        if (!response?.error) {
            dispatch({
                type: 'SET_PARENT_QUESTIONS',
                payload: response,
            });
        }
        return response;
    };

    const getSurrogateQuestions = async () => {
        const response = await request.get('/questions/surrogate');
        if (!response?.error) {
            dispatch({
                type: 'SET_SURROGATE_QUESTIONS',
                payload: response,
            });
        }
        return response;
    };

    const updateQuestion = async (payload: any, questionId: number) => {
        const response = await request.get(`/questions/${questionId}/answer`);
        return response;
    };

    return {
        getParentQuestions,
        getSurrogateQuestions,
        updateQuestion,
    };
};

export default useQuestionQuery;
