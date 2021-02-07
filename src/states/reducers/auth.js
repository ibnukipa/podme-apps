/* @flow */

import { createSelector, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  isLoggedIn: boolean,
  loggedUserId: number,
};

const initialState: AuthState = {
  isLoggedIn: false,
};

export const NAME = 'Auth';
export const AuthSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    authenticated: (state: Draft<AuthState>, action: PayloadAction<{ id: number }>) => {
      const { payload } = action;
      state.isLoggedIn = true;
      state.loggedUserId = payload.id;
    },
    deAuthenticated: (state: Draft<AuthState>) => {
      state.isLoggedIn = false;
      state.loggedUserId = null;
    },
  },
});

// selectors
export const authState = (state) => state?.auth;
export const authSelector = createSelector(authState, (auth) => auth);

// actions and reducer
export const { authenticated, deAuthenticated } = AuthSlice.actions;
export default AuthSlice.reducer;
