import { useState, useEffect } from "react";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Catalog.module.css";
import SearchBar from "../../components/UI/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import { getProductById } from "../../services/productService";
import ProductEditModal from "../../components/Admin/ProductEditModal";
import { useUser } from "../../context/UserContext";
import { mockProducts } from "../../../MockData/mockProducts";

export default function Catalog() {
  const { user, loading: userLoading } = useUser();
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, type: "" });
  const [editingProductId, setEditingProductId] = useState(null);

  const isAdmin = user?.role === "admin" || user?.is_admin === true;

  const handleEditSubmit = (updatedProduct) => {
    setApiProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
    setEditingProductId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ids = [1, 2, 3];
        const productPromises = ids.map((id) => getProductById(id));
        const results = await Promise.all(productPromises);
        setApiProducts(results);
      } catch (error) {
        console.error("Error loading API products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openDelete = (type) => setDeleteModal({ open: true, type });
  const closeDelete = () => setDeleteModal({ open: false, type: "" });

  const handleConfirmDelete = () => {
    closeDelete();
  };

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const allProducts = [...apiProducts, ...mockProducts];

  const filteredProducts = allProducts
    .filter((item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
    .filter(
      (item) => item.price >= priceRange.min && item.price <= priceRange.max,
    )
    .filter((item) =>
      selectedCategories.length === 0
        ? true
        : selectedCategories.includes(item.category_id),
    )
    .filter((item) => (inStockOnly ? item.stock_quantity > 0 : true))
    .sort((a, b) => {
      switch (sortType) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  if (userLoading) {
    return <p>Verifying profile...</p>;
  }

  return (
    <div className={styles.catalogPage}>
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

        <div className={styles.catalogContainer}>
          {loading && apiProducts.length === 0 ? (
            <p>Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
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
      </div>

      {isAdmin && (
        <>
          <h2 style={{ marginTop: "32px" }}>Delete Modal Test</h2>
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <button onClick={() => openDelete("User")}>Delete User</button>
            <button onClick={() => openDelete("Product")}>
              Delete Product
            </button>
          </div>
        </>
      )}

      <ConfirmDeleteModal
        open={deleteModal.open}
        onClose={closeDelete}
        onConfirm={handleConfirmDelete}
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
