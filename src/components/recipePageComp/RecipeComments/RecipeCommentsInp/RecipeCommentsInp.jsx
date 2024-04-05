import { useEffect, useState } from "react";

import Input from "../../../../ui/input/Input";
import Button from "../../../../ui/Button/Button";

import styles from "./RecipeCommentsInp.module.scss";
import { useActions } from "../../../../hooks/useActions";

const RecipeCommentsInp = ({ id }) => {
  const [value, setValue] = useState("");

  const { fetchPostComment } = useActions();

  return (
    <div className={styles.main}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={"Добавить комментарий"}
        inpName={"comment"}
      />
      <div className={styles.btnDiv}>
        <Button
          text={"Отправить"}
          isValid={value}
          onClick={() => {
            fetchPostComment({ recipe: id, text: value });
            setValue("");
          }}
        />
      </div>
    </div>
  );
};

export default RecipeCommentsInp;
