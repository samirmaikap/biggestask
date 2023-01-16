import useRequest from './useRequest';
import {useAppContext} from '../contexts/AppContext';

const useQuestionQuery = () => {
    const request = useRequest();
    const {dispatch} = useAppContext();

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
        const response = await request.put(
            `/questions/${questionId}/answer`,
            payload,
        );
        return response;
    };

    const askQuestion = async () => {
        const response = await request.post('/questions/ask', {create: true});
        return response;
    };

    return {
        getParentQuestions,
        getSurrogateQuestions,
        updateQuestion,
        askQuestion,
    };
};

export default useQuestionQuery;
