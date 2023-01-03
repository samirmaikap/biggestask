import React, {useEffect, useState} from 'react';
import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {AppText} from '../../components/AppText';
import {Colors} from '../../theme/colors';
import {Divider, Switch} from 'react-native-paper';
import StackHeader from '../../components/StackHeader';
import {AppSpacing} from '../../components/AppSpacing';
import {useToast} from 'react-native-toast-notifications';
import useAuthQuery from '../../hooks/useAuthQuery';
import useJourneyQuery from '../../hooks/useJourneyQuery';
import {useAppContext} from '../../contexts/AppContext';

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
    settingGroup: {
        paddingVertical: 16,
    },
});

export const DetailedSettingsScreen = () => {
    const toast = useToast();
    const {state} = useAppContext();
    const {updateMe, getMe} = useAuthQuery();
    const {getJourney} = useJourneyQuery();

    const [notificationEnabled, setNotificationEnabled] = useState(
        state.user.notification_enabled,
    );

    const handleUpdateSettings = async () => {
        const payload = {
            notification_enabled: notificationEnabled,
        };

        const response = await updateMe(payload);
        if (response?.error) {
            toast.show(response?.message);
            return;
        }

        toast.show('Settings Updated');
        await getMe();
        await getJourney();
    };

    useEffect(() => {
        (async () => {
            await handleUpdateSettings();
        })();
    }, [notificationEnabled]);

    return (
        <View style={styles.container}>
            <StatusBar />
            <StackHeader title={'Detailed Settings'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>
                    <View style={styles.settingGroup}>
                        <View
                            style={[
                                styles.row,
                                {justifyContent: 'space-between'},
                            ]}>
                            <AppText color={Colors.grey_3}>Language</AppText>
                            <View>
                                <TouchableOpacity>
                                    <AppText color={Colors.primary}>
                                        Change
                                    </AppText>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <AppSpacing gap={8} />
                        <View>
                            <AppText fontWeight={'600'}>English</AppText>
                        </View>
                    </View>

                    <Divider />

                    <View style={styles.settingGroup}>
                        <View
                            style={[
                                styles.row,
                                {justifyContent: 'space-between'},
                            ]}>
                            <AppText color={Colors.grey_3}>Location</AppText>
                            <View>
                                <TouchableOpacity>
                                    <AppText color={Colors.primary}>
                                        Edit
                                    </AppText>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <AppSpacing gap={8} />
                        <View>
                            <AppText fontWeight={'600'}>London, UK</AppText>
                        </View>
                    </View>

                    <Divider />

                    <View style={styles.settingGroup}>
                        <View
                            style={[
                                styles.row,
                                {justifyContent: 'space-between'},
                            ]}>
                            <AppText color={Colors.grey_3}>
                                Receive Notifications
                            </AppText>
                            <View>
                                <Switch
                                    onValueChange={v =>
                                        setNotificationEnabled(v)
                                    }
                                    value={!!notificationEnabled}
                                    style={{
                                        transform: [
                                            {
                                                scaleX:
                                                    Platform?.OS === 'ios'
                                                        ? 0.7
                                                        : 1,
                                            },
                                            {
                                                scaleY:
                                                    Platform?.OS === 'ios'
                                                        ? 0.7
                                                        : 1,
                                            },
                                        ],
                                    }}
                                />
                            </View>
                        </View>
                        <AppSpacing gap={8} />
                        <View>
                            <AppText fontWeight={'600'}>Enabled</AppText>
                        </View>
                    </View>

                    <Divider />

                    <View style={styles.settingGroup}>
                        <View
                            style={[
                                styles.row,
                                {justifyContent: 'space-between'},
                            ]}>
                            <AppText color={Colors.grey_3}>
                                Receive Newsletters
                            </AppText>
                            <View>
                                <Switch
                                    value={true}
                                    style={{
                                        transform: [
                                            {
                                                scaleX:
                                                    Platform?.OS === 'ios'
                                                        ? 0.7
                                                        : 1,
                                            },
                                            {
                                                scaleY:
                                                    Platform?.OS === 'ios'
                                                        ? 0.7
                                                        : 1,
                                            },
                                        ],
                                    }}
                                />
                            </View>
                        </View>
                        <AppSpacing gap={8} />
                        <View>
                            <AppText fontWeight={'600'}>Enabled</AppText>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
