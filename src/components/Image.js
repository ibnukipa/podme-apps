/* @flow */

import React, { useState } from 'react';
import { StyleSheet, Image as RNImage, ImageProps as RNImageProps } from 'react-native';
import Colors from 'constants/colors';
import Touchable from 'components/Touchable';
import IconLoading from 'components/IconLoading';

export type ImageProps = {
  onPress?: Function,
} & RNImageProps;

const Image = ({ onPress, ...props }: ImageProps) => {
  const [isReady, setIsReady] = useState(false);
  return (
    <Touchable onPress={onPress} style={styles.container}>
      <RNImage
        onLoadEnd={() => setIsReady(true)}
        onLoadStart={() => setIsReady(false)}
        {...props}
      />
      {!isReady && (
        <IconLoading color={Colors.blueGray} style={styles.loadingIcon} size={'xxSmalll'} />
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blueGray50,
  },
  loadingIcon: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Image;
