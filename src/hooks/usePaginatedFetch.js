import { useState, useEffect, useCallback } from "react";

export function usePaginatedFetch(fetchFn, { pageSize = 10 } = {}) {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(totalItems / pageSize);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchFn({
        page: currentPage,
        limit: pageSize,
        search: searchQuery,
      });
      setItems(data.items);
      setTotalItems(data.total_items);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, currentPage, pageSize, searchQuery]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  return {
    items,
    setItems,
    totalItems,
    setTotalItems,
    currentPage,
    setCurrentPage,
    totalPages,
    searchQuery,
    handleSearch,
    isLoading,
    error,
    refetch: fetch,
  };
}
