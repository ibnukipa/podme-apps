/* @flow */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const deviceWidth = width;
export const deviceHeight = height;

export const getWidthPercentage = (percent) => (percent / 100) * width;
export const getHeightPercentage = (percent) => (percent / 100) * width;
