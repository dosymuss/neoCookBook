import { useState } from "react";
import { useSelector } from "react-redux";

import arrBottom from "../../../assets/HomePageIcon/dropDownIcon.svg";
import arrTop from "../../../assets/HomePageIcon/dropUpIcon.svg";

import styles from "./EditCategoryInp.module.scss";

const EditCategoryInp = ({ result, setResult, value }) => {
  const [click, setClick] = useState(false);

  const categories = useSelector((state) => state.category.categories);


  return (
    <div className={styles.main}>
      <p>Категория блюда:</p>

      <select
        onMouseDown={() => setClick(!click)}
        onChange={(e) => setResult(e.target.value)}
        style={{ backgroundImage: `url(${click ? arrTop : arrBottom})` }}
      >
        <option
          className={styles.optionPlaceholder}
          value={value}
          disabled
          selected
          hidden
        >
          {value ? value.name : "Выберите категорию"}
        </option>
        {categories.map((item) => (
          <option value={item.id}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

export default EditCategoryInp;
