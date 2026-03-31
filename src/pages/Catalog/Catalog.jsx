import { useState, useEffect, useRef } from "react";

import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Catalog.module.css";
import SearchBar from "../../components/UI/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import { getProductsPaginated } from "../../services/productService";

export default function Catalog() {
  const topRef = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 10000,
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, sortType, priceRange, selectedCategories, inStockOnly]);

  useEffect(() => {
    const fetchCatalog = async () => {
      setIsLoading(true);
      try {
        const categoryId =
          selectedCategories.length > 0 ? selectedCategories[0] : null;

        const data = await getProductsPaginated(
          currentPage,
          itemsPerPage,
          debouncedSearch,
          categoryId,
          priceRange.min,
          priceRange.max,
        );

        setCurrentProducts(data.items || []);

        const calculatedPages = Math.ceil(
          (data.total_items || 0) / itemsPerPage,
        );
        setTotalPages(calculatedPages || 1);
      } catch (error) {
        console.error("Failed to fetch catalog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatalog();
  }, [
    currentPage,
    debouncedSearch,
    sortType,
    priceRange,
    selectedCategories,
    inStockOnly,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (topRef.current) {
      setTimeout(() => {
        topRef.current.scrollIntoView({ behavior: "auto", block: "start" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  return (
    <div className={styles.catalogPage} ref={topRef}>
      <h1 className={styles.pageTitle}>Catalog page</h1>
      <div className={styles.topBar}>
        <SearchBar onSearch={setDebouncedSearch} delay={1000} />

        <select
          className={styles.sortDropdown}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort by...</option>
          <option value="name-asc">Sort by Name ⬇</option>
          <option value="name-desc">Sort by Name ⬆</option>
          <option value="price-asc">Sort by Price ⬇</option>
          <option value="price-desc">Sort by Price ⬆</option>
        </select>
      </div>

      <div className={styles.contentLayout}>
        <Filters
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
        />

        <div className={styles.gridWrapper}>
          <div className={styles.catalogContainer}>
            {isLoading ? (
              <p style={{ fontWeight: "bold", padding: "20px" }}>
                Loading products...
              </p>
            ) : currentProducts.length > 0 ? (
              currentProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))
            ) : (
              <div className={styles.noProductsMessage}>
                <h2>No products found</h2>
                <p>Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>

          {!isLoading && (
            <div className={styles.paginationContainer}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
