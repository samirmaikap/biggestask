import React from 'react';
import {View} from 'react-native';

type Props = {
  gap?: number;
  isHorizontal?: boolean;
};

export const AppSpacing = (props: Props) => {
  const {gap = 4, isHorizontal = false} = props;
  return (
    <View
      style={isHorizontal ? {width: gap, height: 1} : {height: gap, width: 1} }
    />
  );
};
