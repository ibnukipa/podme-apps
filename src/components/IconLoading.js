/* @flow */

import React, { useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import spaceSize from 'constants/spaceSize';
import Colors from 'constants/colors';
import Text from 'components/Text';
import Icon from 'components/Icon';

type Props = {
  size?: string,
  color?: string,
  style?: StyleSheet.Style,
  message?: string,
  inlineMessage?: boolean,
  padded?: boolean,
};

const IconLoading = ({
  size = 'huge',
  color = Colors.primary,
  style = {},
  message,
  inlineMessage,
  padded,
}: Props) => {
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
    <View
      style={[
        styles.container,
        padded && styles.containerPadded,
        inlineMessage && styles.containerInline,
        style,
      ]}
    >
      <Icon
        style={[styles.loadingIcon, { transform: [{ rotate }] }]}
        name={'gamepad-circle'}
        type={'mat'}
        size={size}
        color={color}
      />
      {message && (
        <Text size={'small'} style={[styles.message, inlineMessage && styles.messageInline]}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerInline: {
    flexDirection: 'row',
  },
  containerPadded: {
    paddingVertical: spaceSize.medium,
  },
  loadingIcon: {
    minWidth: spaceSize.medium,
    marginRight: spaceSize.xSmall,
    textAlign: 'center',
  },
  message: {
    marginTop: spaceSize.xSmall,
  },
  messageInline: {
    marginLeft: spaceSize.xSmall,
  },
});

export default IconLoading;
