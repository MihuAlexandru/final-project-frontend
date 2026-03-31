import style from "./EmptyCartState.module.css";

export default function EmptyCartState() {
  return (
    <div className={style.empty}>
      <div>
        <h2 className={style.emptyTitle}>Your cart feels lonely...</h2>
        <p className={style.emptyText}>
          You haven&apos;t added anything yet. Explore the catalog and find
          something you&apos;ll love.
        </p>
      </div>
    </div>
  );
}
