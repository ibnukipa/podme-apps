/* @flow */

import React from 'react';
import { Text as RNText, StyleSheet, TextProps as RNTextProps } from 'react-native';

import Colors from 'constants/colors';
import type { FontSize } from 'constants/fontSize';
import fontSize from 'constants/fontSize';

type TextProps = {
  align?: 'center' | 'left' | 'right' | 'justify',
  color?: string,
  lineHeight?: number,
  letterSpacing?: number,
  size?: FontSize,
  lighter?: boolean,
  light?: boolean,
  bold?: boolean,
  bolder?: boolean,
  medium?: boolean,
  underline?: boolean,
  style?: StyleSheet.Styles,
} & RNTextProps;

const Text = ({
  children,
  align = 'left',
  color = Colors.blueGray600,
  lineHeight,
  letterSpacing = 0.3,
  size = 'medium',
  lighter,
  light,
  bold,
  bolder,
  medium,
  underline,
  style,
  ...props
}: TextProps) => (
  <RNText
    onPress={props.onPress}
    style={[
      styles.text,
      letterSpacing && { letterSpacing },
      color && { color },
      lineHeight && { lineHeight },
      lighter && styles.lighter,
      light && styles.light,
      bold && styles.bold,
      bolder && styles.bolder,
      medium && styles.medium,
      underline && styles.underline,
      { textAlign: align },
      { fontSize: fontSize[size] },
      style,
    ]}
    {...props}
    allowFontScaling={false}
  >
    {children}
  </RNText>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
  lighter: {
    fontFamily: 'Roboto-Light',
  },
  light: {
    fontFamily: 'Roboto-Thin',
  },
  medium: {
    fontFamily: 'Roboto-Medium',
  },
  bold: {
    fontFamily: 'Roboto-Bold',
  },
  bolder: {
    fontFamily: 'Roboto-Black',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default Text;
