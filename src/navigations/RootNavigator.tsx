import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../theme/colors';
import Screens from './Screens';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from '../screens/profile/Profile';
import {Tabs} from './Tabs';

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
  tabIcon: {
    width: 40,
    height: 40,
    borderRadius: 40 * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createStackNavigator();

const RootNavigator = () => {
  const themeColors = colors.light;

  // @ts-ignore
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
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
    </Stack.Navigator>
  );
};

export default RootNavigator;
