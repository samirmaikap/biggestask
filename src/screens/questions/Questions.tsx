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
        state.user.question_frequency.toString(),
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
            console.log('value', value);
            console.log('initialLoad', initialLoad);
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

    let latestQuestion = null;
    if (state.user.user_type === 'surrogate') {
        if (state.surrogateQuestions.length > 0) {
            let questions = state.surrogateQuestions.filter(
                (item: any) => !item.answer,
            );
            latestQuestion = questions.length > 0 ? questions[0] : null;
        }
    } else {
        if (state.parentQuestions.length > 0) {
            let questions = state.parentQuestions.filter(
                (item: any) => !item.answer,
            );
            latestQuestion = questions.length > 0 ? questions[0] : null;
        }
    }

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
                        Get to know your surrogacy partner as the journey
                        unfolds. The app will send you and your surrogacy
                        partner questions and exchange the answers. As the
                        journey progresses, the questions become more
                        interesting and intimate, so that you bond naturally
                        with each other. Select how often you'd like to answer a
                        question
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
                    {latestQuestion && (
                        <NewQuestionCard
                            title={latestQuestion.question.text}
                            onSaved={handleOnAnswer}
                            questionId={latestQuestion?.id}
                        />
                    )}

                    <AppSpacing gap={16} />
                    <AppText variant={'h3'}>
                        Existing questions in the profile
                    </AppText>
                    <AppSpacing gap={8} />
                    {state.user.user_type === 'parent' ? (
                        state.parentQuestions.map((item: any, index: any) => {
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

                    {state.user.user_type === 'surrogate'
                        ? state.surrogateQuestions.map(
                            (item: any, index: any) => {
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
                              },
                        )
                        : null}
                </View>
            </ScrollView>
        </View>
    );
};
