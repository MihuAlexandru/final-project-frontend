import styles from "./Filters.module.css";
import { categories } from "../../../MockData/mockCategories";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import CollapsibleSection from "../CollapsibleSection/CollapsibleSection";

export default function Filters({
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  inStockOnly,
  setInStockOnly,
}) {
  const handleCategoryChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  return (
    <Card>
      <CollapsibleSection title="Filters" defaultOpen={true}>
        <CollapsibleSection title="Price Range" defaultOpen={true}>
          <div className={styles.priceInputRow}>
            <div className={styles.priceInputGroup}>
              <label>Min</label>
              <Input
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
              <Input
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
        </CollapsibleSection>

        <CollapsibleSection title="Categories" defaultOpen={true}>
          {categories.map((cat) => (
            <label key={cat.id} className={styles.checkboxRow}>
              <Input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => handleCategoryChange(cat.id)}
              />
              {cat.name}
            </label>
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Stock" defaultOpen={true}>
          <label>
            <Input
              type="checkbox"
              checked={inStockOnly}
              onChange={() => setInStockOnly(!inStockOnly)}
            />
            In Stock
          </label>
        </CollapsibleSection>
      </CollapsibleSection>
    </Card>
  );
}
