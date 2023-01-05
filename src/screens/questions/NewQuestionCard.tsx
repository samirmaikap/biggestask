import {Button, useTheme} from 'react-native-paper';
import AppStyles from '../../theme/AppStyles';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../../components/AppText';
import {AppSpacing} from '../../components/AppSpacing';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import DropDownPicker from 'react-native-dropdown-picker';
import {AppBottomSheet} from '../../components/AppBottomSheet';
import React, {useState} from 'react';
import {AppCard} from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import {useAppContext} from '../../contexts/AppContext';
import {useToast} from 'react-native-toast-notifications';
import useQuestionQuery from '../../hooks/useQuestionQuery';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerContainer: {
        padding: 16,
    },
    title: {
        paddingVertical: 16,
    },
    input: {
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 12,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        backgroundColor: 'rgba(151, 151, 151, 0.25)',
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

type Props = {
    title: string;
    onSaved: Function;
    questionId: number;
};

export const NewQuestionCard = (props: Props) => {
    const theme = useTheme();
    const {state} = useAppContext();
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(
        state.user?.user_type === 'surrogate' ? state.surrogate?.id : null,
    );
    const [users, setUsers] = useState(
        state.user?.user_type === 'parent'
            ? [
                {label: state.parent1.name, value: state.parent1.id},
                {label: state.parent2.name, value: state.parent2.id},
            ]
            : [],
    );
    const [answer, setAnswer] = useState('');

    const [loading, setLoading] = useState(false);

    const {title, questionId, onSaved} = props;
    const toast = useToast();
    const {updateQuestion} = useQuestionQuery();
    const [requestSheetClose, setRequestSheetClose] = useState(false);

    console.log('questionId', questionId);

    const handleUpdateQuestion = async () => {
        if (!answer) {
            toast.show('Please add an answer');
            return;
        }

        if (!selectedUser) {
            toast.show('Please select a parent');
            return;
        }

        const payload = {
            answer: answer,
            answered_by: selectedUser,
        };

        setLoading(true);

        const response = await updateQuestion(payload, questionId);
        setLoading(false);
        if (response?.error) {
            toast.show(response?.message);
            return;
        }

        toast.show('Answer has been updated.', {placement: 'top'});
        setRequestSheetClose(true);
        onSaved();

        setAnswer('');
        setSelectedUser(null);
    };

    return (
        <AppCard padding={16} backgroundColor={theme.colors.primary}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <AppText variant={'h3'} color={'white'}>
                    Your latest questions
                </AppText>
                <AppSpacing gap={8} />
                <AppText textAlign={'center'} color={'white'}>
                    {title}
                </AppText>
            </View>
            <AppSpacing gap={16} />
            <AppBottomSheet
                requestClose={requestSheetClose}
                onClose={() => setRequestSheetClose(false)}
                action={
                    <AppButton
                        textColor={theme.colors.primary}
                        mode="contained"
                        contentStyle={AppStyles.buttonContent}
                        style={[AppStyles.button, {backgroundColor: 'white'}]}>
                        Answer the Question
                    </AppButton>
                }>
                <View style={{backgroundColor: 'white'}}>
                    <View style={styles.centerContainer}>
                        <AppText variant={'h2'}>New Questions</AppText>
                        <AppText textAlign={'center'}>{title}</AppText>
                    </View>
                    <AppSpacing gap={16} />
                    <AppText variant={'title'}>Answer</AppText>
                    <AppSpacing gap={4} />
                    <BottomSheetTextInput
                        multiline={true}
                        style={[
                            AppStyles.textInput,
                            {padding: 16, minHeight: 100},
                        ]}
                        value={answer}
                        onChangeText={e => setAnswer(e)}
                    />
                    <AppSpacing gap={16} />
                    {state.user?.user_type === 'parent' && (
                        <>
                            <AppText variant={'title'}>Parents</AppText>
                            <AppSpacing gap={4} />
                            <DropDownPicker
                                open={open}
                                value={selectedUser}
                                items={users}
                                setOpen={setOpen}
                                setValue={setSelectedUser}
                                setItems={setUsers}
                                placeholder="Select Parent"
                                style={AppStyles.dropdownInput}
                                containerStyle={{
                                    height: 40,
                                    marginTop: 10,
                                    marginBottom: 10,
                                }}
                                dropDownContainerStyle={
                                    AppStyles.dropdownContainerStyle
                                }
                            />
                        </>
                    )}

                    <AppSpacing gap={16} />
                    <AppButton
                        onPress={handleUpdateQuestion}
                        loading={loading}
                        disabled={loading}
                        contentStyle={AppStyles.buttonContent}
                        mode="contained"
                        style={[AppStyles.button]}>
                        Add Answer
                    </AppButton>
                </View>
            </AppBottomSheet>
        </AppCard>
    );
};
