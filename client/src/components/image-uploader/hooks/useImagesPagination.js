import React, { useCallback, useEffect, useState } from "react";

export const useImagesPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const onPageChange = React.useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return {
    currentPage,
    totalPages,
    onPageChange,
  };
};
