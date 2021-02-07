/* @flow */

import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

import Colors from 'constants/colors';

import Text from 'components/Text';
import Icon from 'components/Icon';
import Container from 'components/Container';

import { persistor, store } from 'states/store';

const App: () => React$Node = () => {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Container header={'Pods'} backgroundColor={Colors.white}>
            <Text bolder>test</Text>
            <Icon />
          </Container>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
