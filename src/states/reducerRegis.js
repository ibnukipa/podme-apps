/* @flow */

import { combineReducers } from 'redux';
import db from './reducers/_db';

// REDUCER REGISTRATION HERE
const reducers = {
  _db: db,
};

export default combineReducers(reducers);
