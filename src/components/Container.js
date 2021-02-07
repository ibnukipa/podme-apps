/* @flow */

import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import Colors from 'constants/colors';
import spaceSize from 'constants/spaceSize';

import Text from 'components/Text';

import { isString } from 'lodash-es';

export type ContainerProps = {
  children?: React.Node,
  containerStyle?: StyleSheet.Style,
  barStyle?: 'light' | 'dark',
  backgroundColor?: string,
  header?: React.Node | string,
};

const ContainerChildrenWrapper = React.memo(({ children, containerStyle }) => (
  <View style={[styles.childrenContainer, containerStyle]}>{children}</View>
));

const Container = ({
  children,
  containerStyle,
  barStyle = 'light',
  backgroundColor,
  header = null,
}: ContainerProps) => {
  const insets = useSafeAreaInsets();
  const containerPaddingStyle = useCallback(() => {
    const extraPaddingTop = header ? spaceSize.medium : 0;
    return {
      paddingTop: insets.top + extraPaddingTop,
    };
  }, [insets]);
  const colors = useCallback(
    () => [backgroundColor || Colors.gradientPrimary, backgroundColor || Colors.gradientSecondary],
    [backgroundColor]
  );
  return (
    <LinearGradient
      colors={colors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.9 }}
      style={[styles.container, !header && containerPaddingStyle()]}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle={`${barStyle}-content`} />
      {header && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.9 }}
          colors={[Colors.gradientPrimary, Colors.gradientSecondary]}
          style={[styles.headerContainer, containerPaddingStyle()]}
        >
          {isString(header) ? (
            <Text size={'xLarge'} color={barStyle === 'light' ? Colors.white : Colors.primary} bold>
              {header}
            </Text>
          ) : (
            header
          )}
        </LinearGradient>
      )}
      {children && (
        <ContainerChildrenWrapper header={header} containerStyle={containerStyle}>
          {children}
        </ContainerChildrenWrapper>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  headerContainer: {
    paddingVertical: spaceSize.medium,
    paddingHorizontal: spaceSize.large,
  },
});

export default Container;
