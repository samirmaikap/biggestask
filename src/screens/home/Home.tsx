import React, {useEffect, useState} from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {AppCard} from '../../components/AppCard';
import TabHeader from '../../components/TabHeader';
import {AppText} from '../../components/AppText';
import {images} from '../../utils/constants';
import {CalendarIcon} from '../../components/icons/CalendarIcon';
import {AppSpacing} from '../../components/AppSpacing';
import AppStyles from '../../theme/AppStyles';
import {Colors} from '../../theme/colors';
import {QuestionCard} from '../questions/QuestionCard';
import {NewQuestionCard} from '../questions/NewQuestionCard';
import AppButton from '../../components/AppButton';
import {useAppContext} from '../../contexts/AppContext';
import useJourneyQuery from '../../hooks/useJourneyQuery';
import {format} from 'date-fns';
import {AppImage} from '../../components/AppImage';
import useQuestionQuery from '../../hooks/useQuestionQuery';
import {getLatestAnswerByOther, getLatestQuestion} from '../../utils/utils';
import messaging from '@react-native-firebase/messaging';
import useAuthQuery from '../../hooks/useAuthQuery';
import {PlusCircleIcon} from '../../components/icons/PlusCircleIcon';
import {NotificationsIcon} from '../../components/icons/NotificationsIcon';
import {useNavigation} from '@react-navigation/native';
import Screens, {NavigationKeyType} from '../../navigations/Screens';
import {StackNavigationProp} from '@react-navigation/stack';

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
    dot: {
        width: 5,
        height: 5,
        backgroundColor: 'red',
        position: 'absolute',
        borderRadius: 5,
        right: 0,
    },
});

export const HomeScreen = () => {
    const {state} = useAppContext();

    const {updateFcmToken} = useAuthQuery();
    const {getWeeklyUpdate, getNextMilestone} = useJourneyQuery();
    const {getParentQuestions, getSurrogateQuestions} = useQuestionQuery();

    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        (async () => {
            await requestUserPermission();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await getWeeklyUpdate();
            await getNextMilestone();
            await getParentQuestions();
            await getSurrogateQuestions();
        })();
    }, []);

    const nextMilestoneDate = state.nextMilestone?.date_time;

    let latestQuestion = getLatestQuestion(
        state.parentQuestions,
        state.surrogateQuestions,
        state.user?.user_type,
    );

    let latestAnswer = getLatestAnswerByOther(
        state.parentQuestions,
        state.surrogateQuestions,
        state.user?.user_type,
    );

    const handleOnAnswer = async () => {
        await getSurrogateQuestions();
        await getParentQuestions();
    };

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    };

    const unreadNotificationCount =
        state.notifications?.length > 0 &&
        state.notifications.filter((item: any) => !item.is_read).length;

    useEffect(() => {
        console.log(state.milestones);
    }, [state.milestones]);

    useEffect(() => {
        console.log(state.nextMilestone);
    }, [state.nextMilestone]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <TabHeader
                title={'Home'}
                actions={[
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(Screens.Notifications)
                        }
                        activeOpacity={0.8}
                        key={'t-1'}>
                        <NotificationsIcon size={30} />
                        {unreadNotificationCount > 0 && (
                            <View style={styles.dot} />
                        )}
                    </TouchableOpacity>,
                ]}
            />

            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    {state.weeklyUpdate && state?.weeklyUpdate?.id && (
                        <View style={styles.title}>
                            <AppText
                                variant={'custom'}
                                fontWeight={'800'}
                                size={16}>
                                Pregnancy milestone
                            </AppText>
                        </View>
                    )}

                    {state.weeklyUpdate && state?.weeklyUpdate?.id && (
                        <AppCard padding={16}>
                            <View
                                style={[
                                    styles.row,
                                    {justifyContent: 'space-between'},
                                ]}>
                                <View style={{marginRight: 16, flex: 1}}>
                                    <AppText fontWeight={'800'}>
                                        {state.weeklyUpdate.title}
                                    </AppText>
                                    <AppSpacing gap={8} />
                                    <AppText>
                                        {state.weeklyUpdate.description}
                                    </AppText>
                                </View>
                                <View>
                                    <AppImage
                                        size={50}
                                        isLocal={false}
                                        uri={state.weeklyUpdate.image}
                                    />
                                </View>
                            </View>
                        </AppCard>
                    )}

                    {/*Section Next Milestone*/}
                    <View style={styles.title}>
                        <AppText
                            variant={'custom'}
                            fontWeight={'800'}
                            size={16}>
                            Next Milestone
                        </AppText>
                    </View>
                    {state.nextMilestone && state.nextMilestone?.id ? (
                        <AppCard padding={16}>
                            <View
                                style={[
                                    styles.row,
                                    {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    },
                                ]}>
                                <AppImage
                                    size={200}
                                    resizeMode={'contain'}
                                    isLocal={!state.nextMilestone.image}
                                    uri={
                                        state.nextMilestone.image
                                            ? state.nextMilestone.image
                                            : images.DEFAULT_MILESTONE
                                    }
                                />
                            </View>
                            <AppText variant="h2">
                                {state.nextMilestone?.name}
                            </AppText>
                            <AppSpacing />
                            <View style={styles.row}>
                                <View>
                                    <CalendarIcon
                                        size={16}
                                        color={Colors.grey_3}
                                    />
                                </View>
                                <AppSpacing isHorizontal={true} />
                                <AppText
                                    variant={'custom'}
                                    size={12}
                                    color={Colors.grey_3}>
                                    {nextMilestoneDate
                                        ? format(
                                            new Date(nextMilestoneDate),
                                            "MM/dd/yyyy 'at' h:mm a",
                                        )
                                        : 'Not yet scheduled'}
                                </AppText>
                            </View>
                            <AppSpacing gap={16} />
                            {/*<AppButton*/}
                            {/*    contentStyle={AppStyles.buttonContent}*/}
                            {/*    textColor={Colors.grey_2}*/}
                            {/*    style={[*/}
                            {/*        AppStyles.button,*/}
                            {/*        {borderColor: Colors.grey_4},*/}
                            {/*    ]}*/}
                            {/*    mode={'outlined'}>*/}
                            {/*    Ask Gestational Carrier*/}
                            {/*</AppButton>*/}
                        </AppCard>
                    ) : (
                        <AppText>Not available</AppText>
                    )}

                    {/*Section Last Questions*/}
                    {latestQuestion && (
                        <View style={styles.title}>
                            <AppText
                                variant={'custom'}
                                fontWeight={'800'}
                                size={16}>
                                Your latest questions
                            </AppText>
                        </View>
                    )}
                    {latestQuestion && (
                        <NewQuestionCard
                            onSaved={handleOnAnswer}
                            questionId={latestQuestion?.id}
                            title={latestQuestion?.question.text}
                        />
                    )}

                    {/*Section Your Surrogate*/}
                    {latestAnswer && (
                        <View style={styles.title}>
                            <AppText
                                variant={'custom'}
                                fontWeight={'800'}
                                size={16}>
                                Your{' '}
                                {state.user?.user_type === 'parent'
                                    ? 'Gestational Carrier'
                                    : 'Parents'}
                            </AppText>
                        </View>
                    )}

                    {latestAnswer && (
                        <QuestionCard
                            time={latestAnswer?.time}
                            title={latestAnswer?.question.text}
                            user={latestAnswer?.user_name}
                            answer={latestAnswer?.answer}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};
