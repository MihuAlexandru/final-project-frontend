import Input from "../Input/Input.jsx";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  return (
    <div className="searchbar">
      <Input
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
