/* @flow */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

import { isReadyRouterRef, routerRef } from 'routes/RouterService';
import Router from 'routes/Router';
import Toast from 'components/Toast';

import { persistor, store } from 'states/store';

import { NavigationContainer } from '@react-navigation/native';
import { makeServer } from './src/_fakeServer';

if (window.server) {
  window.server.shutdown();
}
window.server = makeServer();

enableScreens();

const App: () => React$Node = () => {
  useEffect(() => () => (isReadyRouterRef.current = false), []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer
            ref={routerRef}
            onReady={() => {
              BootSplash.hide({ fade: true }).then(() => {
                isReadyRouterRef.current = true;
              });
            }}
          >
            <Router />
            <Toast />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
