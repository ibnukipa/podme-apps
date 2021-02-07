/* @flow */

import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const loginEpic = (action$) =>
  action$.pipe(
    ofType('Action/login'),
    mergeMap(() => of())
  );
