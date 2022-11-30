import React from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import StackHeader from '../../components/StackHeader';
import {NotificationCard} from './NotificationCard';

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
    return (
        <View style={styles.container}>
            <StatusBar />
            <StackHeader title={'Notifications'} showSearch={true} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                        return (
                            <View
                                key={`notification-${index}`}
                                style={{marginVertical: 8}}>
                                <NotificationCard />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};
