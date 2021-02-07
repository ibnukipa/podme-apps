/* @flow */

import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { debounce } from 'lodash-es';

type TouchableProps = {
  children?: React.Node,
  onPress?: Function,
  disabled?: boolean,
  activeOpacity?: boolean,
};

const Touchable = ({
  children,
  onPress,
  disabled,
  activeOpacity = 0.8,
  ...props
}: TouchableProps) => {
  const onPressWrapper = useCallback(() => {
    if (onPress instanceof Function) debounce(onPress, 300, { leading: true, trailing: false })();
  });
  return (
    <TouchableOpacity
      disabled={!onPress || disabled}
      activeOpacity={activeOpacity}
      onPress={onPress ? onPressWrapper : null}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Touchable;
