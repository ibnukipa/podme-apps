/* @flow */

import { combineReducers } from 'redux';

import db from 'states/reducers/_db';
import auth from 'states/reducers/auth';
import podList from 'states/reducers/pod';

const reducers = {
  _db: db,
  auth,
  podList,
};

export default combineReducers(reducers);
