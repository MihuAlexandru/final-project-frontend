import { useState } from "react";
import styles from "./Filters.module.css";
import { categories } from "../../../MockData/mockCategories";
import Card from "../UI/Card/Card";

export default function Filters({
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  inStockOnly,
  setInStockOnly,
}) {
  const [openPrice, setOpenPrice] = useState(true);
  const [openCategories, setOpenCategories] = useState(true);
  const [openStock, setOpenStock] = useState(true);

  const handleCategoryChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  return (
    <Card>
      <div className={styles.filterSection}>
        <h3
          className={styles.sectionHeader}
          onClick={() => setOpenPrice((prev) => !prev)}
        >
          <span>Price Range</span>
          <span>{openPrice ? "▲" : "▼"}</span>
        </h3>

        {openPrice && (
          <div className={styles.sectionContent}>
            <div className={styles.priceInputRow}>
              <div className={styles.priceInputGroup}>
                <label>Min</label>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  placeholder={priceRange.min}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      min: Number(e.target.value),
                    }))
                  }
                />
              </div>

              <div className={styles.priceInputGroup}>
                <label>Max</label>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  placeholder={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      max: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <h3
          className={styles.sectionHeader}
          onClick={() => setOpenCategories((prev) => !prev)}
        >
          <span>Categories</span>
          <span>{openCategories ? "▲" : "▼"}</span>
        </h3>

        {openCategories && (
          <div className={styles.sectionContent}>
            {categories.map((cat) => (
              <label key={cat.id} className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => handleCategoryChange(cat.id)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <h3
          className={styles.sectionHeader}
          onClick={() => setOpenStock((prev) => !prev)}
        >
          <span>Stock</span>
          <span>{openStock ? "▲" : "▼"}</span>
        </h3>

        {openStock && (
          <div className={styles.sectionContent}>
            <label>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={() => setInStockOnly(!inStockOnly)}
              />
              Show only products in stock
            </label>
          </div>
        )}
      </div>
    </Card>
  );
}
