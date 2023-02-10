import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import TabHeader from '../../components/TabHeader';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import AppStyles from '../../theme/AppStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import {NewQuestionCard} from './NewQuestionCard';
import {QuestionCard} from './QuestionCard';
import useAuthQuery from '../../hooks/useAuthQuery';
import {useAppContext} from '../../contexts/AppContext';
import {useToast} from 'react-native-toast-notifications';
import useQuestionQuery from '../../hooks/useQuestionQuery';
import {getActiveQuestions, getInActiveQuestions} from '../../utils/utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        padding: 16,
    },
});

export const QuestionsScreen = () => {
    const {state} = useAppContext();
    const [openDropdown, setOpenDropdown] = useState(false);
    const [value, setValue] = useState(
        state?.user?.question_frequency
            ? state?.user?.question_frequency.toString()
            : '1',
    );
    const [items, setItems] = useState([
        {label: 'Every day', value: '1'},
        {label: 'Every 3 days', value: '3'},
        {label: 'Every Week', value: '7'},
    ]);
    const [initialLoad, setInitialLoad] = useState(true);

    const {updateFrequency} = useAuthQuery();
    const toast = useToast();
    const {getSurrogateQuestions, getParentQuestions} = useQuestionQuery();

    const [activeQuestions, setActiveQuestions] = useState([]);
    const [inActiveQuestions, setInActiveQuestions] = useState([]);
    const isParent = state.user?.user_type === 'parent';

    useEffect(() => {
        (async () => {
            await getParentQuestions();
            await getParentQuestions();
        })();
    }, []);

    const handleUpdateFrequency = async () => {
        const payload = {
            question_frequency: value,
        };

        const response = await updateFrequency(payload);
        if (response?.error) {
            toast.show(response?.message);
            return;
        }

        toast.show('Frequency Updated');
    };

    useEffect(() => {
        (async () => {
            if (!initialLoad) {
                await handleUpdateFrequency();
                setInitialLoad(false);
            }
        })();
    }, [value]);

    useEffect(() => {
        setTimeout(() => {
            setInitialLoad(false);
        }, 500);
    }, []);

    useEffect(() => {
        const activeQ = getActiveQuestions(
            state.parentQuestions,
            state.surrogateQuestions,
            state.user?.user_type,
        );
        setActiveQuestions(activeQ);
        const inActiveQ = getInActiveQuestions(
            state.parentQuestions,
            state.surrogateQuestions,
            state.user?.user_type,
        );
        setInActiveQuestions(inActiveQ);
    }, [state.surrogateQuestions, state.parentQuestions]);

    const handleOnAnswer = async () => {
        await getSurrogateQuestions();
        await getParentQuestions();
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <TabHeader title={'Question Bank'} />
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    <AppText>
                        Get to know your{' '}
                        {isParent ? 'Gestational Carrier' : 'Intended Parents'}{' '}
                        as the journey unfolds. The app will send you and your{' '}
                        {isParent ? 'Gestational Carrier' : 'Intended Parents'}{' '}
                        questions and exchange the answers. As the journey
                        progresses, the questions become more interesting and
                        intimate, so that you bond naturally with each other.
                        Select how often you'd like to answer a question.
                    </AppText>
                    <AppSpacing gap={16} />
                    <AppText variant={'h3'}>
                        New questions in the profile
                    </AppText>
                    <AppSpacing gap={16} />
                    <AppText variant={'title'}>
                        Frequency of the questions:
                    </AppText>
                    <DropDownPicker
                        open={openDropdown}
                        value={value}
                        items={items}
                        setOpen={setOpenDropdown}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select Frequency"
                        style={AppStyles.dropdownInput}
                        zIndex={3000}
                        listMode="SCROLLVIEW"
                        zIndexInverse={1000}
                        containerStyle={{
                            height: 40,
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        dropDownContainerStyle={
                            AppStyles.dropdownContainerStyle
                        }
                    />

                    <AppSpacing gap={16} />
                    {activeQuestions?.length > 0 &&
                        activeQuestions.map((item: any, index: number) => (
                            <View
                                style={{marginVertical: 8}}
                                key={`laq-${index}`}>
                                <NewQuestionCard
                                    title={item.question.text}
                                    onSaved={handleOnAnswer}
                                    questionId={item?.id}
                                />
                            </View>
                        ))}

                    <AppSpacing gap={16} />
                    <AppText variant={'h3'}>
                        Existing questions in the profile
                    </AppText>
                    <AppSpacing gap={8} />
                    {inActiveQuestions?.length > 0 ? (
                        inActiveQuestions.map((item: any, index: any) => {
                            return (
                                <View
                                    style={{marginVertical: 8}}
                                    key={`i-${index}`}>
                                    <QuestionCard
                                        time={item?.time}
                                        title={item?.question.text}
                                        user={item?.user_name}
                                        answer={item?.answer}
                                    />
                                </View>
                            );
                        })
                    ) : (
                        <AppText>No Questions Available</AppText>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};
