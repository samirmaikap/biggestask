import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Screens from './Screens';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RootNavigator from './RootNavigator';
import {Drawers} from './Drawers';
import {useAppContext} from '../contexts/AppContext';
import {IntroScreen} from '../screens/onboarding/Intro';
import {LoginScreen} from '../screens/auth/Login';
import {EmailScreen} from '../screens/auth/Email';
import {VerifyScreen} from '../screens/auth/Verify';
import {CreateAccountScreen} from '../screens/auth/CreateAccount';
import {TermsScreen} from '../screens/settings/Terms';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../theme/colors';
import {StyleSheet} from 'react-native';
import {SurrogateInviteScreen} from '../screens/invite/SurrogateInvite';
import {WaitingSurrogateScreen} from '../screens/invite/WaitingSurrogateScreen';
import {ResetPasswordScreen} from '../screens/auth/ResetPassword';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1,
    },
});

const renderDrawerNavs = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                drawerStyle: {backgroundColor: 'white'},
            }}
            initialRouteName={Screens.RootNavigator}
            drawerContent={Drawers}>
            <Drawer.Screen
                name={Screens.RootNavigator}
                component={RootNavigator}
            />
        </Drawer.Navigator>
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

const renderAuthNavs = (themeColors: any, isFirstLoad: boolean) => {
    return (
        <Stack.Navigator
            initialRouteName={isFirstLoad ? Screens.Intro : Screens.Login}
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
            <Stack.Screen name={Screens.Email} component={EmailScreen} />
            <Stack.Screen name={Screens.Verify} component={VerifyScreen} />
            <Stack.Screen
                name={Screens.ResetPassword}
                component={ResetPasswordScreen}
            />
            <Stack.Screen
                name={Screens.AccountSetup}
                component={CreateAccountScreen}
            />
            <Stack.Screen name={Screens.Terms} component={TermsScreen} />
        </Stack.Navigator>
    );
};

const GlobalNavigator = (props: any) => {
    const {theme, isFirstLoad, journey, isLoggedIn} = props;
    const {state} = useAppContext();
    const themeColors = colors.light;
    // const hasSurrogate =
    //     state.user?.journey && state.user?.journey.surrogate_id;
    // const hasParent = state.user?.journey && state.user?.journey.parent_1_id;
    // const surrogateInvited =
    //     state.user?.journey && state.user?.journey.surrogate_invited;
    // const parentInvited =
    //     state.user?.journey && state.user?.journey.parent_invited;

    const isCompleteAccount =
        state.user?.journey?.parent_1_id && state.user?.journey?.surrogate_id;
    const invitations = state.user?.journey?.invitations;
    const hasPendingInvitation = invitations?.length > 0;

    return (
        <NavigationContainer theme={theme}>
            {isLoggedIn
                ? isCompleteAccount
                    ? renderDrawerNavs()
                    : hasPendingInvitation
                        ? renderWaitingNavs(themeColors)
                        : renderInvitationNavs(themeColors)
                : renderAuthNavs(themeColors, isFirstLoad)}
        </NavigationContainer>
    );
};

export default GlobalNavigator;
