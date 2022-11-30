import colors, {navActiveColor} from '../theme/colors';
import Screens from './Screens';
import {MilestonesScreen} from '../screens/milestones/Milestones';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {MilestonesIcon} from '../components/icons/MilestonesIcon';
import {HomeScreen} from '../screens/home/Home';
import {HomeIcon} from '../components/icons/HomeIcon';
import {QuestionsScreen} from '../screens/questions/Questions';
import {QuestionsIcon} from '../components/icons/QuestionsIcon';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import {FONT_NAME, images} from '../utils/constants';

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1,
    },
    tabIcon: {
        padding: 0,
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Tab = createBottomTabNavigator();

const renderBackgroundComponent = (focused: boolean, icon: any) => {
    return focused ? (
        <ImageBackground
            style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            resizeMode={'contain'}
            source={images.NAV_BACKGROUND}>
            {icon}
        </ImageBackground>
    ) : (
        <View
            style={[
                styles.tabIcon,
                focused
                    ? {backgroundColor: '#AE4B2B'}
                    : {backgroundColor: 'transparent'},
            ]}>
            {icon}
        </View>
    );
};

export const Tabs = (props: any) => {
    const themeColors = colors.light;
    const insets = useSafeAreaInsets();
    const hasNotch = DeviceInfo.hasNotch();
    console.log('hasNotch', insets.bottom);
    return (
        <Tab.Navigator
            initialRouteName={Screens.Home}
            screenOptions={{
                headerShown: false,
                // tabBarShowLabel: false,
                tabBarStyle: {
                    paddingBottom: insets.bottom - 16,
                    // height: 80 + (hasNotch ? 16 : 8),
                    height: 70 + (insets?.bottom ? insets.bottom - 16 : 0),
                    backgroundColor: 'white',
                    borderColor: '#F4F5F6',
                    borderTopWidth: 1,
                },
                tabBarLabelStyle: {
                    fontFamily: FONT_NAME,
                    fontSize: 12,
                    marginBottom: 4,
                },
                headerStyle: {
                    backgroundColor: themeColors.background,
                },
                tabBarActiveTintColor: navActiveColor,
                // headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: '600',
                },
                headerShadowVisible: false,
            }}>
            <Tab.Screen
                name={Screens.Milestones}
                component={MilestonesScreen}
                options={{
                    tabBarLabel: 'Milestones',
                    tabBarIcon: ({focused}) =>
                        renderBackgroundComponent(
                            focused,
                            <MilestonesIcon
                                color={focused ? 'white' : 'black'}
                            />,
                        ),
                }}
            />
            <Tab.Screen
                name={Screens.Home}
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({focused}) =>
                        renderBackgroundComponent(
                            focused,
                            <HomeIcon color={focused ? 'white' : 'black'} />,
                        ),
                }}
            />
            <Tab.Screen
                name={Screens.Questions}
                component={QuestionsScreen}
                options={{
                    tabBarLabel: 'Questions',
                    tabBarIcon: ({focused}) =>
                        renderBackgroundComponent(
                            focused,
                            <QuestionsIcon
                                color={focused ? 'white' : 'black'}
                            />,
                        ),
                }}
            />
        </Tab.Navigator>
    );
};
