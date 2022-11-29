import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {toRgba} from '../utils/utils';

type Props = {
  children: React.ReactNode;
  color?: string;
  roundness?: number;
  backgroundColor?: string;
  size?: number;
};

export const TransparentIcon = (props: Props) => {
  const theme = useTheme();
  const {
    children,
    size = 40,
    color = theme.colors.primary,
    roundness = 8,
    backgroundColor,
  } = props;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius: roundness,
        backgroundColor: backgroundColor ? backgroundColor : toRgba(color, 0.3),
      }}>
      {children}
    </View>
  );
};
