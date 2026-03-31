import style from "./Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    const safeTotalPages = Math.max(1, totalPages);

    if (safeTotalPages <= maxVisible) {
      for (let i = 1; i <= safeTotalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(safeTotalPages - 1, currentPage + 1);

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < safeTotalPages - 1) pages.push("...");

    pages.push(safeTotalPages);
    return pages;
  };

  return (
    <nav className={style.pagination} aria-label="Pagination">
      <button
        className={style.pageBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        Prev
      </button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className={style.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`${style.pageBtn} ${currentPage === page ? style.active : ""}`}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ),
      )}

      <button
        className={style.pageBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= Math.max(1, totalPages)}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}