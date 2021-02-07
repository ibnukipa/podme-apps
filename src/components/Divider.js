/* @flow */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import spaceSize from 'constants/spaceSize';
import Colors from 'constants/colors';

export type DividerProps = {
  space?: number,
  horizontal?: boolean,
  line?: boolean,
  style?: StyleSheet.Style,
};

const Divider = ({ style, space = spaceSize.xSmall, horizontal = false, line }: DividerProps) => (
  <View
    style={[
      { marginVertical: space / 2 },
      horizontal && { marginHorizontal: space / 2 },
      line && styles.line,
      line && horizontal && styles.lineVertical,
      style,
    ]}
  />
);

const styles = StyleSheet.create({
  line: {
    borderColor: Colors.gray,
    borderTopWidth: spaceSize.uSmall,
    marginHorizontal: spaceSize.medium,
  },
  lineVertical: {
    borderTopWidth: 0,
    marginVertical: spaceSize.medium,
    borderLeftWidth: spaceSize.uSmall,
  },
});

export default Divider;
