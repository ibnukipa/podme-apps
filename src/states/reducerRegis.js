/* @flow */

import { combineReducers } from 'redux';
import db from './reducers/_db';

const reducers = {
  _db: db,
};

export default combineReducers(reducers);
