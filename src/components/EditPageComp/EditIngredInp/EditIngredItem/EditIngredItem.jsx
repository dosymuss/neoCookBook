import { useEffect, useState } from "react";
import styles from "../EditIngredInp.module.scss";

const EditIngredItem = ({ ingred, setIngred, index, item }) => {
  const [obj, setObj] = useState({
    name: "",
    amount: "",
  });

  useEffect(() => {
    if (obj.name && obj.amount) {
      const updatedList = [...ingred];
      updatedList[index] = obj;
      setIngred(updatedList);
    }
  }, [obj]);

  return (
    <div className={styles.ingridientsItem}>
      <p>{index + 1} ингридиент:</p>
      <input
        style={{ width: "240px" }}
        type="text"
        placeholder="Название"
        value={obj.name}
        onChange={(e) => setObj({ ...obj, name: e.target.value })}
      />
      <input
        style={{ width: "180px" }}
        type="text"
        placeholder="Количество"
        value={obj.amount}
        onChange={(e) => setObj({ ...obj, amount: e.target.value })}
      />
    </div>
  );
};

export default EditIngredItem;
