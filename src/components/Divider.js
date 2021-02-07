/* @flow */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import spaceSize from 'constants/spaceSize';

export type DividerProps = {
  space?: number,
  horizontal?: boolean,
  style?: StyleSheet.Style,
};

const Divider = ({ style, space = spaceSize.xSmall, horizontal = false }: DividerProps) => (
  <View
    style={[{ marginVertical: space / 2 }, horizontal && { marginHorizontal: space / 2 }, style]}
  />
);

export default Divider;
