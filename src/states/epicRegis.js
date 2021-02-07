/* @flow */

import { combineEpics } from 'redux-observable';
import { catchError, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

import { podListEpic } from 'states/epics/podListEpic';

const epics = [podListEpic];

const combineEpicsAndCatchErrors = (...allEpics) => (action$, state$) => {
  const enhancedEpics = allEpics.map((epic) => (action2$, state2$) =>
    epic(action2$, state2$).pipe(
      catchError(() =>
        of({
          type: 'Rxjs/UNCAUGHT_ERROR',
        })
      )
    )
  );
  return combineEpics(...enhancedEpics)(action$, state$);
};

const epic$ = new BehaviorSubject(combineEpicsAndCatchErrors(...Object.values(epics)));

export default (action$, state$) =>
  epic$.pipe(
    mergeMap((epic) => epic(action$, state$)),
    catchError(() =>
      of({
        type: 'Rxjs/FATAL_ERROR',
      })
    )
  );
