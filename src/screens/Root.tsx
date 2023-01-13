import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import GlobalNavigator from '../navigations/GlobalNavigator';
import {useAppContext} from '../contexts/AppContext';
import useAuthQuery from '../hooks/useAuthQuery';
import useJourneyQuery from '../hooks/useJourneyQuery';
import useMilestoneQuery from '../hooks/useMilestoneQuery';
// @ts-ignore
import TimeZone from 'react-native-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNotificationsQuery from '../hooks/useNotificationsQuery';
import messaging from '@react-native-firebase/messaging';
import {timeout} from '../utils/utils';

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
  const {getMe, updateFcmToken, updateTimezone} = useAuthQuery();
  const [isLoading, setLoading] = useState(true);
  const {getJourney} = useJourneyQuery();
  const {getMilestones} = useMilestoneQuery();
  const {getNotifications} = useNotificationsQuery();
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
    console.log('init called.....');
    setLoading(true);
    console.log('loading....');
    const token = await AsyncStorage.getItem('apiToken');
    console.log('got token checked....', token);
    if (token) {
      console.log('1');
      await setToken(token);
      await timeout(1000);
      console.log('2');
      await setTimeZone();
      console.log('3');

      console.log('3a');
      const response = await getMe();
      console.log('4');
      if (!response?.error) {
        setJourney(response.journey);
      }
      console.log('5');
      await getJourney();
      console.log('6');
      await getMilestones();
      console.log('7');
      getNotifications();
      console.log('8');
    }
    console.log('got token checked done and load....');

    const isFirstFromStorage = await AsyncStorage.getItem('skip_intro');
    setIsFirstLoad(!isFirstFromStorage);

    setLoading(false);
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

  const setTimeZone = async () => {
    const timeZone = await TimeZone.getTimeZone()
      .then((zone: any) => zone)
      .catch((e: any) => console.log('e', e));
    console.log('timeZone', timeZone);
    if (timeZone) {
      dispatch({
        type: 'SET_TIME_ZONE',
        payload: timeZone,
      });
      await updateTimezone(state.timeZone);
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
  //             await preloadData();
  //         }
  //         const isFirstFromStorage = await AsyncStorage.getItem('skip_intro');
  //         setIsFirstLoad(!isFirstFromStorage);
  //
  //         setLoading(false);
  //     })();
  // }, [state.authToken]);

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
