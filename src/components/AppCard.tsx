import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
  },
  cardInner: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});

type Props = {
  shadow?: boolean;
  padding?: number;
  backgroundColor?: string;
  marginVertical?: number;
  marginHorizontal?: number;
};

// @ts-ignore
export const AppCard = ({children}, props: Props) => {
  const {
    shadow = true,
    padding = 16,
    backgroundColor = 'white',
    marginVertical = 0,
    marginHorizontal = 16,
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
