import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../theme/colors';
import Screens from './Screens';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from '../screens/profile/Profile';
import {Tabs} from './Tabs';
import { MilestoneDetailsScreen } from '../screens/milestones/MilestoneDetails';
import { AutocompleteScreen } from '../screens/milestones/Autocomplete';
import { MotherDetailsScreen } from '../screens/mother/MotherDetails';
import { PostsScreen } from '../screens/community/Posts';
import { ProvidersScreen } from '../screens/providers/Providers';
import { SettingsScreen } from '../screens/settings/Settings';
import { NotificationsScreen } from '../screens/notifications/Notifications';

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
      <Stack.Screen name={Screens.MilestoneDetails} component={MilestoneDetailsScreen} />
      <Stack.Screen name={Screens.Autocomplete} component={AutocompleteScreen} />
      <Stack.Screen name={Screens.MotherDetails} component={MotherDetailsScreen} />
      <Stack.Screen name={Screens.CommunityPosts} component={PostsScreen} />
      <Stack.Screen name={Screens.Contacts} component={ProvidersScreen} />
      <Stack.Screen name={Screens.Settings} component={SettingsScreen} />
      <Stack.Screen name={Screens.Notifications} component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
