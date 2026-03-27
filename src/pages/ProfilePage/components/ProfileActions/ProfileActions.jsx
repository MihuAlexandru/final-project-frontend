//import { useState } from "react";
import Button from "../../../../components/UI/Button/Button.jsx";
//import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import style from "./ProfileActions.module.css";

export default function ProfileActions() {
  // const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* function handleDeleteConfirm() {
    // TODO: call DELETE /users/me when endpoint is available
    setShowDeleteModal(false);
  }
*/
  return (
    <footer className={style.actions}>
      <Button disabled aria-disabled="true" className={style.editBtn}>
        Edit profile
      </Button>
      <Button
        className={style.deleteBtn}
        onClick={() => null} //setShowDeleteModal(true)}
        aria-label="Delete your account"
      >
        Delete account
      </Button>
      {/*}
      <ConfirmDeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        itemName="account"
      /> {*/}
    </footer>
  );
}
