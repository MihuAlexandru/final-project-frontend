import { useCallback, useState } from "react";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar.jsx";
import UserRow from "../UserRow/UserRow.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import { useToast } from "../../../../context/ToastContext.jsx";
import style from "./UsersPanel.module.css";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import {
  getUsers,
  deactivateUser,
  reactivateUser,
  promoteUser,
  demoteUser,
} from "../../../../services/usersService.js";
import { usePaginatedFetch } from "../../../../hooks/usePaginatedFetch.js";

const ROWS_PER_PAGE = 10;

export default function UsersPanel() {
  const fetchFn = useCallback(getUsers, []);
  const {
    items: users,
    setItems: setUsers,
    totalItems,
    currentPage,
    setCurrentPage,
    totalPages,
    handleSearch,
    isLoading,
    error,
  } = usePaginatedFetch(fetchFn, { pageSize: ROWS_PER_PAGE });

  const [pendingDelete, setPendingDelete] = useState(null);
  const { addToast } = useToast();

  async function handlePromote(id) {
    const user = users.find((u) => u.id === id);
    if (user.role === "admin") {
      addToast({
        type: "error",
        message: `${user.email} is already an admin.`,
      });
      return;
    }
    try {
      await promoteUser(id);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: "admin" } : u)),
      );
      addToast({
        type: "success",
        message: `${user.email} promoted to admin.`,
      });
    } catch (err) {
      addToast({ type: "error", message: err.message });
    }
  }

  async function handleDemote(id) {
    const user = users.find((u) => u.id === id);
    if (user.role === "customer") {
      addToast({
        type: "error",
        message: `${user.email} is already a customer.`,
      });
      return;
    }
    try {
      await demoteUser(id);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: "customer" } : u)),
      );
      addToast({ type: "info", message: `${user.email} demoted to customer.` });
    } catch (err) {
      addToast({ type: "error", message: err.message });
    }
  }

  function handleDelete(id) {
    setPendingDelete(id);
  }

  async function confirmDelete() {
    const user = users.find((u) => u.id === pendingDelete);
    try {
      await deactivateUser(pendingDelete);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === pendingDelete ? { ...u, is_active: false } : u,
        ),
      );
      addToast({
        type: "success",
        message: `${user.email} has been deactivated.`,
      });
    } catch (err) {
      addToast({ type: "error", message: err.message });
    } finally {
      setPendingDelete(null);
    }
  }

  async function handleReactivate(id) {
    const user = users.find((u) => u.id === id);
    try {
      await reactivateUser(id);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, is_active: true } : u)),
      );
      addToast({
        type: "success",
        message: `${user.email} has been reactivated.`,
      });
    } catch (err) {
      addToast({ type: "error", message: err.message });
    }
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
                onReactivate={handleReactivate}
              />
            ) : (
              <li
                key={`ghost-${idx}`}
                className={style.ghostRow}
                aria-hidden="true"
              />
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
