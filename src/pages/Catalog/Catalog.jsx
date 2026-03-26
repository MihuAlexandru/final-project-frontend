import { mockProducts } from "../../../MockData/mockProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Catalog.module.css";

export default function Catalog() {
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
            {mockProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          <div className={styles.paginationContainer}>
            <button disabled className={styles.pageBtn}>
              Previous
            </button>
            <span className={styles.pageText}>Page 1 of 5</span>
            <button className={styles.pageBtn}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
