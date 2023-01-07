import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {NotificationCard} from './NotificationCard';
import {useAppContext} from '../../contexts/AppContext';
import useNotificationsQuery from '../../hooks/useNotificationsQuery';
import {AppText} from '../../components/AppText';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Screens from '../../navigations/Screens';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const NotificationsScreen = () => {
    const {state} = useAppContext();
    const {getNotifications, updateNotificationRead} = useNotificationsQuery();
    const [searchString, setSearchString] = useState('');
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        (async () => {
            await getNotifications();
        })();
    }, []);

    const handleNotificationRead = async (notification: any) => {
        const response = await updateNotificationRead(notification?.id);
        if (!response?.error) {
            getNotifications();
        }
        navigation.navigate(Screens.MilestoneDetails, {
            activeMilestoneId: notification?.milestone_id,
        });
    };

    const handleSearch = (e: any) => {};

    return (
        <View style={styles.container}>
            <StatusBar />
            <StackHeader
                title={'Notifications'}
                showSearch={true}
                onSearch={(e: any) => handleSearch(e)}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    {state.notifications.length > 0 ? (
                        state.notifications.map((item: any, index: number) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => handleNotificationRead(item)}
                                    activeOpacity={0.8}
                                    key={`notification-${index}`}
                                    style={{marginVertical: 8}}>
                                    <NotificationCard notification={item} />
                                </TouchableOpacity>
                            );
                        })
                    ) : (
                        <AppText>No notifications found</AppText>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};
