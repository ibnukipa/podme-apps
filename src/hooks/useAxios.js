/* @flow */

import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosInstance } from 'axios';

type Options<R> = {
  onResponse?: (data: R) => void,
  onError?: Function,
  finally?: Function,
};

const useAxios = <R>(
  api: AxiosInstance,
  options: Options<R> = {},
  deps: Array = []
): { fetch: Function, response: R, isLoading: boolean, error: any } => {
  const [cancelToken, setCancelToken] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetch = useCallback(async (values): { response: R } => {
    const cancelTokenSource = axios.CancelToken.source();
    cancelToken?.cancel();
    setCancelToken(cancelTokenSource);
    setIsLoading(true);
    try {
      const res: R = await api(values)(cancelTokenSource);
      setResponse(res);
      options.onResponse?.(res);
      setIsLoading(false);
      return { response: res };
    } catch (err) {
      setError(err);
      options.onError?.(err);
      setIsLoading(false);
      return { error: err };
    } finally {
      options.finally?.();
    }
  }, deps);
  useEffect(
    () => () => {
      cancelToken?.cancel();
    },
    []
  );
  return { fetch, response, isLoading, error };
};

export default useAxios;
