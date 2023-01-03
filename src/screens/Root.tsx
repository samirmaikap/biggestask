import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import GlobalNavigator from '../navigations/GlobalNavigator';
import RNBootSplash from 'react-native-bootsplash';
import {useAppContext} from '../contexts/AppContext';
import useAuthQuery from '../hooks/useAuthQuery';
import useJourneyQuery from '../hooks/useJourneyQuery';
import useMilestoneQuery from '../hooks/useMilestoneQuery';
import useQuestionQuery from '../hooks/useQuestionQuery';
import useCommunityQuery from '../hooks/useCommunityQuery';
import useContactQuery from '../hooks/useContactQuery';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

type Props = {
    theme: any;
};

const Root = (props: Props) => {
    const {theme} = props;
    const {state, dispatch} = useAppContext();
    const {getMe} = useAuthQuery();
    const [isLoading, setLoading] = useState(true);
    const {getWeeklyUpdate, getJourney} = useJourneyQuery();
    const {getMilestones} = useMilestoneQuery();
    const {getParentQuestions, getSurrogateQuestions} = useQuestionQuery();
    const {getCommunities} = useCommunityQuery();
    const {getContacts} = useContactQuery();
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [journey, setJourney] = useState<any>(null);

    useEffect(() => {
        (async () => {
            await init();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!isLoading) {
                await init();
            }
        })();
    }, [state.authToken]);

    const init = async () => {
        const token = await AsyncStorage.getItem('apiToken');
        if (token) {
            await setToken(token);
            const response = await getMe();
            if (!response?.error) {
                setJourney(response.journey);
            }
            preloadData();
        }

        const isFirstFromStorage = await AsyncStorage.getItem('skip_intro');
        setIsFirstLoad(!isFirstFromStorage);

        setLoading(false);
        console.log('set loading false');
    };

    const setToken = async (token: any) => {
        const authToken = token ? JSON.parse(token) : null;

        if (authToken) {
            dispatch({
                type: 'SET_TOKEN',
                payload: authToken,
            });
        }
    };

    // useEffect(() => {
    //     (async () => {
    //         if (state.authToken) {
    //             const response = await getMe();
    //             if (!response?.error) {
    //                 setJourney(response.journey);
    //             }
    //             console.log('load user response', response);
    //             preloadData();
    //         }
    //         const isFirstFromStorage = await AsyncStorage.getItem('skip_intro');
    //         setIsFirstLoad(!isFirstFromStorage);
    //
    //         setLoading(false);
    //     })();
    // }, [state.authToken]);

    const preloadData = async () => {
        await getJourney();
        await getWeeklyUpdate();
        await getMilestones();
        await getParentQuestions();
        await getSurrogateQuestions();
        await getCommunities();
        await getContacts();
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color={theme.colors.primary} />
                </View>
            ) : (
                <GlobalNavigator
                    isLoggedIn={state.authToken}
                    journey={journey}
                    isFirstLoad={isFirstLoad}
                    theme={theme}
                />
            )}
        </View>
    );
};

export default Root;
