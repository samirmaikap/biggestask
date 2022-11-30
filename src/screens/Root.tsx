import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import GlobalNavigator from '../navigations/GlobalNavigator';

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
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <GlobalNavigator theme={theme} />
        </View>
    );
};

export default Root;
