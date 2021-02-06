/* @flow */

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Animated } from 'react-native';

import Colors from 'constants/colors';
import type { FontSize } from 'constants/fontSize';
import fontSize from 'constants/fontSize';

import Touchable from 'components/Touchable';

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
};

const Icon = ({
  name = 'contrast-outline',
  color = Colors.black,
  size = 'medium',
  type = 'ion',
  ...props
}: IconProps) => {
  const Component = TYPES[type];
  return (
    <Touchable onPress={props.onPress}>
      <Component {...props} color={color} name={name} size={fontSize[size]} />
    </Touchable>
  );
};

export default Icon;
