import { useEffect } from "react";
import styles from "./EditIngredInp.module.scss";
import EditIngredItem from "./EditIngredItem/EditIngredItem";

const EditIngredInp = ({ ingredList, setIngredList }) => {
  return (
    <div className={styles.main}>
      <div style={{ width: "100%", textAlign: "left" }}>
        <p>Ингридиенты:</p>
      </div>

      {ingredList &&
        ingredList.length > 0 &&
        ingredList.map((item, index) => (
          <EditIngredItem
            item={item}
            index={index}
            key={index}
            ingred={ingredList}
            setIngred={setIngredList}
          />
        ))}

      <button
        onClick={() => setIngredList([...ingredList, { name: "", amount: "" }])}
        className={styles.plusBtn}
      >
        + Еще один ингредиент
      </button>
    </div>
  );
};

export default EditIngredInp;
