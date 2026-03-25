import { useState } from "react";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar.jsx";
import UserRow from "../UserRow/UserRow.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import { useToast } from "../../../../context/ToastContext.jsx";
import style from "./UsersPanel.module.css";

const ROWS_PER_PAGE = 10;

const INITIAL_USERS = [
  { id: 1, email: "alice@example.com", role: "admin" },
  { id: 2, email: "bob@example.com", role: "user" },
  { id: 3, email: "carol@example.com", role: "user" },
  { id: 4, email: "dave@example.com", role: "user" },
  { id: 5, email: "eve@example.com", role: "admin" },
  { id: 6, email: "frank@example.com", role: "user" },
  { id: 7, email: "grace@example.com", role: "user" },
  { id: 8, email: "henry@example.com", role: "user" },
  { id: 9, email: "iris@example.com", role: "user" },
  { id: 10, email: "jack@example.com", role: "user" },
  { id: 11, email: "karen@example.com", role: "user" },
  { id: 12, email: "leo@example.com", role: "admin" },
  { id: 13, email: "mia@example.com", role: "user" },
  { id: 14, email: "noah@example.com", role: "user" },
  { id: 15, email: "olivia@example.com", role: "user" },
  { id: 16, email: "peter@example.com", role: "user" },
  { id: 17, email: "quinn@example.com", role: "user" },
  { id: 18, email: "rachel@example.com", role: "user" },
  { id: 19, email: "sam@example.com", role: "user" },
  { id: 20, email: "tina@example.com", role: "user" },
  { id: 21, email: "ulric@example.com", role: "user" },
  { id: 22, email: "vera@example.com", role: "admin" },
];

export default function UsersPanel() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { addToast } = useToast();

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const pageUsers = filtered.slice(
    (safePage - 1) * ROWS_PER_PAGE,
    safePage * ROWS_PER_PAGE
  );


  const paddedRows = [
    ...pageUsers,
    ...Array(Math.max(0, ROWS_PER_PAGE - pageUsers.length)).fill(null),
  ];

  function handleSearch(query) {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  function handlePromote(id) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: "admin" } : u))
    );
    const user = users.find((u) => u.id === id);
    addToast({ type: "success", message: `${user.email} promoted to admin.` });
  }

  function handleDemote(id) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: "user" } : u))
    );
    const user = users.find((u) => u.id === id);
    addToast({ type: "info", message: `${user.email} demoted to user.` });
  }

  function handleDelete(id) {
    const user = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    addToast({ type: "error", message: `${user.email} has been deleted.` });
  }

  return (
    <section className={style.panel}>
      <header className={style.header}>
        <h2 className={style.title}>Users</h2>
        <span className={style.count} aria-live="polite" aria-atomic="true">
          {filtered.length} total
        </span>
      </header>
      <div className={style.searchWrap}>
        <SearchBar onSearch={handleSearch} placeholder="Search users..." />
      </div>
      <ul
        className={style.list}
        aria-label="User list"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        {filtered.length === 0 ? (
          <li className={style.empty}>No users found.</li>
        ) : (
          paddedRows.map((user, idx) =>
            user ? (
              <UserRow
                key={user.id}
                user={user}
                onPromote={handlePromote}
                onDemote={handleDemote}
                onDelete={handleDelete}
              />
            ) : (
              <li key={`ghost-${idx}`} className={style.ghostRow} aria-hidden="true" />
            )
          )
        )}
      </ul>
      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
