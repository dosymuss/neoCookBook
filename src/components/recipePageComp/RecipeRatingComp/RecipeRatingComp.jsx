import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useActions } from "../../../hooks/useActions";

import rateStar from "../../../assets/recipePage/rateStar.svg";

import styles from "./RecipeRatingComp.module.scss";

const RecipeRatingComp = ({ count, raiting, id, userRateNumber }) => {
  const [value, setValue] = useState(userRateNumber);

  const { fetchPostRate } = useActions();

  const stylesRate = {
    color: "$color_o_main !important",
    fontSize: "30px !important",
  };

  const ratePost = () => {
    fetchPostRate({
      id: id,
      count: value !== null ? value : 0,
    });
  };

  const ratingString = raiting===null?"0":String(raiting);

  return (
    <div className={styles.main}>
      <div className={styles.starsDiv}>
        <p>Оцените рецепт, если опробовали его:</p>
        <div>
          <Rating
            name="simple-controlled"
            style={stylesRate}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              ratePost(newValue);
            }}
            size="large"
          />
          <p>Ваша оценка</p>
        </div>
      </div>

      <div className={styles.resultDiv}>
        <div>
          <img src={rateStar} alt="" />
          <p>
            {ratingString.length > 3 ? ratingString.substring(0, 3) : ratingString}
          </p>
        </div>
        <p>Средняя оценка</p>
        <span className={styles.resultVoice}>Голосов: {count}</span>
      </div>
    </div>
  );
};

export default RecipeRatingComp;
