/* @flow */

import { dbIdSelector } from 'states/reducers/_db';
import { createSelector, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { take, unionBy } from 'lodash-es';

type Meta = {
  page: number,
  hasNext: boolean,
};

export type PodListState = {
  data: Array<number>,
  isLoading: boolean,
  fetchingMore: boolean,
  hasError: boolean,
  meta: Meta,
  error: string,
};

const initialState: PodListState = {
  data: [],
  isLoading: false,
  fetchingMore: false,
  hasError: false,
  meta: {},
};

export const NAME = 'PodList';
export const PodListSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    podListRequested: (
      state: Draft<PodListState>,
      action: PayloadAction<{ isClearing: boolean, isReFetch: boolean }>
    ) => {
      const { isClearing, isReFetch } = action.payload;
      state.data = isReFetch ? [] : isClearing ? take(state.data, 20) : state.data;
      state.isLoading = isClearing || isReFetch;
      state.fetchingMore = !isClearing && !isReFetch;
    },
    podListSuccess: (
      state: Draft<PodListState>,
      action: PayloadAction<{ data: Array<{ id: number }>, meta: Meta }>
    ) => {
      const { data, meta } = action.payload;
      state.data = unionBy(state.data, data, 'id');
      state.meta = meta;
      state.isLoading = false;
      state.fetchingMore = false;
      state.hasError = false;
    },
    podListError: (
      state: Draft<PodListState>,
      action: PayloadAction<{ meta: Meta, error: string }>
    ) => {
      const { meta, error } = action.payload;
      state.meta = meta;
      state.isLoading = false;
      state.fetchingMore = false;
      state.hasError = true;
      state.error = error;
    },
  },
});

// selectors
export const podListStateSelector = (state) => state.podList;
export const podListSelector = createSelector(podListStateSelector, (podList) => podList?.data);
export const podSelector = (state, id) => dbIdSelector(state, { modelName: 'pod', id }) || {};

// actions and reducer
export const { podListRequested, podListSuccess, podListError } = PodListSlice.actions;
export default PodListSlice.reducer;
