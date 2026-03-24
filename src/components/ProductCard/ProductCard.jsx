import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import styles from "./ProductCard.module.css";

export default function ProductCard({ data }) {
  const product = data || {
    title:
      'Laptop Apple MacBook Air 13", cu procesor Apple M4, 10 nuclee CPU si 8 nuclee GPU, 16GB RAM, 256GB',
    price: 4799.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSScqnjw-17-IYMVuxZLswqjWLnOCPihEgLqA&s",
  };

  return (
    <Card>
      <div className={styles.productCardContainer}>
        <button className={styles.iconBtn} aria-label="Add to wishlist">
          ♡
        </button>

        <div className={styles.imageContainer}>
          <img src={product.image} alt="MacBook Air" className={styles.image} />
        </div>

        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.details}>
          <p className={styles.stoc}>Au mai ramas 3 produse!</p>
          <p className={styles.price}>
            {product.price.toLocaleString("ro-RO")} Lei
          </p>
        </div>

        <div className={styles.action}>
          <Button>Adauga in Cos</Button>
        </div>
      </div>
    </Card>
  );
}
