import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOrdering } from "../../store/recipeSlice";

import Container from "../../ui/Container/Container";

import styles from "./ResultAndFilter.module.scss";
import { useActions } from "../../hooks/useActions";

const ResultAndFilter = ({ count, title }) => {
  const [click, setClick] = useState("rate");

  const dispatch = useDispatch();
  const { fetchRecipesByAll } = useActions();

  useEffect(() => {
    fetchRecipesByAll();
  }, [click]);

  return (
    <Container>
      <div className={styles.main}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.desc}>Рецептов:{count}</p>
        </div>
        <div>
          <p className={styles.buttonText}>Сортировать:</p>
          <button
            onClick={() => {
              setClick("rate");
              dispatch(setOrdering("-avg_rating"));
            }}
            className={click === "rate" ? styles.btnAct : styles.btn}
          >
            по рейтингу
          </button>
          <button
            onClick={() => {
              setClick("comm");
              dispatch(setOrdering("-comments_count"));
            }}
            className={click === "comm" ? styles.btnAct : styles.btn}
          >
            по кол-ву комментариев
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ResultAndFilter;
