import style from "./ProductsPanel.module.css";
import Button from "../../../../components/UI/Button/Button";
import Input from "../../../../components/UI/Input/Input";
import DropZone from "../Drag&DropBox/DropZone";
import DropDown from "../DropDown/DropDown";
import Tags from "../Tags/Tags";

export default function ProductsPanel() {
  const handleAddProduct = async (e) => {
    e.preventDefault();
  };

  const handleCancel = async () => {
    //clear form
  };
  return (
    <section className={style.panel}>
      <header className={style.header}>
        <h2 className={style.title}>Add Products</h2>
        <span className={style.subtitle}>
          Create new items for your store catalog.
        </span>
        <div className={style.btnWrapper}>
          <Button className={style.addBtn}>Add product</Button>
          <Button className={style.cancelBtn} onChange={handleCancel}>
            Cancel
          </Button>
        </div>
      </header>
      <form className={style.addContainer} onChange={handleAddProduct}>
        {/* <p className={style.message}>Products management - TBA</p> */}
        <Input label="Product Name" type="text" />
        <Input className={style.description} label="Description" type="text" />
        <div className={style.contentGroup}>
          <Input label="Price" type="number" />
          <Input label="Stock" type="number" />
        </div>
        <DropZone />
        <DropDown />
        <Tags />
      </form>
    </section>
  );
}
