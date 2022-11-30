import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    innerContainer: {
        padding: 16
    },
    row: {
        flexGrow: 'row',
        alignItems: 'center'
    },
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export const HelpScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.innerContainer}>

                </View>
            </ScrollView>
        </View>
    );
};
