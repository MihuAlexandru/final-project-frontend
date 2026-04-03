import { useState, useEffect, useRef } from "react";
import styles from "./Catalog.module.css";

import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/UI/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import ProductEditModal from "../../components/Admin/ProductEditModal";

import { getProductsPaginated } from "../../services/productService";
import { useUser } from "../../context/UserContext";

export default function Catalog() {
  const { user, loading: userLoading } = useUser();
  const topRef = useRef(null);

  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 12;

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const [deleteModal, setDeleteModal] = useState({ open: false, type: "" });
  const [editingProductId, setEditingProductId] = useState(null);

  const isAdmin = user?.role === "admin" || user?.is_admin === true;

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, priceRange, selectedCategories, inStockOnly]);

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
        setTotalPages(Math.ceil((data.total_items || 0) / itemsPerPage) || 1);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCatalog();
  }, [
    currentPage,
    debouncedSearch,
    priceRange,
    selectedCategories,
    inStockOnly,
  ]);

  const handleEditSubmit = (updatedProduct) => {
    setCurrentProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
    setEditingProductId(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sortedProducts = [...currentProducts].sort((a, b) => {
    if (sortType === "name-asc") return a.name.localeCompare(b.name);
    if (sortType === "name-desc") return b.name.localeCompare(a.name);
    if (sortType === "price-asc") return a.price - b.price;
    if (sortType === "price-desc") return b.price - a.price;
    return 0;
  });

  if (userLoading) return <p>Verifying profile...</p>;

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
              <p>Loading products...</p>
            ) : sortedProducts.length > 0 ? (
              sortedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  isAdmin={isAdmin}
                  onEdit={(id) => setEditingProductId(id)}
                />
              ))
            ) : (
              <p>No products found.</p>
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

      {isAdmin && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => setDeleteModal({ open: true, type: "Product" })}
          >
            Delete Test
          </button>
        </div>
      )}

      <ConfirmDeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, type: "" })}
        onConfirm={() => setDeleteModal({ open: false, type: "" })}
        itemName={deleteModal.type}
      />

      {isAdmin && editingProductId && (
        <ProductEditModal
          productId={editingProductId}
          onClose={() => setEditingProductId(null)}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}
