// src/hooks/usePaginatedThunk.js
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const usePagination = ({
  thunk,
  selector,
  defaultLimit = 10,
  extraParams = {},
}) => {
  const dispatch = useDispatch();
  const { data, total, loading, error } = useSelector(selector);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);

  const fetchData = useCallback(() => {
    dispatch(thunk({ page, limit, ...extraParams }));
  }, [dispatch, thunk, page, limit, extraParams]);

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  const handlePageChange = (newPage) => setPage(newPage);
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  return {
    data,
    total,
    loading,
    error,
    page,
    limit,
    setPage: handlePageChange,
    setLimit: handleLimitChange,
    refetch: fetchData,
  };
};

export default usePagination;