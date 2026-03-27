import Input from "../Input/Input.jsx";
import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch, delay = 1000 }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, onSearch]);

  return (
    <Input
      type="text"
      placeholder="Caută produse..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={styles.searchBar}
    />
  );
}
