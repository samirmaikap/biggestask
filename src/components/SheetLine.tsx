import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
    line: {
        width: 50,
        height: 5,
        backgroundColor: '#E5E6EC',
        borderRadius: 12,
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const SheetLine = () => {
    return (
        <View style={styles.container}>
            <View style={styles.line}/>
        </View>
    );
};
