import Input from "../Input/Input.jsx";
import style from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <div className={style.searchbar}>
      <Input
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
