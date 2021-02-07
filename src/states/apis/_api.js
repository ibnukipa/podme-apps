/* @flow */

import { ajax } from 'rxjs/ajax';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import CS from 'camelcase-keys';
import QS from 'query-string';
import axios from 'axios';
import { isArray, isObject } from 'lodash-es';

export type ApiOptions = {
  url: string,
  baseUrl?: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: Object,
  formData?: Object,
  params?: Object,
  headers?: Object,
  hasBasicAuth?: boolean,
};

export type ExtraApiOptions = {
  params?: Object,
  headers?: Object,
  data?: any,
};

export const Api$ = (options: ApiOptions) => {
  const isFormData = !!options.formData;
  const url = `${options.baseUrl || '/'}${options.url}`;
  const query = options.params || {};
  const body = isFormData ? QS.stringify(options.formData) : options.body;
  const contentType = isFormData ? 'application/x-www-form-urlencoded' : 'application/json';

  return ajax({
    url: QS.stringifyUrl({ url, query }),
    method: options.method || 'GET',
    headers: {
      ...options.headers,
      'Content-Type': contentType,
    },
    body,
  }).pipe(mergeMap((data) => of(CS(JSON.parse(data.response), { deep: true }))));
};

export const ApiAxios = (options: ApiOptions) => (cancelTokenSource) => {
  const isFormData = !!options.formData;
  const url = `${options.baseUrl || '/'}${options.url}`;
  const query = options.params || {};
  const body = isFormData ? QS.stringify(options.formData) : options.body;
  const contentType = isFormData ? 'application/x-www-form-urlencoded' : 'application/json';

  const axiosConfig = {
    url,
    method: options.method || 'GET',
    data: body,
    params: query,
    headers: {
      ...options.headers,
      'Content-Type': contentType,
    },
    cancelToken: cancelTokenSource.token,
  };

  return axios(axiosConfig).then((response) => {
    const { data } = response;
    let reconstructedData = {};
    if (isObject(data) || isArray(data)) {
      reconstructedData = CS(data, { deep: true });
    }
    return reconstructedData;
  });
};
