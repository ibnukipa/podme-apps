/* @flow */

// TODO move out db from redux state, use SQL/Realm instead
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import pluralize from 'pluralize';
import { forEach, forIn, isArray } from 'lodash-es';
import * as schemas from './_dbSchema';

const initialState = {};

// slicer
export const NAME = 'DB';
export const DBSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    normalizeResponse: (state, action) => {
      const { modelName, data, isNested } = action.payload;

      const computeData = (realData, realModel) => {
        const pluralModelName = pluralize(realModel);
        let schema = schemas[realModel];
        let originalData = realData;
        if (isArray(realData)) {
          originalData = { [pluralModelName]: realData };
          schema = { [pluralModelName]: [schemas[realModel]] };
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
      };

      if (isNested) {
        forIn(data, (originalData, originalModel) => {
          computeData(originalData, pluralize.singular(originalModel));
        });
      } else {
        computeData(data, modelName);
      }
    },
  },
});

// selectors
export const dbModelSelector = createSelector(
  (state, { modelName }) => [state._db, pluralize(modelName)],
  ([db, modelName]) => db?.[modelName] || {}
);
export const dbIdSelector = createSelector(
  (state, { modelName, id }) => [state._db?.[pluralize(modelName)], id],
  ([model, id]) => model?.[id] || {}
);

// TODO add selector to create query for Local DB
// LocalDB.select(modelName, id)

// actions
export const { normalizeResponse } = DBSlice.actions;

export default DBSlice.reducer;
