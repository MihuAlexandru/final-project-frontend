import Input from "../Input/Input.jsx";
import style from "./SearchBar.module.css";

export default function SearchBar({ onSearch, placeholder = "Search products..." }) {
  return (
    <div className={style.searchbar}>
      <Input
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
