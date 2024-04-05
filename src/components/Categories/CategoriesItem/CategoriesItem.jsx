import styles from "./CategoriesItem.module.scss";
const CategoriesItem = ({navigateFunc, item, category = false, setCategory }) => {
  return (
    <p
      onClick={() => {
        setCategory(item);
        navigateFunc()
      }}
      className={category.name === item.name ? styles.textB : styles.text}
    >
      {item.name}
    </p>
  );
};

export default CategoriesItem;
