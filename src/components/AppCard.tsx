import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
    },
    cardInner: {
        borderRadius: 12,
        overflow: 'hidden',
    },
});

type Props = {
    children: React.ReactNode;
    shadow?: boolean;
    padding?: number;
    backgroundColor?: string;
    marginVertical?: number;
    marginHorizontal?: number;
};

// @ts-ignore
export const AppCard = (props: Props) => {
    const {
        children,
        shadow = true,
        padding = 0,
        backgroundColor = 'white',
        marginVertical = 0,
        marginHorizontal = 0,
    } = props;
    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: backgroundColor,
                    marginHorizontal: marginHorizontal,
                    marginVertical: marginVertical,
                },
                shadow
                    ? {
                        shadowColor: '#1B1956',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 5,
                    }
                    : {},
            ]}>
            <View style={[styles.cardInner, {padding: padding}]}>{children}</View>
        </View>
    );
};
