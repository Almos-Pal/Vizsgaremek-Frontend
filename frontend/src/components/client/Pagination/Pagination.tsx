"use client";

import React from "react";
import { Button } from "@/components/client";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  value: number;
  onChange: (page: number) => void;
  total: number;
}

const Pagination: React.FC<PaginationProps> = ({ value, onChange, total }) => {
  const handlePrevious = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleNext = () => {
    if (value < total) {
      onChange(value + 1);
    }
  };

  const handlePageChange = (page: number) => {
    onChange(page);
  };

  const renderPages = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (total <= maxVisiblePages) {
      for (let i = 1; i <= total; i++) {
        pages.push(
          <button
            key={i}
            className={`${styles.pageButton} ${
              value === i ? styles.active : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      let startPage = Math.max(1, value - 1);
      let endPage = Math.min(total, value + 1);

      if (startPage === 1) {
        endPage = maxVisiblePages - 1;
      } else if (endPage === total) {
        startPage = total - (maxVisiblePages - 2);
      }

      if (startPage > 1) {
        pages.push(
          <button
            key={1}
            className={`${styles.pageButton} ${
              value === 1 ? styles.active : ""
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pages.push(
            <span key="start-ellipsis" className={styles.ellipsis}>
              ...
            </span>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            className={`${styles.pageButton} ${
              value === i ? styles.active : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (endPage < total) {
        if (endPage < total - 1) {
          pages.push(
            <span key="end-ellipsis" className={styles.ellipsis}>
              ...
            </span>
          );
        }
        pages.push(
          <button
            key={total}
            className={`${styles.pageButton} ${
              value === total ? styles.active : ""
            }`}
            onClick={() => handlePageChange(total)}
          >
            {total}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <Button
        color="primary"
      noBackground

        onClick={handlePrevious}
        iconOnly
        leftIcon={"PlayLeftIcon"}
        iconProps={{  size: 24 }}
      />
      {renderPages()}
      <Button
      noBackground
        color="primary"
        onClick={handleNext}
        iconOnly
        rightIcon={"PlayRightIcon"}
        iconProps={{  size: 24 }}
      />
    </div>
  );
};

export default Pagination;
