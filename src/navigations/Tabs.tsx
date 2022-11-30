import colors, {navActiveColor} from '../theme/colors';
import Screens from './Screens';
import {MilestonesScreen} from '../screens/milestones/Milestones';
import {StyleSheet, View} from 'react-native';
import {MilestonesIcon} from '../components/icons/MilestonesIcon';
import {HomeScreen} from '../screens/home/Home';
import {HomeIcon} from '../components/icons/HomeIcon';
import {QuestionsScreen} from '../screens/questions/Questions';
import {QuestionsIcon} from '../components/icons/QuestionsIcon';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import {FONT_NAME} from '../utils/constants';

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1,
    },
    tabIcon: {
        marginBottom: -4,
        padding: 0,
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Tab = createBottomTabNavigator();

export const Tabs = (props: any) => {
    const themeColors = colors.light;
    const insets = useSafeAreaInsets();
    const hasNotch = DeviceInfo.hasNotch();
    console.log('hasNotch', hasNotch);
    return (
        <Tab.Navigator
            initialRouteName={Screens.Home}
            screenOptions={{
                headerShown: false,
                // tabBarShowLabel: false,
                tabBarStyle: {
                    paddingBottom: hasNotch ? insets.bottom - 8 : 8,
                    height: 80 + (hasNotch ? 16 : 8),
                    backgroundColor: 'white',
                    borderColor: '#F4F5F6',
                    borderTopWidth: 1,
                },
                tabBarLabelStyle: {
                    fontFamily: FONT_NAME,
                    fontSize: 12,
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
                    tabBarIcon: ({focused}) => (
                        <View
                            style={[
                                styles.tabIcon,
                                focused
                                    ? {backgroundColor: '#AE4B2B'}
                                    : {backgroundColor: 'transparent'},
                            ]}>
                            <MilestonesIcon color={focused ? 'white' : 'black'}/>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={Screens.Home}
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({focused}) => (
                        <View
                            style={[
                                styles.tabIcon,
                                focused
                                    ? {backgroundColor: '#AE4B2B'}
                                    : {backgroundColor: 'transparent'},
                            ]}>
                            <HomeIcon color={focused ? 'white' : 'black'}/>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={Screens.Questions}
                component={QuestionsScreen}
                options={{
                    tabBarLabel: 'Questions',
                    tabBarIcon: ({focused}) => (
                        <View
                            style={[
                                styles.tabIcon,
                                focused
                                    ? {backgroundColor: '#AE4B2B'}
                                    : {backgroundColor: 'transparent'},
                            ]}>
                            <QuestionsIcon color={focused ? 'white' : 'black'}/>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
