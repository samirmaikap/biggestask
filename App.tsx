import React, {StrictMode, useEffect} from 'react';
import Root from './src/screens/Root';
import {
    DefaultTheme,
    Provider as PaperProvider,
    configureFonts,
    MD3LightTheme,
    Surface,
} from 'react-native-paper';
import {LogBox, Platform} from 'react-native';
import colors from './src/theme/colors';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MD3Type} from 'react-native-paper/lib/typescript/types';
import {FONT_NAME} from './src/utils/constants';
import RNBootSplash from 'react-native-bootsplash';
import {AppProvider} from './src/contexts/AppContext';
import {ToastProvider} from 'react-native-toast-notifications';
import {apiInstance} from './src/utils/service';

LogBox.ignoreLogs(['Remote debugger is in a']);

// const fontConfig = {
//   ios: {
//     regular: {
//       fontFamily: 'F37 Moon Regular',
//     },
//     medium: {
//       fontFamily: 'F37 Moon Bold',
//     },
//     light: {
//       fontFamily: 'F37 Moon Light',
//     },
//     thin: {
//       fontFamily: 'F37 Moon Thin',
//     },
//   },
//   android: {
//     regular: {
//       fontFamily: 'moon_regular',
//     },
//     medium: {
//       fontFamily: 'moon_bold',
//     },
//     light: {
//       fontFamily: 'moon_light',
//     },
//     thin: {
//       fontFamily: 'moon_thin',
//     },
//   },
// };

const darkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...colors.dark,
        background: 'white',
    },
};

const lightTheme = {
    ...MD3LightTheme,
    colors: {
        ...DefaultTheme.colors,
        ...colors.light,
        background: 'white',
    },
    fonts: configureFonts({
        config: {
            fontFamily: FONT_NAME,
        } as MD3Type,
    }),
};

export default function App() {
    useEffect(() => {
        const init = async () => {
            // …do multiple sync or async tasks
        };

        init().finally(async () => {
            await RNBootSplash.hide({fade: true});
            console.log('Bootsplash has been hidden successfully');
        });
    }, []);

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <PaperProvider theme={lightTheme}>
                <ToastProvider offsetBottom={40}>
                    <SafeAreaProvider>
                        <AppProvider>
                            <Root theme={lightTheme} />
                        </AppProvider>
                    </SafeAreaProvider>
                </ToastProvider>
            </PaperProvider>
        </GestureHandlerRootView>
    );
}
