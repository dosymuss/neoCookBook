import { useState, useEffect, useRef } from "react";

import dropUpIcon from "../../../assets/HomePageIcon/dropUpIcon.svg";
import dropDownIcon from "../../../assets/HomePageIcon/dropDownIcon.svg";

import styles from "./CategoriesSelect.module.scss";
import { useSelector } from "react-redux";

const CategoriesSelect = ({ navigateFunc, category, setCategory }) => {
  const [click, setClick] = useState(false);
  const dropdownRef = useRef(null);

  const categories = useSelector((state) => state.category.categories);

  const categorySlice = categories.slice(9, categories.length);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClick(false); // Закрываем выпадающий блок, если клик произошел вне его области
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Убираем слушатель события при размонтировании компонента
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [click]);

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setClick(!click)} className={styles.btn}>
        <p>Еще</p>
        <img src={click ? dropUpIcon : dropDownIcon} alt="" />
      </button>
      <div
        style={{ display: click ? "block" : "none" }}
        className={styles.select}
      >
        {categorySlice.map((item) => (
          <p
            onClick={() => {
              setCategory(item);
              navigateFunc();
            }}
            className={
              category.name === item.name
                ? styles.textContentBold
                : styles.textContent
            }
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSelect;
