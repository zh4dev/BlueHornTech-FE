import { useState } from "react";

export function usePagination(initialPage = 1, pageSize = 16) {
  const [pageNumber, setPageNumber] = useState(initialPage);

  const goToNextPage = () => setPageNumber((p) => p + 1);
  const goToPreviousPage = () => setPageNumber((p) => (p > 1 ? p - 1 : 1));
  const goToPage = (page: number) => setPageNumber(page);

  return {
    pageNumber,
    pageSize,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    setPageNumber,
  };
}
