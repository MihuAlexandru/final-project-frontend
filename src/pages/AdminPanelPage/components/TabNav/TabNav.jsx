import style from "./TabNav.module.css";

const TABS = [
  { id: "users", label: "Users" },
  { id: "products", label: "Products" },
];

export default function TabNav({ activeTab, onTabChange }) {
  return (
    <div role="tablist" aria-label="Admin sections" className={style.tabNav}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          id={`tab-${tab.id}`}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`panel-${tab.id}`}
          className={`${style.tabBtn} ${activeTab === tab.id ? style.active : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
