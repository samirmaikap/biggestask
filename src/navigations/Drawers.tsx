import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Alert, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {AppImage} from '../components/AppImage';
import {primaryColor} from '../theme/colors';
import {UsersIcon} from '../components/icons/UsersIcon';
import {CommunityIcon} from '../components/icons/CommunityIcon';
import {ContactProviderIcon} from '../components/icons/ContactProviderIcons';
import {SettingsIcon} from '../components/icons/SettingsIcon';
import {Switch} from 'react-native-paper';
import {LogoutIcon} from '../components/icons/LogoutIcon';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
});

export const Drawers = (props: any) => {
  const {height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <DrawerContentScrollView
      contentContainerStyle={{minHeight: height - 32}}
      {...props}>
      <View style={styles.profileContainer}>
        <View>
          <AppImage />
        </View>
        <View style={{marginLeft: 16}}>
          <Text style={styles.name}>MaryJane Cornahan</Text>
          <Text style={[styles.description, {color: primaryColor}]}>
            Parents
          </Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View>
          <DrawerItem
            icon={() => (
              <View style={{marginRight: -16}}>
                <UsersIcon />
              </View>
            )}
            label="Your Surrogate Mother"
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            icon={() => (
              <View style={{marginRight: -16}}>
                <CommunityIcon />
              </View>
            )}
            label="Community"
            onPress={() => props.navigation.navigate('Profile')}
          />
          <DrawerItem
            icon={() => (
              <View style={{marginRight: -16}}>
                <ContactProviderIcon />
              </View>
            )}
            label="Contact Your Provider"
            onPress={() => props.navigation.navigate('Profile')}
          />
          <DrawerItem
            icon={() => (
              <View style={{marginRight: -16}}>
                <SettingsIcon />
              </View>
            )}
            label="Settings"
            onPress={() => props.navigation.navigate('Settings')}
          />
          <View style={styles.switchContainer}>
            <Text>Show Pregnancy Milestone</Text>
            <Switch style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}} />
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
          onPress={() => Alert.alert('Logout')}
        />
        <View style={{marginBottom: insets.bottom}} />
      </View>
    </DrawerContentScrollView>
  );
};
