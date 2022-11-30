import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    zIndex: 99,
  },
});

type Props = {
  size?: number;
  roundness?: number;
  resizeMode?: any;
  isLocal?: boolean;
  uri: any;
};

export const AppImage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    size = 56,
    roundness = 12,
    resizeMode = 'cover',
    uri,
    isLocal = false,
  } = props;
  return (
    <View
      style={[
        styles.container,
        {width: size, height: size, borderRadius: roundness},
      ]}>
      {isLoading && (
        <View style={[styles.overlay, {width: size, height: size}]}>
          <ActivityIndicator color={'white'} />
        </View>
      )}
      <Image
        onLoadEnd={() => setIsLoading(false)}
        style={[styles.image, {resizeMode: resizeMode}]}
        source={isLocal ? uri : {uri: uri}}
      />
    </View>
  );
};
