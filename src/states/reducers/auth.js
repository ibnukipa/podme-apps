/* @flow */

import { createSelector, createSlice, Draft } from '@reduxjs/toolkit';

export type AuthState = {
  isLoggedIn: boolean,
};

const initialState: AuthState = {
  isLoggedIn: false,
};

export const NAME = 'Auth';
export const AuthSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    authenticated: (state: Draft<AuthState>) => {
      state.isLoggedIn = true;
    },
  },
});

// selectors
export const authState = (state) => state?.auth;
export const authSelector = createSelector(authState, (auth) => auth);

// actions and reducer
export const { authenticated } = AuthSlice.actions;
export default AuthSlice.reducer;
