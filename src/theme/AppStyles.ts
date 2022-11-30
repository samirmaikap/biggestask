import {StyleSheet} from 'react-native';
import {Colors} from './colors';

const appStyles = StyleSheet.create({
    textSmall: {
        fontSize: 12,
    },
    textMedium: {
        fontSize: 17,
        // fontFamily: 'F37 Moon',
    },
    textLarge: {
        fontSize: 30,
    },
    textBold: {
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    buttonContent: {
        paddingVertical: 4,
    },
    textInput: {
        backgroundColor: Colors.grey_bg,
        borderRadius: 12,
        borderColor: 'red',
    },
    appBarContainer: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        alignItems: 'center',
        paddingBottom: 8,
    },
    appbarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    appbarAction: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    dropdownContainerStyle: {
        borderColor: 'white',
        borderWidth: 0,
        shadowColor: '#1B1956',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: 'white',
        overflow: 'visible',
        zIndex: 99,
    },
    dropdownInput: {
        borderColor: 'white',
        borderTopWidth: 0,
        backgroundColor: Colors.grey_bg,
        borderRadius: 12,
    },
    textArea: {
        borderColor: 'transparent',
    },
});

export default appStyles;
