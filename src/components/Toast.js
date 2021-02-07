/* @flow */

import React from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import Colors from 'constants/colors';

const Toast = () => (
  <FlashMessage
    floating
    position="bottom"
    style={styles.container}
    textStyle={styles.text}
    titleStyle={styles.text}
  />
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  text: {
    fontFamily: 'Roboto',
    color: Colors.yellow,
    textAlign: 'center',
  },
});

export default Toast;
