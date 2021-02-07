/* @flow */

import React, { Node, useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styleContainer from 'constants/styleContainer';
import { deviceHeight } from 'utils/dimension';

export type KeyboardAwareProps = {
  centered?: boolean,
  children: Node,
};

const KeyboardAware = ({ children, centered = false }: KeyboardAwareProps) => {
  const insets = useSafeAreaInsets();
  const [isKeyboardOpened, setIsKeyboardOpened] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardShow);
    Keyboard.addListener('keyboardDidHide', keyboardHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardShow);
      Keyboard.removeListener('keyboardDidHide', keyboardHide);
    };
  }, []);

  const keyboardShow = () => {
    setIsKeyboardOpened(true);
  };

  const keyboardHide = () => {
    setIsKeyboardOpened(false);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'handled'}
      scrollEnabled={isKeyboardOpened}
      enableOnAndroid
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View
        style={[
          centered && styleContainer.centered,
          { height: deviceHeight - insets.top - insets.bottom },
        ]}
      >
        {children}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAware;
