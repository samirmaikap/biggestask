import useRequest from './useRequest';
import {useContext} from 'react';
import {AppContext} from '../contexts/AppContext';

const useQuestionQuery = () => {
    const request = useRequest();
    const {dispatch} = useContext(AppContext);

    const getQuestions = async () => {
        const response = await request.get('/questions');
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
