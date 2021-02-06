/* @flow */

import React, { useEffect } from 'react';
import { Text } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'states/store';

const App: () => React$Node = () => {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Text>test</Text>
      </PersistGate>
    </Provider>
  );
};

export default App;
