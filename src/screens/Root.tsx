import React, {useContext, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import GlobalNavigator from '../navigations/GlobalNavigator';
import RNBootSplash from 'react-native-bootsplash';
import {AppContext} from '../contexts/AppContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

type Props = {
    theme: any;
};

const Root = (props: Props) => {
    const {theme} = props;
    const {state} = useContext(AppContext);

    useEffect(() => {
        if (state.authToken) {
            console.log('lay load all data');
        }
    }, [state.authToken]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <GlobalNavigator theme={theme} />
        </View>
    );
};

export default Root;
