/* @flow */

import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useInfiniteFetch = (fetcher) => {
  const dispatch = useDispatch();
  const [shouldFetchMore, setShouldFetchMore] = useState(false);
  const [shouldReFetch, setShouldReFetch] = useState(false);
  const [fetchData, setFetchData] = useState({});
  const [loadMorePage, setLoadMorePage] = useState(1);

  const fetchMore = useCallback((data) => {
    setFetchData(data);
    setShouldFetchMore(true);
  }, []);

  const fetch = useCallback((data) => {
    setFetchData(data);
    setShouldReFetch(true);
  }, []);

  useEffect(() => {
    if (!shouldReFetch) return;
    dispatch(fetcher({ ...fetchData, page: 0 }));
    setShouldReFetch(false);
    setLoadMorePage(2);
  }, [shouldReFetch]);

  useEffect(() => {
    if (!shouldFetchMore) return;
    dispatch(fetcher({ ...fetchData, page: loadMorePage }));
    setShouldFetchMore(false);
    setLoadMorePage(loadMorePage + 1);
  }, [loadMorePage, shouldFetchMore]);

  return [fetchMore, fetch];
};

export default useInfiniteFetch;
