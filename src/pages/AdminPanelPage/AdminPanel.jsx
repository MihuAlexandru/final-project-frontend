import { useState } from "react";
import TabNav from "./components/TabNav/TabNav.jsx";
import UsersPanel from "./components/UsersPanel/UsersPanel.jsx";
import ProductsPanel from "./components/ProductsPanel/ProductsPanel.jsx";
import style from "./AdminPanel.module.css";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <main className={style.page}>
      <h1 className={style.heading}>Admin Panel</h1>
      <div className={style.layout}>
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

        <div className={style.content}>
          <section
            role="tabpanel"
            id="panel-users"
            aria-labelledby="tab-users"
            hidden={activeTab !== "users"}
            className={style.tabPanel}
          >
            <UsersPanel />
          </section>
          <section
            role="tabpanel"
            id="panel-products"
            aria-labelledby="tab-products"
            hidden={activeTab !== "products"}
            className={style.tabPanel}
          >
            <ProductsPanel />
          </section>
        </div>
      </div>
    </main>
  );
}
