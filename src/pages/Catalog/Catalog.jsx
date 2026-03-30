import { mockProducts } from "../../../MockData/mockProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Catalog.module.css";
import { useMemo, useState } from "react";

export default function Catalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalItems = useMemo(() => mockProducts.length, []);
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return mockProducts.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.catalogPage}>
      <header className={styles.pageHeader}>
        <h1>Catalog page</h1>
        <div className={styles.sortPlaceholder}>
          <span>Sort by: Popularity</span>
        </div>
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.filterSidebarPlaceholder}>
          <h3>Filters</h3>
          <p>Category</p>
          <p>Price Range</p>
        </aside>

        <div className={styles.gridWrapper}>
          <div className={styles.catalogContainer}>
            {currentProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          <div className={styles.paginationContainer}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
