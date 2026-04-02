import { useState } from "react";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader.jsx";
import ProfileField from "./components/ProfileField/ProfileField.jsx";
import ProfileActions from "./components/ProfileActions/ProfileActions.jsx";
import ManageAddressModal from "./components/ManageAddressModal/ManageAddressModal.jsx";
import { useUser } from "../../context/UserContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { deleteMyAddress } from "../../services/addressService.js";
import style from "./ProfilePage.module.css";

const ADDRESS_FIELDS = [
  { label: "Street", key: "street" },
  { label: "City", key: "city" },
  { label: "State / Region", key: "state" },
  { label: "Postal code", key: "postal_code" },
  { label: "Country", key: "country" },
];

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const { addToast } = useToast();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);

  const handleAddAddress = () => {
    setAddressToEdit(null);
    setShowAddressModal(true);
  };

  const handleEditAddress = (addr) => {
    setAddressToEdit(addr);
    setShowAddressModal(true);
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;
    try {
      await deleteMyAddress(id);
      setUser({
        ...user,
        addresses: user.addresses.filter((a) => a.id !== id),
      });
      addToast({ type: "success", message: "Address deleted successfully." });
    } catch (err) {
      addToast({ type: "error", message: err.message });
    }
  };

  const addresses = user?.addresses || [];

  return (
    <section className={style.page}>
      <h1 className={style.pageTitle}>My Profile</h1>
      <article className={style.card}>
        <ProfileHeader user={user} />

        <section className={style.section} aria-label="Personal information">
          <h2 className={style.sectionTitle}>Personal Information</h2>
          <dl className={style.fieldList}>
            <ProfileField label="First name" value={user.first_name} />
            <ProfileField label="Last name" value={user.last_name} />
            <ProfileField label="Email" value={user.email} />
            <ProfileField label="Phone" value={user.phone} />
          </dl>
        </section>

        <section className={style.section} aria-label="Delivery addresses">
          <div className={style.addressHeader}>
            <h2 className={style.sectionTitle} style={{ margin: 0 }}>
              Delivery Addresses
            </h2>
            <button onClick={handleAddAddress} className={style.addAddressBtn}>
              + Add Address
            </button>
          </div>

          <div className={style.addressList}>
            {addresses.length === 0 ? (
              <p className={style.emptyAddressMsg}>No addresses saved yet.</p>
            ) : (
              addresses.map((addr, idx) => (
                <div key={addr.id} className={style.addressCard}>
                  <div className={style.addressCardHeader}>
                    <h3 className={style.addressCardTitle}>
                      Address {idx + 1}
                    </h3>
                    <div className={style.addressActions}>
                      <button
                        onClick={() => handleEditAddress(addr)}
                        className={`${style.addressActionBtn} ${style.edit}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className={`${style.addressActionBtn} ${style.delete}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <dl className={style.fieldList}>
                    {ADDRESS_FIELDS.map(({ label, key }) => (
                      <ProfileField
                        key={key}
                        label={label}
                        value={addr?.[key] ?? null}
                      />
                    ))}
                  </dl>
                </div>
              ))
            )}
          </div>
        </section>

        <ProfileActions />
      </article>

      <ManageAddressModal
        open={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        addressToEdit={addressToEdit}
      />
    </section>
  );
}
