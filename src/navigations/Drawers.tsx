import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
    Alert,
    Platform,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import {AppImage} from '../components/AppImage';
import {Colors, primaryColor} from '../theme/colors';
import {UsersIcon} from '../components/icons/UsersIcon';
import {CommunityIcon} from '../components/icons/CommunityIcon';
import {ContactProviderIcon} from '../components/icons/ContactProviderIcons';
import {SettingsIcon} from '../components/icons/SettingsIcon';
import {Switch} from 'react-native-paper';
import {LogoutIcon} from '../components/icons/LogoutIcon';
import React, {useContext, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppText} from '../components/AppText';
import {FONT_NAME, images} from '../utils/constants';
import Screens from './Screens';
import {NotificationsIcon} from '../components/icons/NotificationsIcon';
import useAuthQuery from '../hooks/useAuthQuery';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppContext} from '../contexts/AppContext';
import {useToast} from 'react-native-toast-notifications';

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 4,
    },
    switchContainer: {
        marginTop: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    count: {
        paddingHorizontal: 8,
        paddingVertical: 0,
        marginLeft: 4,
        borderRadius: 4,
        backgroundColor: Colors.primary,
    },
});

export const Drawers = (props: any) => {
    const {height} = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const {logout} = useAuthQuery();
    const {state} = useAppContext();
    const toast = useToast();

    const [showPregnancy, setShowPregnancy] = useState(
        !!state.user?.show_pregnancy,
    );

    const {updateShowPregnancy, getMe} = useAuthQuery();

    const handleUpdateShowPregnancy = async (v: any) => {
        const response = await updateShowPregnancy({show_pregnancy: v});
        if (response?.error) {
            toast.show(response?.message);
            return;
        }

        toast.show('Settings updated');
        props.navigation.dispatch(DrawerActions.closeDrawer);
        await getMe();
    };

    return (
        <DrawerContentScrollView
            contentContainerStyle={{minHeight: height - 32}}
            {...props}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                    props.navigation.navigate(Screens.Profile, {
                        isSpectator: false,
                    })
                }>
                <View style={styles.profileContainer}>
                    <View>
                        <AppImage uri={state.user?.avatar} />
                    </View>
                    <View style={{marginLeft: 16}}>
                        <AppText maxLines={1} variant="h3">
                            {state.user?.name}
                        </AppText>
                        <AppText color={primaryColor}>
                            {state.user?.user_type}
                        </AppText>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={{flex: 1}}>
                <View>
                    <DrawerItem
                        icon={() => (
                            <View style={{marginRight: -16}}>
                                <UsersIcon />
                            </View>
                        )}
                        label={
                            state.user?.user_type === 'surrogate'
                                ? 'Your Intended Parents'
                                : 'Your Gestational Carrier'
                        }
                        onPress={() =>
                            props.navigation.navigate(Screens.Profile, {
                                isSpectator: true,
                            })
                        }
                    />
                    <DrawerItem
                        icon={() => (
                            <View style={{marginRight: -16}}>
                                <CommunityIcon />
                            </View>
                        )}
                        label="Community"
                        onPress={() =>
                            props.navigation.navigate(Screens.CommunityPosts)
                        }
                    />
                    <DrawerItem
                        labelStyle={{fontFamily: FONT_NAME}}
                        icon={() => (
                            <View style={{marginRight: -16}}>
                                <ContactProviderIcon />
                            </View>
                        )}
                        label="Contact Your Providers"
                        onPress={() =>
                            props.navigation.navigate(Screens.Contacts)
                        }
                    />
                    <DrawerItem
                        icon={() => (
                            <View style={{marginRight: -16}}>
                                <SettingsIcon />
                            </View>
                        )}
                        label="Settings"
                        onPress={() =>
                            props.navigation.navigate(Screens.Settings)
                        }
                    />
                    <View style={styles.switchContainer}>
                        <AppText>Show Pregnancy Milestone</AppText>
                        <Switch
                            onValueChange={v => {
                                setShowPregnancy(!showPregnancy);
                                handleUpdateShowPregnancy(v);
                            }}
                            value={showPregnancy}
                            style={{
                                transform: [
                                    {scaleX: Platform?.OS === 'ios' ? 0.7 : 1},
                                    {scaleY: Platform?.OS === 'ios' ? 0.7 : 1},
                                ],
                            }}
                        />
                    </View>
                </View>
            </View>
            <View>
                <DrawerItem
                    icon={() => (
                        <View style={{marginRight: -16}}>
                            <LogoutIcon />
                        </View>
                    )}
                    label="Logout"
                    onPress={async () => {
                        props.navigation.dispatch(DrawerActions.closeDrawer);
                        await logout();
                    }}
                />
                <View style={{marginBottom: insets.bottom}} />
            </View>
        </DrawerContentScrollView>
    );
};
