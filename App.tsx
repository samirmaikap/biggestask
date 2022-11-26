import React from 'react';
import Root from './src/screens/Root';
import {
  MD3DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
  MD3LightTheme,
} from 'react-native-paper';
import {LogBox, useColorScheme} from 'react-native';
import colors from './src/theme/colors';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

LogBox.ignoreLogs(['Remote debugger is in a']);

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors.dark,
    background: '#f7f7f7',
  },
};

const lightTheme = {
  ...MD3LightTheme,

  colors: {
    ...DefaultTheme.colors,
    ...colors.light,
    background: '#f7f7f7',
  },
};

export default function App() {
  return (
    <PaperProvider theme={lightTheme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <Root theme={lightTheme} />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
