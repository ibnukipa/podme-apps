/* @flow */

import { createEpicMiddleware } from 'redux-observable';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { createPersistStorage } from 'utils/storage';

import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducerRegis';
import epics from './epicRegis';

const persistConfig = {
  key: 'podmeStateStorage',
  storage: createPersistStorage(),
};

const persistedReducers = persistReducer(persistConfig, reducers);

const epicMiddleware = createEpicMiddleware();
const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(epicMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});
epicMiddleware.run(epics);

const persistor = persistStore(store);
// persistor.purge();
export { persistor, store };
