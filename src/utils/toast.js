/* @flow */

import { showMessage } from 'react-native-flash-message';

const showToast = (message: string, type: string = 'info') => {
  showMessage({ message, type });
};

export default showToast;
