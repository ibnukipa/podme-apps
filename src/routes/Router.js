/* @flow */

import React from 'react';
import { useSelector } from 'react-redux';
import { routeAnimationFading } from 'utils/routeAnim';
import { authSelector } from 'states/reducers/auth';
import type { AuthState } from 'states/reducers/auth';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { userScreens, authScreens } from './_routeRegis';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const UserStack = createStackNavigator();

const defaultNavigatorProps = {
  screenOptions: {
    cardOverlayEnabled: true,
    gestureEnabled: true,
    ...TransitionPresets.SlideFromRightIOS,
  },
  headerMode: 'none',
};

const AuthScreen = () => (
  <AuthStack.Navigator initialRouteName="Login" {...defaultNavigatorProps}>
    {Object.entries(authScreens).map(([name, comp]) => (
      <AuthStack.Screen key={name} name={name} component={comp} />
    ))}
  </AuthStack.Navigator>
);

const UserScreen = () => (
  <UserStack.Navigator initialRouteName="Home" {...defaultNavigatorProps}>
    {Object.entries(userScreens).map(([name, comp]) => (
      <AuthStack.Screen key={name} name={name} component={comp} />
    ))}
  </UserStack.Navigator>
);

const Router = () => {
  const auth: AuthState = useSelector((state) => authSelector(state));
  return (
    <RootStack.Navigator {...defaultNavigatorProps}>
      {auth.isLoggedIn ? (
        <RootStack.Screen name={'UserScreen'} component={UserScreen} />
      ) : (
        <RootStack.Screen
          name={'AuthScreen'}
          component={AuthScreen}
          options={{
            cardStyleInterpolator: routeAnimationFading,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default Router;
