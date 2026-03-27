import { useState } from "react";
import { mockProducts } from "../../../MockData/mockProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useToast } from "../../context/ToastContext";
import styles from "./Catalog.module.css";
import SearchBar from "../../components/UI/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";

export default function Catalog() {
  const { addToast } = useToast();

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortType, setSortType] = useState("");

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 10000,
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = mockProducts
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

  return (
    <div className={styles.catalogPage}>
      {/* LINE 1: TITLE */}
      <h1 className={styles.pageTitle}>Catalog page</h1>

      {/* LINE 2: SEARCH LEFT, SORT RIGHT */}
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

      {/* LINE 3: FILTERS LEFT + PRODUCTS RIGHT */}
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          ) : (
            <p>Niciun produs găsit.</p>
          )}
        </div>
      </div>

      {/* LINE 4: BUTTONS */}
      <div className={styles.toastTest}>
        <button
          onClick={() =>
            addToast({ type: "success", message: "Item added to cart!" })
          }
        >
          Test Success
        </button>
        <button
          onClick={() =>
            addToast({ type: "error", message: "Something went wrong." })
          }
        >
          Test Error
        </button>
        <button
          onClick={() =>
            addToast({ type: "warning", message: "Low stock warning." })
          }
        >
          Test Warning
        </button>
        <button
          onClick={() =>
            addToast({ type: "info", message: "New products available." })
          }
        >
          Test Info
        </button>
      </div>
    </div>
  );
}
