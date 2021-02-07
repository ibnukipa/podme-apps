/* @flow */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Animated } from 'react-native';

import Colors from 'constants/colors';
import type { FontSize } from 'constants/fontSize';
import fontSize from 'constants/fontSize';
import spaceSize from 'constants/spaceSize';

import Touchable from 'components/Touchable';
import Text from 'components/Text';

const IoniconsAnimated = Animated.createAnimatedComponent(Ionicons);
const FontAwesome5Animated = Animated.createAnimatedComponent(FontAwesome5);
const MaterialCommunityIconsAnimated = Animated.createAnimatedComponent(MaterialCommunityIcons);

const TYPES = {
  ion: IoniconsAnimated,
  aw5: FontAwesome5Animated,
  mat: MaterialCommunityIconsAnimated,
};

type IconProps = {
  name?: string,
  color?: string,
  size?: FontSize,
  type?: typeof TYPES,
  onPress?: Function,
  label?: string,
};

const Icon = ({
  name = 'contrast-outline',
  color = Colors.black,
  size = 'medium',
  type = 'ion',
  onPress,
  label,
  ...props
}: IconProps) => {
  const Component = TYPES[type];
  return (
    <Touchable onPress={onPress}>
      <Component {...props} color={color} name={name} size={fontSize[size]} />
      {label && (
        <View style={styles.label}>
          <Text size="small" bold>
            {label}
          </Text>
        </View>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  label: {
    right: -spaceSize.small,
    top: -spaceSize.xSmall,
    position: 'absolute',
    backgroundColor: Colors.yellow,
    paddingVertical: spaceSize.uSmall,
    paddingHorizontal: spaceSize.xxSmall,
    borderRadius: spaceSize.small,
  },
});

export default Icon;
