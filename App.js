/* @flow */

import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Text from 'components/Text';
import Icon from 'components/Icon';
import { persistor, store } from 'states/store';

const App: () => React$Node = () => {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Text bolder>test</Text>
        <Icon />
      </PersistGate>
    </Provider>
  );
};

export default App;
