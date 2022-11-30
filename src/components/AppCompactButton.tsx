import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppText} from './AppText';
import {useTheme} from 'react-native-paper';

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
});

type Props = {
    name: string;
    color?: string;
    textColor?: string;
    onPress?: (() => void) | undefined;
    outlined?: boolean;
};

export const AppCompactButton = (props: Props) => {
    const theme = useTheme();
    const {
        name,
        color = theme.colors.primary,
        textColor = 'white',
        onPress,
        outlined = false,
    } = props;
    return (
        <TouchableOpacity
            onPress={() => onPress && onPress()}
            activeOpacity={0.8}
            style={[
                styles.button,
                {
                    backgroundColor: outlined ? 'transparent' : color,
                    borderColor: color,
                },
            ]}>
            <AppText
                color={textColor}
                variant={'custom'}
                size={14}
                fontWeight={'600'}>
                {name}
            </AppText>
        </TouchableOpacity>
    );
};
