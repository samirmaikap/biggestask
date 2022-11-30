import React from 'react';
import {$DeepPartial} from '@callstack/react-theme-provider';
import {RefAttributes, ReactNode} from 'react';
import {ViewProps, View, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Button, SurfaceProps} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {InternalTheme} from 'react-native-paper/lib/typescript/types';
import AppStyles from '../theme/AppStyles';

export default function AppButton(
    props: JSX.IntrinsicAttributes &
        Pick<
            Pick<
                SurfaceProps,
                keyof ViewProps | 'theme' | 'elevation' | 'key'
            > &
                RefAttributes<View> & {
                    mode?:
                        | 'text'
                        | 'outlined'
                        | 'contained'
                        | 'elevated'
                        | 'contained-tonal'
                        | undefined;
                    dark?: boolean | undefined;
                    compact?: boolean | undefined;
                    color?: string | undefined;
                    buttonColor?: string | undefined;
                    textColor?: string | undefined;
                    loading?: boolean | undefined;
                    icon?: IconSource | undefined;
                    disabled?: boolean | undefined;
                    children: ReactNode;
                    uppercase?: boolean | undefined;
                    accessibilityLabel?: string | undefined;
                    accessibilityHint?: string | undefined;
                    onPress?: (() => void) | undefined;
                    onPressIn?: (() => void) | undefined;
                    onPressOut?: (() => void) | undefined;
                    onLongPress?: (() => void) | undefined;
                    contentStyle?: StyleProp<ViewStyle>;
                    style?: StyleProp<ViewStyle>;
                    labelStyle?: StyleProp<TextStyle>;
                    theme: InternalTheme;
                    testID?: string | undefined;
                },
            | keyof ViewProps
            | 'elevation'
            | 'dark'
            | 'color'
            | 'onPress'
            | 'onPressIn'
            | 'onPressOut'
            | 'onLongPress'
            | 'disabled'
            | 'icon'
            | 'mode'
            | 'loading'
            | 'uppercase'
            | 'labelStyle'
            | keyof RefAttributes<View>
            | 'compact'
            | 'buttonColor'
            | 'textColor'
            | 'contentStyle'
        > & {theme?: $DeepPartial<unknown> | undefined},
) {
    return (
        <Button
            labelStyle={{fontSize: 16, fontWeight: '600'}}
            style={AppStyles.button}
            contentStyle={AppStyles.buttonContent}
            {...props}
        />
    );
}
