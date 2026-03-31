import Input from "../Input/Input.jsx";
import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch, delay = 300 }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, onSearch]);

  return (
    <div className={styles.searchBarWrapper}>
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.searchBar}
      />
    </div>
  );
}
