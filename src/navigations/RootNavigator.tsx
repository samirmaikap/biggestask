import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import colors from '../theme/colors';
import Screens from './Screens';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from '../screens/profile/Profile';
import {Tabs} from './Tabs';
import {MilestoneDetailsScreen} from '../screens/milestones/MilestoneDetails';
import {MotherDetailsScreen} from '../screens/mother/MotherDetails';
import {PostsScreen} from '../screens/community/Posts';
import {ProvidersScreen} from '../screens/providers/Providers';
import {SettingsScreen} from '../screens/settings/Settings';
import {NotificationsScreen} from '../screens/notifications/Notifications';
import {AboutScreen} from '../screens/settings/About';
import {PrivacyPolicyScreen} from '../screens/settings/PrivacyPolicy';
import {TermsScreen} from '../screens/settings/Terms';
import {DetailedSettingsScreen} from '../screens/settings/DetailedSettings';
import {IntroScreen} from '../screens/onboarding/Intro';
import {LoginScreen} from '../screens/auth/Login';
import {SignupScreen} from '../screens/auth/Signup';
import {VerifyScreen} from '../screens/auth/Verify';
import {CreateAccountScreen} from '../screens/auth/CreateAccount';
import {AppContext} from '../contexts/AppContext';
import {SurrogateInviteScreen} from '../screens/invite/SurrogateInvite';
import {WaitingSurrogateScreen} from '../screens/invite/WaitingSurrogateScreen';

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1,
    },
    tabIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Stack = createStackNavigator();

const renderAuthNavs = (themeColors: any) => {
    return (
        <Stack.Navigator
            initialRouteName={Screens.Intro}
            screenOptions={{
                headerShown: false,
                cardStyle: styles.cardStyle,
                headerStyle: {
                    backgroundColor: themeColors.background,
                },
                headerTintColor: themeColors.text,
                headerTitleStyle: {
                    fontWeight: '600',
                },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
            }}>
            <Stack.Screen name={Screens.Intro} component={IntroScreen} />
            <Stack.Screen name={Screens.Login} component={LoginScreen} />
            <Stack.Screen name={Screens.Signup} component={SignupScreen} />
            <Stack.Screen name={Screens.Verify} component={VerifyScreen} />
            <Stack.Screen
                name={Screens.AccountSetup}
                component={CreateAccountScreen}
            />
            <Stack.Screen name={Screens.Terms} component={TermsScreen} />
        </Stack.Navigator>
    );
};

const renderMainNavs = (themeColors: any) => {
    return (
        <Stack.Navigator
            initialRouteName={'Tabs'}
            screenOptions={{
                headerShown: false,
                cardStyle: styles.cardStyle,
                headerStyle: {
                    backgroundColor: themeColors.background,
                },
                headerTintColor: themeColors.text,
                headerTitleStyle: {
                    fontWeight: '600',
                },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
            }}>
            <Stack.Screen name={'Tabs'} component={Tabs} />
            <Stack.Screen name={Screens.Profile} component={ProfileScreen} />
            <Stack.Screen
                name={Screens.MilestoneDetails}
                component={MilestoneDetailsScreen}
            />
            <Stack.Screen
                name={Screens.MotherDetails}
                component={MotherDetailsScreen}
            />
            <Stack.Screen
                name={Screens.CommunityPosts}
                component={PostsScreen}
            />
            <Stack.Screen name={Screens.Contacts} component={ProvidersScreen} />
            <Stack.Screen name={Screens.Settings} component={SettingsScreen} />
            <Stack.Screen
                name={Screens.Notifications}
                component={NotificationsScreen}
            />
            <Stack.Screen name={Screens.About} component={AboutScreen} />
            <Stack.Screen
                name={Screens.Privacy}
                component={PrivacyPolicyScreen}
            />
            <Stack.Screen name={Screens.Terms} component={TermsScreen} />
            <Stack.Screen
                name={Screens.DetailedSettings}
                component={DetailedSettingsScreen}
            />
        </Stack.Navigator>
    );
};

const renderInvitationNavs = (themeColors: any) => {
    return (
        <Stack.Navigator
            initialRouteName={Screens.InviteSurrogate}
            screenOptions={{
                headerShown: false,
                cardStyle: styles.cardStyle,
                headerStyle: {
                    backgroundColor: themeColors.background,
                },
                headerTintColor: themeColors.text,
                headerTitleStyle: {
                    fontWeight: '600',
                },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
            }}>
            <Stack.Screen
                name={Screens.InviteSurrogate}
                component={SurrogateInviteScreen}
            />
        </Stack.Navigator>
    );
};

const renderWaitingNavs = (themeColors: any) => {
    return (
        <Stack.Navigator
            initialRouteName={Screens.WaitingSurrogate}
            screenOptions={{
                headerShown: false,
                cardStyle: styles.cardStyle,
                headerStyle: {
                    backgroundColor: themeColors.background,
                },
                headerTintColor: themeColors.text,
                headerTitleStyle: {
                    fontWeight: '600',
                },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
            }}>
            <Stack.Screen
                name={Screens.WaitingSurrogate}
                component={WaitingSurrogateScreen}
            />
        </Stack.Navigator>
    );
};

const RootNavigator = () => {
    const themeColors = colors.light;
    const {state} = useContext(AppContext);
    console.log('state', state);
    const isLoggedIn = state?.authToken;
    const isParent = state?.user && state?.user?.user_type === 'parent';
    const hasSurrogate =
        state.user?.journey && state.user?.journey.surrogate_id;
    const surrogateInvited =
        state.user?.journey && state.user?.journey.surrogate_invited;

    console.log('isLoggedIn', isLoggedIn);
    console.log('isParent', isParent);
    console.log('hasSurrogate', hasSurrogate);
    console.log('surrogateInvited', surrogateInvited);

    if (!isLoggedIn) {
        return renderAuthNavs(themeColors);
    }

    if (!hasSurrogate && !surrogateInvited) {
        return renderInvitationNavs(themeColors);
    }

    if (!hasSurrogate && surrogateInvited) {
        return renderWaitingNavs(themeColors);
    }

    return renderMainNavs(themeColors);
};

export default RootNavigator;
