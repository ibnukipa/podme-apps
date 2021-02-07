/* @flow */

import React, { useState, useCallback } from 'react';
import {
  TextInput as RNTextInput,
  View,
  Platform,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { Controller, ControllerProps } from 'react-hook-form';

import Colors from 'constants/colors';
import fontSize from 'constants/fontSize';

import Text from 'components/Text';
import Icon from 'components/Icon';
import Divider from 'components/Divider';

const TEXT_PADDING = 10;

export type TextInputProps = {
  title?: string,
  style?: StyleSheet.Style,
  containerStyle?: StyleSheet.Style,
  infoMessage?: string,
  errorMessage?: string,
  iconPosition?: 'left' | 'right',
  iconName?: string,
  iconOnPress?: Function,
} & RNTextInputProps &
  ControllerProps;

const TextInput = ({
  title,
  containerStyle,
  style,
  secureTextEntry,
  infoMessage,
  errorMessage,
  iconPosition = 'right',
  iconName,
  iconOnPress,
  control,
  name,
  defaultValue = '',
  isSpace = true,
  isDimmed = false,
  isClear = false,
  isLight = false,
  watch,
  setValue,
  opacityAnim,
  onChangeHandler = () => {},
  onClear = () => {},
  ...restProps
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const hasIconLeft = iconName && iconPosition === 'left';
  const hasIconRight = iconName && iconPosition === 'right';
  const watchInput = watch?.(name);
  const [iconColor] = useState(isLight ? Colors.blueGray : Colors.white);
  const onPressSecure = useCallback(() => setIsSecure(!isSecure), [isSecure]);
  const onPressClear = useCallback(() => {
    setValue?.(name, '');
    onClear();
  }, [onClear, setValue]);
  return (
    <View>
      {title && <Text color={Colors.primary}>{title}</Text>}
      <View
        style={[
          styles.container,
          isLight && styles.lightContainer,
          errorMessage && styles.containerError,
          containerStyle,
          isSpace && styles.containerSpace,
          isDimmed && styles.containerDimmed,
        ]}
      >
        {hasIconLeft && (
          <Icon
            color={iconColor}
            onPress={iconOnPress}
            style={styles.iconContainerLeft}
            name={iconName}
          />
        )}
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ onChange, onBlur, value }) => (
            <RNTextInput
              underlineColorAndroid={'transparent'}
              style={[
                styles.textInput,
                hasIconLeft && styles.textInputHasIconLeft,
                hasIconRight && styles.textInputHasIconRight,
                style,
              ]}
              placeholderTextColor={isLight ? Colors.blueGray100 : Colors.whiteDimmed}
              secureTextEntry={isSecure}
              onBlur={onBlur}
              onChangeText={(changedValue) => {
                onChange(changedValue);
                onChangeHandler(changedValue);
              }}
              value={value}
              {...restProps}
            />
          )}
        />

        {secureTextEntry && (
          <Icon
            color={iconColor}
            onPress={onPressSecure}
            style={styles.iconContainerRight}
            name={!isSecure ? 'eye-outline' : 'eye-off-outline'}
          />
        )}
        {isClear && !!watchInput && (
          <Icon
            color={iconColor}
            onPress={onPressClear}
            style={styles.iconContainerRight}
            name={'close-circle'}
          />
        )}
        {hasIconRight && (
          <Icon
            color={Colors.white}
            onPress={iconOnPress}
            style={styles.iconContainerRight}
            name={iconName}
          />
        )}
      </View>
      <View>
        {errorMessage && (
          <Text numberOfLines={1} size={'small'} color={Colors.red} style={styles.message}>
            {errorMessage}
          </Text>
        )}
        {!errorMessage && infoMessage && (
          <Text numberOfLines={1} size={'small'} color={Colors.grey} style={styles.message}>
            {infoMessage}
          </Text>
        )}
      </View>
      {isSpace && <Divider space={infoMessage ? 25 : 20} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blueGray,
  },
  containerDimmed: {
    backgroundColor: Colors.whiteDimmed,
  },
  containerSpace: {
    marginTop: 5,
  },
  containerError: {
    borderColor: Colors.red,
  },
  message: {
    position: 'absolute',
    marginTop: 2,
  },
  textInput: {
    flex: 1,
    fontSize: fontSize.medium,
    fontFamily: 'Roboto-Regular',
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    ...Platform.select({
      ios: {
        paddingTop: TEXT_PADDING,
        paddingBottom: TEXT_PADDING,
        paddingLeft: TEXT_PADDING,
        paddingRight: TEXT_PADDING,
      },
      android: {
        paddingLeft: TEXT_PADDING,
        paddingRight: TEXT_PADDING,
        paddingTop: TEXT_PADDING - 5,
        paddingBottom: TEXT_PADDING - 5,
      },
    }),
  },
  textInputHasIconLeft: {
    paddingLeft: TEXT_PADDING,
  },
  textInputHasIconRight: {
    paddingRight: TEXT_PADDING,
  },
  iconContainerRight: {
    marginRight: TEXT_PADDING,
  },
  iconContainerLeft: {
    marginLeft: TEXT_PADDING + 2,
  },
});

export default TextInput;
