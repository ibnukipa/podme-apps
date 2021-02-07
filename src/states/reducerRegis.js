/* @flow */

import { combineReducers } from 'redux';
import db from './reducers/_db';
import auth from './reducers/auth';

const reducers = {
  _db: db,
  auth,
};

export default combineReducers(reducers);
