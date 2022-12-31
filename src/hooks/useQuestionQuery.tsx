import useRequest from './useRequest';
import {useContext} from 'react';
import {useAppContext} from '../contexts/AppContext';

const useQuestionQuery = () => {
    const request = useRequest();
    const {state, dispatch} = useAppContext();

    const getQuestions = async () => {
        const response = await request.get('/questions');
        console.log('getQuestions', response);
        if (!response?.error) {
            dispatch({
                type: 'SET_QUESTIONS',
                payload: response,
            });
        }
        return response;
    };

    const updateQuestion = async (payload: any, questionId: number) => {
        const response = await request.get(`/questions/${questionId}/answer`);
        if (!response?.error) {
            await getQuestions();
        }
        return response;
    };

    return {
        getQuestions,
        updateQuestion,
    };
};

export default useQuestionQuery;
