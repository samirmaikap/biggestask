import React, {useEffect, useState} from 'react';
import {
    RefreshControl,
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
import {AppImage} from '../../components/AppImage';
import useQuestionQuery from '../../hooks/useQuestionQuery';
import {
    getAlertQuestions,
    getLatestAnswerByOther,
    getLatestQuestion,
    getLocalDateTime,
} from '../../utils/utils';
import messaging from '@react-native-firebase/messaging';
import useAuthQuery from '../../hooks/useAuthQuery';
import {NotificationsIcon} from '../../components/icons/NotificationsIcon';
import {useNavigation} from '@react-navigation/native';
import Screens from '../../navigations/Screens';
import {StackNavigationProp} from '@react-navigation/stack';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import useMilestoneQuery from '../../hooks/useMilestoneQuery';
import {useCalendarEvents} from '../../hooks/useCalendarEvents';

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

    const {updateFcmToken, updateTimezone} = useAuthQuery();
    const {getWeeklyUpdate, getNextMilestone} = useJourneyQuery();
    const {getParentQuestions, getSurrogateQuestions} = useQuestionQuery();
    const {getMilestones} = useMilestoneQuery();
    const role = state.user?.user_type;

    const {checkCalendarPermissions, refreshCalendarEvents} =
        useCalendarEvents();

    const navigation = useNavigation<StackNavigationProp<any>>();

    const [isWeekUpdateLoading, setIsWeekUpdateLoading] = useState(true);
    const [isNextMilestoneLoading, setIsNextMilestoneLoading] = useState(true);
    const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
    const [calendarPermission, setCalendarPermission] = useState(false);

    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        setTimeout(async () => {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                await updateFcmToken(fcmToken);
            }
        }, 5000);
    }, []);

    useEffect(() => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            handleRemoteMessage(remoteMessage);
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage,
            );
        });

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    handleRemoteMessage(remoteMessage);
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage,
                    );
                }
            });
    }, []);

    const handleRemoteMessage = async (remoteMessage: any) => {
        const type = remoteMessage?.data?.type;
        if (remoteMessage?.data) {
            getParentQuestions();
            getSurrogateQuestions();
            if (type && type === 'milestone') {
                const milestoneId = remoteMessage?.data?.milestoneId;
                if (milestoneId) {
                    setTimeout(() => {
                        navigation.navigate(Screens.MilestoneDetails, {
                            activeMilestoneId: milestoneId,
                        });
                    }, 1000);
                }
            } else {
                setTimeout(() => {
                    navigation.navigate(Screens.Questions);
                }, 1000);
            }
        }
    };

    useEffect(() => {
        (async () => {
            await requestUserPermission();
            const response = await checkCalendarPermissions();
            if (response === 'authorized') {
                setCalendarPermission(true);
            }
        })();
    }, []);

    useEffect(() => {
        if (state.milestones?.length > 0 && calendarPermission) {
            setTimeout(() => {
                (async () => {
                    await refreshCalendarEvents();
                })();
            }, 1000);
        }
    }, [calendarPermission, state.milestones]);

    useEffect(() => {
        (async () => {
            await refreshData();
        })();
    }, []);

    const refreshData = async () => {
        await getWeeklyUpdate();
        setIsWeekUpdateLoading(false);
        await getNextMilestone();
        setIsNextMilestoneLoading(false);
        await getParentQuestions();
        await getSurrogateQuestions();
        setIsQuestionsLoading(false);
        await getMilestones();
    };

    const nextMilestoneDate = state.nextMilestone?.parsed_date_time;

    const alertQuestions = getAlertQuestions(
        state.parentQuestions,
        state.surrogateQuestions,
        role,
    );

    let latestQuestion = getLatestQuestion(
        state.parentQuestions,
        state.surrogateQuestions,
        role,
    );

    let latestAnswer = getLatestAnswerByOther(
        state.parentQuestions,
        state.surrogateQuestions,
        role,
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

    const shouldShowWeeklyUpdate =
        state.weeklyUpdate && state?.weeklyUpdate?.id;

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
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={async () => {
                            setRefreshing(true);
                            await refreshData();
                            setRefreshing(false);
                        }}
                    />
                }
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    {!!state.user?.show_pregnancy && shouldShowWeeklyUpdate && (
                        <View style={styles.title}>
                            <AppText
                                variant={'custom'}
                                fontWeight={'800'}
                                size={16}>
                                Pregnancy milestone
                            </AppText>
                        </View>
                    )}

                    {isWeekUpdateLoading && (
                        <AppCard marginVertical={16} padding={16}>
                            <SkeletonPlaceholder borderRadius={4}>
                                <SkeletonPlaceholder.Item
                                    flexDirection="column"
                                    alignItems="center">
                                    <SkeletonPlaceholder.Item
                                        marginBottom={20}
                                        marginTop={20}
                                        alignItems="center">
                                        <SkeletonPlaceholder.Item
                                            width={200}
                                            height={20}
                                        />
                                        <SkeletonPlaceholder.Item
                                            marginTop={6}
                                            width={80}
                                            height={20}
                                        />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                        </AppCard>
                    )}

                    {!!state.user?.show_pregnancy && shouldShowWeeklyUpdate && (
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
                                        {state.user?.user_type === 'parent'
                                            ? state.weeklyUpdate.description.replace(
                                                'The baby',
                                                'Your baby',
                                            )
                                            : state.weeklyUpdate.description}
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

                    {alertQuestions?.length > 0 &&
                        alertQuestions
                            .slice(0, 1)
                            .map((item: any, index: any) => {
                                return (
                                    <View
                                        key={`alert-${index}`}
                                        style={{marginVertical: 16}}>
                                        <AppCard padding={16}>
                                            <AppText variant="h3">
                                                {item?.question.text}
                                            </AppText>
                                            <AppSpacing gap={16} />
                                            <AppButton
                                                onPress={() =>
                                                    navigation.navigate(
                                                        Screens.MilestoneDetails,
                                                        {
                                                            activeMilestoneId:
                                                                item?.milestone_id,
                                                        },
                                                    )
                                                }
                                                contentStyle={
                                                    AppStyles.buttonContent
                                                }
                                                textColor={Colors.grey_2}
                                                style={[
                                                    AppStyles.button,
                                                    {
                                                        borderColor:
                                                            Colors.grey_4,
                                                    },
                                                ]}
                                                mode={'outlined'}>
                                                Share Feedback
                                            </AppButton>
                                        </AppCard>
                                    </View>
                                );
                            })}

                    {/*Section Next Milestone*/}
                    <View style={styles.title}>
                        <AppText
                            variant={'custom'}
                            fontWeight={'800'}
                            size={16}>
                            Next Milestone
                        </AppText>
                    </View>

                    {isNextMilestoneLoading && (
                        <AppCard marginVertical={16} padding={16}>
                            <SkeletonPlaceholder borderRadius={4}>
                                <SkeletonPlaceholder.Item
                                    flexDirection="column"
                                    alignItems="center">
                                    <SkeletonPlaceholder.Item
                                        width={60}
                                        height={60}
                                        borderRadius={50}
                                    />
                                    <SkeletonPlaceholder.Item
                                        marginBottom={20}
                                        marginTop={20}>
                                        <SkeletonPlaceholder.Item
                                            width={120}
                                            height={20}
                                        />
                                        <SkeletonPlaceholder.Item
                                            marginTop={6}
                                            width={80}
                                            height={20}
                                        />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                        </AppCard>
                    )}

                    {state.nextMilestone && state.nextMilestone?.id && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                navigation.navigate(Screens.MilestoneDetails, {
                                    activeMilestoneId: state.nextMilestone?.id,
                                })
                            }>
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
                                            ? getLocalDateTime(
                                                nextMilestoneDate,
                                                state.timeZone,
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
                        </TouchableOpacity>
                    )}

                    {/*Section Latest Questions*/}
                    {latestQuestion && latestQuestion?.id && (
                        <View style={styles.title}>
                            <AppText
                                variant={'custom'}
                                fontWeight={'800'}
                                size={16}>
                                Your latest questions
                            </AppText>
                        </View>
                    )}
                    {isQuestionsLoading && (
                        <AppCard marginVertical={16} padding={16}>
                            <SkeletonPlaceholder borderRadius={4}>
                                <SkeletonPlaceholder.Item
                                    flexDirection="column"
                                    alignItems="center">
                                    <SkeletonPlaceholder.Item
                                        marginBottom={20}
                                        marginTop={20}
                                        alignItems="center">
                                        <SkeletonPlaceholder.Item
                                            width={200}
                                            height={20}
                                        />
                                        <SkeletonPlaceholder.Item
                                            marginTop={6}
                                            width={80}
                                            height={20}
                                        />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                        </AppCard>
                    )}

                    {latestQuestion && latestQuestion?.id && (
                        <NewQuestionCard
                            onSaved={handleOnAnswer}
                            questionId={latestQuestion?.id}
                            title={latestQuestion?.question.text}
                        />
                    )}

                    {/*Section Your Surrogate*/}
                    {latestAnswer && latestAnswer?.id && (
                        <View style={styles.title}>
                            <AppText
                                variant={'custom'}
                                fontWeight={'800'}
                                size={16}>
                                Your{' '}
                                {state.user?.user_type === 'parent'
                                    ? "Gestational Carrier's"
                                    : "Intended Parents'"}{' '}
                                Answers
                            </AppText>
                        </View>
                    )}

                    {latestAnswer && latestAnswer?.id && (
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
