/* @flow */

import React, { useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IconAnimated = Animated.createAnimatedComponent(Icon);

type Props = {
  size?: number,
  color?: string,
  style?: StyleSheet.Style,
};

const IconLoading = ({ size, color, style = {} }: Props) => {
  const rotationAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);
  const rotate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <IconAnimated
      style={[styles.loadingIcon, { transform: [{ rotate }] }, style]}
      name={'gamepad-circle'}
      size={size}
      color={color}
    />
  );
};

const styles = StyleSheet.create({
  loadingIcon: {
    minWidth: 15,
    marginRight: 5,
    textAlign: 'center',
  },
});

export default IconLoading;
