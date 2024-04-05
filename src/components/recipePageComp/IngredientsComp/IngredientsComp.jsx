import styles from "./IngredientsComp.module.scss";

const IngredientsComp = ({ ingredients }) => {
  return (
    <div>
      <p className={styles.title}>Ингридиенты: {ingredients.length}</p>
      <ul className={styles.list}>
        {ingredients.map((item) => (
          <li className={styles.listText}>
            {item.name} - {item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsComp;
