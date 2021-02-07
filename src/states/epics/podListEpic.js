/* @flow */

import { mergeMap, filter, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { podListError, podListRequested, podListSuccess } from 'states/reducers/pod';
import getPods$ from 'states/apis/getPods$';
import { normalizeResponse } from 'states/reducers/_db';

export const podListEpic = (action$) =>
  action$.pipe(
    filter(podListRequested.match),
    mergeMap(({ payload }) =>
      getPods$({
        params: {
          pageOffset: payload?.page || 0,
          pageSize: 20,
        },
      }).pipe(
        mergeMap((response) =>
          of(
            normalizeResponse({ modelName: 'pod', data: response.items, isArray: true }),
            podListSuccess({
              meta: {
                page: payload?.page || 0,
                hasNext: !!response.nextPage,
              },
              data: response?.items?.map((item) => ({ id: item.id })),
            })
          )
        ),
        catchError((error) => of(podListError({ ...payload, error: error.message })))
      )
    )
  );
