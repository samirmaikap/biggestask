import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Screens from './Screens';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RootNavigator from './RootNavigator';
import {Drawers} from './Drawers';

const Drawer = createDrawerNavigator();

const GlobalNavigator = (props: any) => {
  const {theme} = props;
  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerStyle: {backgroundColor: 'white'},
        }}
        initialRouteName={Screens.RootNavigator}
        drawerContent={Drawers}>
        <Drawer.Screen name={Screens.RootNavigator} component={RootNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default GlobalNavigator;
