import { useCallback } from "react";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar.jsx";
import UserRow from "../UserRow/UserRow.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import { useToast } from "../../../../context/ToastContext.jsx";
import style from "./UsersPanel.module.css";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import { getUsers } from "../../../../services/usersService.js";
import { usePaginatedFetch } from "../../../../hooks/usePaginatedFetch.js";
import { useState } from "react";

const ROWS_PER_PAGE = 10;

export default function UsersPanel() {
  const fetchFn = useCallback(getUsers, []);
  const {
    items: users,
    setItems: setUsers,
    totalItems,
    setTotalItems,
    currentPage,
    setCurrentPage,
    totalPages,
    handleSearch,
    isLoading,
    error,
  } = usePaginatedFetch(fetchFn, { pageSize: ROWS_PER_PAGE });

  const [pendingDelete, setPendingDelete] = useState(null);
  const { addToast } = useToast();

  function handlePromote(id) {
    const user = users.find((u) => u.id === id);
    if (user.role === "admin") {
      addToast({ type: "error", message: `${user.email} is already an admin.` });
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: "admin" } : u)));
    addToast({ type: "success", message: `${user.email} promoted to admin.` });
  }

  function handleDemote(id) {
    const user = users.find((u) => u.id === id);
    if (user.role === "customer") {
      addToast({ type: "error", message: `${user.email} is already a customer.` });
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: "customer" } : u)));
    addToast({ type: "info", message: `${user.email} demoted to customer.` });
  }

  function handleDelete(id) {
    setPendingDelete(id);
  }

  function confirmDelete() {
    const user = users.find((u) => u.id === pendingDelete);
    setUsers((prev) => prev.filter((u) => u.id !== pendingDelete));
    setTotalItems((prev) => prev - 1);
    addToast({ type: "error", message: `${user.email} has been deleted.` });
    setPendingDelete(null);
  }

  const paddedRows = [
    ...users,
    ...Array(Math.max(0, ROWS_PER_PAGE - users.length)).fill(null),
  ];

  return (
    <section className={style.panel}>
      <header className={style.header}>
        <h2 className={style.title}>Users</h2>
        <span className={style.count} aria-live="polite" aria-atomic="true">
          {totalItems} total
        </span>
      </header>
      <div className={style.searchWrap}>
        <SearchBar onSearch={handleSearch} placeholder="Search users..." />
      </div>

      {error && <p className={style.error}>{error}</p>}

      <ul
        className={style.list}
        aria-label="User list"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        {isLoading ? (
          <li className={style.empty}>Loading...</li>
        ) : users.length === 0 ? (
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
            ),
          )
        )}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmDeleteModal
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        itemName="User"
      />
    </section>
  );
}
