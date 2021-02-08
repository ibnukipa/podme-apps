/* @flow */

import { StyleSheet } from 'react-native';
import spaceSize from 'constants/spaceSize';

const styleHeader = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 38,
  },
  containerLeft: {
    justifyContent: 'flex-start',
  },
  titleLeft: {
    marginLeft: spaceSize.medium,
  },
});

export default styleHeader;
