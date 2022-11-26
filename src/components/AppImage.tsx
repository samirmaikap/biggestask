import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

type Props = {
  size?: number;
};

export const AppImage = (props: Props) => {
  const {size = 56} = props;
  return (
    <View
      style={[styles.container, {width: size, height: size, borderRadius: 10}]}>
      <Image
        style={styles.image}
        source={{uri: 'https://webmeup.com/upload/blog/lead-image-105.png'}}
      />
    </View>
  );
};
