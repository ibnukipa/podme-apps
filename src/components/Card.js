/* @flow */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from 'constants/colors';
import spaceSize from 'constants/spaceSize';
import styleShadow from 'constants/styleShadow';

import IconLoading from 'components/IconLoading';

export type CardProps = {
  containerStyle?: StyleSheet.Style,
  noShadow?: boolean,
  isLoading?: boolean,
  children?: React.Node,
};

const Card = ({ children, containerStyle, noShadow, isLoading }: CardProps) => (
  <View
    style={[
      styles.container,
      !children && isLoading && styles.containerOnlyLoading,
      !noShadow && styleShadow.medium,
      containerStyle,
    ]}
  >
    {children}
    {isLoading && (
      <View style={styles.loadingMaskedView}>
        <IconLoading color={Colors.primary} />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: Colors.white,
    padding: spaceSize.medium,
    borderRadius: 15,
  },
  containerOnlyLoading: {
    alignSelf: 'center',
    maxWidth: '60%',
    paddingVertical: spaceSize.large,
  },
  loadingMaskedView: {
    borderRadius: 15,
    backgroundColor: Colors.grayDimmed,
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFill,
  },
});

export default Card;
