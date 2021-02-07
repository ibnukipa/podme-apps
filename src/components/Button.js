/* @flow */

import React, { Node } from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from 'constants/colors';
import spaceSize from 'constants/spaceSize';

import Touchable from 'components/Touchable';
import Text from 'components/Text';
import Icon from 'components/Icon';
import IconLoading from 'components/./IconLoading';

import { isString } from 'lodash-es';

export type ButtonProps = {
  text?: string,
  textCentered?: boolean,
  icon?: string | Node,
  isDisabled?: boolean,
  isLoading?: boolean,
  isDimmed?: boolean,
  theme?: 'light' | 'transparent',
  onPress?: Function,
  containerStyle?: StyleSheet.Style,
};

export const ButtonGroup = ({ children }) => (
  <View style={styles.groupedButtonContainer}>
    {React.Children.map(children, (child, index) => {
      let containerStyle = styles.groupedButton;
      if (index === 0) containerStyle = styles.groupedButtonFirst;
      if (index === children.length - 1) containerStyle = styles.groupedButtonLast;
      return React.cloneElement(child, { containerStyle });
    })}
  </View>
);

const Button = ({
  onPress,
  isLoading,
  isDisabled,
  isDimmed,
  containerStyle,
  theme,
  text,
  textCentered = false,
  icon = null,
}: ButtonProps) => (
  <Touchable disabled={isDisabled || isLoading} onPress={onPress}>
    <View
      style={[
        styles.container,
        theme === 'light' && styles.containerLight,
        theme === 'transparent' && styles.containerTransparent,
        (isLoading || isDisabled) && styles.containerGrayed,
        isDimmed && styles.containerDimmed,
        containerStyle,
      ]}
    >
      {isLoading ? (
        <IconLoading size={'large'} color={Colors.white} />
      ) : (
        <>
          <Text
            center={textCentered}
            bold
            color={theme === 'light' || theme === 'transparent' ? Colors.primary : Colors.white}
          >
            {text}
          </Text>
          {isString(icon) ? (
            <Icon
              style={styles.icon}
              size={'small'}
              name={icon}
              color={theme === 'light' || theme === 'transparent' ? Colors.primary : Colors.white}
            />
          ) : (
            icon
          )}
        </>
      )}
    </View>
  </Touchable>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    height: spaceSize.uLarge,
    minWidth: 125,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerLight: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
  },
  containerTransparent: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.transparent,
  },
  containerGrayed: {
    backgroundColor: Colors.blueGray50,
    borderColor: Colors.blueGray50,
  },
  containerDimmed: {
    backgroundColor: Colors.gradientPrimaryDimmed,
    borderColor: Colors.transparent,
  },
  icon: {
    paddingLeft: spaceSize.xSmall,
  },
  groupedButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupedButton: {
    marginHorizontal: spaceSize.xSmall,
  },
  groupedButtonFirst: {
    marginHorizontal: spaceSize.xSmall,
    marginLeft: 0,
  },
  groupedButtonLast: {
    marginHorizontal: spaceSize.xSmall,
    marginRight: 0,
  },
});

export default Button;
