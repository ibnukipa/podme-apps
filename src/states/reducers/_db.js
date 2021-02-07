/* @flow */

// TODO move out db from redux state, use SQL/Realm instead
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import pluralize from 'pluralize';
import { forEach } from 'lodash-es';
import * as schemas from './_dbSchema';

const initialState = {};

// slicer
export const NAME = 'DB';
export const DBSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    normalizeResponse: (state, action) => {
      const { modelName, data, isArray } = action.payload;
      const pluralModelName = pluralize(modelName);
      let originalData = data;
      let schema = schemas[modelName];
      if (isArray) {
        originalData = { [pluralModelName]: data };
        schema = { [pluralModelName]: [schemas[modelName]] };
      }
      const { entities } = normalize(originalData, schema);
      forEach(entities, (value, key) => {
        const oldValue = state[key] || {};
        // TODO insert to local DB instead store it to redux state
        state[key] = {
          ...oldValue,
          ...value,
        };
      });
    },
  },
});

// selectors
export const dbModelSelector = createSelector(
  (state, { modelName }) => [state.db, pluralize(modelName)],
  ([db, modelName]) => db?.[modelName] || {}
);
export const dbIdSelector = createSelector(
  (state, { modelName, id }) => [state.db?.[pluralize(modelName)], id],
  ([table, id]) => table?.[id] || {}
);

// TODO add selector to create query for Local DB
// LocalDB.select(modelName, id)

// actions
export const { normalizeResponse } = DBSlice.actions;

export default DBSlice.reducer;
