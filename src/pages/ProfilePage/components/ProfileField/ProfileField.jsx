import style from "./ProfileField.module.css";

export default function ProfileField({ label, value }) {
  return (
    <div className={style.field}>
      <dt className={style.label}>{label}</dt>
      <dd className={style.value}>
        {value ?? <span className={style.placeholder}>Not set</span>}
      </dd>
    </div>
  );
}
